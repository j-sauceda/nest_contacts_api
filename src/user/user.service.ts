import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async createUser(userDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return await createdUser.save();
  }

  async emailIsRegistered(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async findUserById(user_id: string) {
    return await this.userModel.findById(user_id);
  }
}
