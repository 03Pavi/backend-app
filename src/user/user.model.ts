import * as mongoose from 'mongoose';
export const userSchema = new mongoose.Schema({
  name: String,
  classes: String,
  password: String,
  phone: Number,
});

export interface User {
  name: string;
  classes: string;
  password: string;
  phone: number;
}
