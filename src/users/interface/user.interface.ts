import { Document } from 'mongoose';

export interface UserI extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  token?: string;
}