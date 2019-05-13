import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserI } from './interface/user.interface';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { UserRO } from './user.ro';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('users')
    private usersModel: Model<UserI>,
  ) {}

  async getAll(): Promise<UserRO[]> {
    const users = await this.usersModel.find();
    return users.map(item => this.createResponseObject(item));
  }

  async getById(id: string): Promise<UserRO> {
    const user = await this.usersModel.findById(id);
    return this.createResponseObject(user);
  }

  async removeById(id: string): Promise<UserRO> {
    const userRemoved = await this.usersModel.findByIdAndRemove(id);
    if(!userRemoved) {
      throw new NotFoundException('User not found');
    }
    return this.createResponseObject(userRemoved);
  }

  async login(userDto: UserDto) {
    const { email, password } = userDto;
    const user = await this.usersModel.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new BadRequestException('Invalid email/password');
    }

    const userRO = new UserRO(user);
    userRO.token = this.token(user.id, user.email);
    return userRO;
  }

  async register(userDto: UserDto) {
    const { email } = userDto;
    const previousUser = await this.usersModel.findOne({ email });

    if (previousUser) {
      throw new BadRequestException('Email is already used');
    }

    const newUser = new this.usersModel(userDto);
    newUser.password = await this.hashPassword(newUser.password);
    await newUser.save();

    return this.createResponseObject(newUser);
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private createResponseObject(user: UserI) {
    return new UserRO(user);
  }

  private token(id: string, email: string) {
    // really 180 day is not too much?
    return jwt.sign(
      { id, email },
      process.env.SECRET,
      { expiresIn: '180d' },
    );
  }
}
