
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './project.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

  async create(data: Partial<Project>) {
    return this.projectModel.create(data);
  }

  async list() {
    return this.projectModel.find({ deletedAt: null }).lean();
  }

  async softDelete(id: string) {
    return this.projectModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  }
}
