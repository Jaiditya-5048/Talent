
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true }) name: string;
  @Prop() description?: string;
  @Prop() startDate?: Date;
  @Prop({ enum: ['active','paused','completed'], default: 'active' }) status: string;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) manager: Types.ObjectId;
  @Prop() deletedAt?: Date | null;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
