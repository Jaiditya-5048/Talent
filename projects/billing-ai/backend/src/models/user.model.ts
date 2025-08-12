
import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
  name: String,
  email: String,
  passwordHash: String,
  department: String,
  role: String,
  deletedAt: { type: Date, default: null }
}, { timestamps: true });
export default mongoose.model('User', UserSchema);
