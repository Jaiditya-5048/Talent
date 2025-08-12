
import mongoose, { Schema } from 'mongoose';
const ProjectSchema = new Schema({
  name: String,
  description: String,
  startDate: Date,
  status: { type: String, enum: ['active','paused','completed'], default: 'active' },
  manager: { type: Schema.Types.ObjectId, ref: 'User' },
  deletedAt: { type: Date, default: null }
}, { timestamps: true });
export default mongoose.model('Project', ProjectSchema);
