import mongoose from "mongoose";

export interface IUser {
  username: string;
  password: string;
}

export interface IUserSchemma extends mongoose.Document<IUser> {}
