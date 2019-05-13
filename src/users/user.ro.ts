import { UserI } from './interface/user.interface';

export class UserRO {

  constructor(user: UserI) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.token = user.token;
  }

  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
  token?: string;
}
