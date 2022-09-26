import mongoose, { Document, Schema } from "mongoose";

export interface UserInterface extends Document {
  username: string;
  password: string;
  isAdmin: boolean;
  _id?: mongoose.Schema.Types.ObjectId | string;
  id?: string | mongoose.Schema.Types.ObjectId;
}

const user: Schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, required: true, minlength: [8, "Min password length is 8 characters"] },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<UserInterface>("User", user);
