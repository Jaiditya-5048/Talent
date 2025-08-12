
import { connect } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
import { config } from '../shared/config';
import * as bcrypt from 'bcrypt';
import UserModel from '../models/user.model';
import ProjectModel from '../models/project.model';
import TaskModel from '../models/task.model';

async function seed() {
  await connect(config.MONGO_URI);
  console.log('Connected to Mongo for seeding');

  const roles = ['management','director','HR','manager','dev'];
  for (const role of roles) {
    const email = `${role}@example.com`;
    const existing = await UserModel.findOne({ email }).lean();
    if (existing) { console.log('User exists', email); continue; }
    const passwordHash = await bcrypt.hash('password', 10);
    await UserModel.create({
      name: `${role} User`,
      email,
      passwordHash,
      department: role === 'dev' ? 'Engineering' : 'Operations',
      role
    });
    console.log('Seeded', email);
  }

  const manager = await UserModel.findOne({ role: 'manager' });
  let project = await ProjectModel.findOne({ name: 'Default Project' });
  if (!project) {
    project = await ProjectModel.create({ name: 'Default Project', description: 'Seed', manager: manager._id });
    console.log('Created default project');
  }

  const dev = await UserModel.findOne({ role: 'dev' });
  const tasksCount = await TaskModel.countDocuments();
  if (tasksCount === 0) {
    await TaskModel.create({
      date: new Date(),
      name: dev.name,
      department: dev.department,
      role: dev.role,
      jiraTaskDesc: 'SEED-1 - initial task',
      status: 'open',
      actualHours: 2,
      estimatedHours: 3,
      notes: 'seeded task',
      project: project._id
    });
    console.log('Seeded one task');
  }

  console.log('Seeding complete');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
