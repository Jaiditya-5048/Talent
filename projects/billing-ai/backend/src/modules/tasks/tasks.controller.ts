
import { Controller, Get, Query, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../../shared/config';

@Controller('api/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Query() q: any) {
    return this.tasksService.list(q);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: any, @Req() req: Request) {
    // auto-fill name/department/role from authenticated user
    const user = req['user'];
    body.name = user.name;
    body.department = user.department;
    body.role = user.role;
    return this.tasksService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any, @Req() req: Request) {
    const user = req['user'];
    return this.tasksService.update(id, body, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tasksService.softDelete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('export/csv')
  async exportCsv(@Query() q: any, @Res() res: Response) {
    const csv = await this.tasksService.exportCsv(q);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=tasks_export.csv');
    res.send(csv);
  }

  @UseGuards(JwtAuthGuard)
  @Get('export/xlsx')
  async exportXlsx(@Query() q: any, @Res() res: Response) {
    const buf = await this.tasksService.exportXlsx(q);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=tasks_export.xlsx');
    res.send(buf);
  }

  @UseGuards(JwtAuthGuard)
  @Post('share')
  async share(@Body() body: any) {
    const payload = { filter: body.filter };
    const token = jwt.sign(payload, config.SHARE_TOKEN_SECRET, { expiresIn: config.SHARE_TOKEN_EXP_SECONDS });
    return { shareToken: token };
  }

  @Get('shared/view')
  async sharedView(@Query('shareToken') shareToken: string) {
    if (!shareToken) return { data: [] };
    try {
      const payload: any = jwt.verify(shareToken, config.SHARE_TOKEN_SECRET);
      const filter = payload.filter || {};
      const { data } = await this.tasksService.list({ ...filter, limit: 1000 });
      return data;
    } catch (err) {
      return { message: 'Invalid or expired token', data: [] };
    }
  }
}
