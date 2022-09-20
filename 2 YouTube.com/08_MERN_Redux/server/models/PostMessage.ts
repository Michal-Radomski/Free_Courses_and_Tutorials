import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  message: string;
  creator: string;
  tags: string[];
  selectedFile: string;
  likeCount: number;
  createdAt: Date;
}

const postSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true, minlength: [8, "Min password length is 8 characters"] },
  creator: { type: String },
  tags: { type: [String] },
  selectedFile: { type: String },
  likeCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
});

export default mongoose.model<IPost>("PostMessage", postSchema);
