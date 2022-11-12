import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  text: number;
}

const postSchema: Schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", postSchema);
