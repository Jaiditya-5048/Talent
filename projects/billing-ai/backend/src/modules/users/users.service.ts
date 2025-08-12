
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string) {
    const u = await this.userModel.findOne({ email, deletedAt: null });
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async list() {
    return this.userModel.find({ deletedAt: null }).select('-passwordHash').lean();
  }

  async create(user: Partial<User>) {
    return this.userModel.create(user);
  }
}
