
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { Model, Types } from 'mongoose';
import * as XLSX from 'xlsx';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  buildFilter(q: any) {
    const filter: any = { deletedAt: null };
    if (q.projectId) filter.project = q.projectId;
    if (q.name) filter.name = q.name;
    if (q.department) filter.department = q.department;
    if (q.startDate || q.endDate) {
      filter.date = {};
      if (q.startDate) filter.date.$gte = new Date(q.startDate);
      if (q.endDate) filter.date.$lte = new Date(q.endDate);
    }
    return filter;
  }

  async list(q: any) {
    const { cursor, limit = 50 } = q;
    const filter = this.buildFilter(q);
    const query = this.taskModel.find(filter).sort({ _id: 1 }).limit(Number(limit) + 1);
    if (cursor) query.where('_id').gt((new Types.ObjectId(cursor)) as unknown as number);
    const docs = await query.lean();
    let nextCursor = null;
    if (docs.length > Number(limit)) {
      nextCursor = docs[Number(limit) - 1]._id;
      docs.splice(Number(limit));
    }
    return { data: docs, nextCursor };
  }

  async create(data: any) {
    // expect name/department/role to be filled by controller using user info
    return this.taskModel.create(data);
  }

  async update(id: string, data: any, user: any) {
    // Enforce role-based editable fields server-side.
    // Developers can only edit: date, jiraTaskDesc, actualHours, estimatedHours, notes, status
    // All roles can edit status.
    if (user.role === 'dev') {
      const allowed = ['date','jiraTaskDesc','actualHours','estimatedHours','notes','status'];
      for (const k of Object.keys(data)) {
        if (!allowed.includes(k)) throw new BadRequestException('Dev role cannot edit field: ' + k);
      }
    }
    // Managers/HR/director/management can edit everything (for now).
    return this.taskModel.findByIdAndUpdate(id, data, { new: true });
  }

  async softDelete(id: string) {
    return this.taskModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  }

  async exportCsv(filter: any) {
    const rows = await this.taskModel.find(this.buildFilter(filter)).lean();
    const header = ["date","name","department","role","jiraTaskDesc","status","actualHours","estimatedHours","notes","project"];
    const csv = [header.join(",")].concat(rows.map(r => [
      r.date?.toISOString()||"",
      `"${r.name}"`,
      `"${r.department}"`,
      r.role,
      `"${(r.jiraTaskDesc||"").replace(/"/g,'""')}"`,
      r.status,
      r.actualHours,
      r.estimatedHours,
      `"${(r.notes||"").replace(/"/g,'""')}"`,
      r.project?.toString()||""
    ].join(","))).join("\n");
    return csv;
  }

  async exportXlsx(filter: any) {
    const rows = await this.taskModel.find(this.buildFilter(filter)).lean();
    const data = rows.map(r => ({
      date: r.date?.toISOString()||"",
      name: r.name,
      department: r.department,
      role: r.role,
      jiraTaskDesc: r.jiraTaskDesc,
      status: r.status,
      actualHours: r.actualHours,
      estimatedHours: r.estimatedHours,
      notes: r.notes || "",
      project: r.project?.toString() || ""
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tasks");
    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
    return buf;
  }
}
