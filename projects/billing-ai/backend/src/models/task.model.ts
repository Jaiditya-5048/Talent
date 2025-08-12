
import mongoose, { Schema } from 'mongoose';
const TaskSchema = new Schema({
  date: Date,
  name: String,
  department: String,
  role: String,
  jiraTaskDesc: String,
  status: { type: String, enum: ['open','in_progress','done','blocked'], default: 'open' },
  actualHours: Number,
  estimatedHours: Number,
  notes: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });
export default mongoose.model('Task', TaskSchema);
