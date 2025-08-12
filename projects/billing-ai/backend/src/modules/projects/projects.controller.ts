
import { Controller, Post, Body, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../../shared/roles.decorator';
import { RolesGuard } from '../../shared/roles.guard';

@Controller('api/projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Roles('management','director','manager')
  @Post()
  async create(@Body() body: any) {
    return this.projectsService.create(body);
  }

  @Roles('management','director','manager','HR','dev')
  @Get()
  async list() {
    return this.projectsService.list();
  }

  @Roles('management','director')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.projectsService.softDelete(id);
  }
}
