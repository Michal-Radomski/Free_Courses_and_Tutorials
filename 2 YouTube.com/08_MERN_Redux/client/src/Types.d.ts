// Types and Interfaces
import mongoose from "mongoose";

export interface IPost {
  comments?: string[];
  _id?: mongoose.Schema.Types.ObjectId;
  title: string;
  message: string;
  creator?: string;
  name?: string;
  tags: string[] | string;
  selectedFile: string;
  likes?: string[];
  createdAt?: Date;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Fetch = typeof store.fetch;
export type Action = typeof store.action;

export interface CustomError extends Error {
  message: string;
}

export interface User extends Object {
  token: string;
  userData: {
    email?: string;
    name: string;
    picture: string;
    expireIn?: number;
  };
}

export interface SignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
