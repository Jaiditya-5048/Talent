
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true }) date: Date;
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) department: string;
  @Prop({ required: true, enum: ['management','director','HR','manager','dev'] }) role: string;
  @Prop({ required: true }) jiraTaskDesc: string;
  @Prop({ enum: ['open','in_progress','done','blocked'], default: 'open' }) status: string;
  @Prop({ required: true }) actualHours: number;
  @Prop({ required: true }) estimatedHours: number;
  @Prop() notes?: string;
  @Prop({ type: Types.ObjectId, ref: 'Project', required: true }) project: Types.ObjectId;
  @Prop() deletedAt?: Date | null;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
