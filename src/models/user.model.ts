import mongoose from "mongoose";

export interface IUser {
  email: string;
  username: string;
  password: string;
}

export interface IUserSchema extends mongoose.Document, IUser {}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

export const User = mongoose.model<IUserSchema>("User", userSchema);
