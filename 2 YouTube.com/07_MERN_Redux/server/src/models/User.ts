import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isUserVerified: boolean;
  verifyToken: string;
}

const UserSchema: Schema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String, minlength: [8, "Min password length is 8 characters"] },
  isUserVerified: { type: Boolean, default: false },
  verifyToken: { type: String },
});

export default mongoose.model<IUser>("User", UserSchema);
