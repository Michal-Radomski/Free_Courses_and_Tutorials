//* V1 -> Classic Mongoose Model
// import mongoose, { Schema, Document } from "mongoose";

// export interface IPost extends Document {
//   title: string;
//   message: string;
//   creator: string;
//   tags: string[] | string;
//   selectedFile: string;
//   likeCount: number;
//   createdAt: Date;
// }

// const postSchema: Schema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     message: { type: String, required: true, minlength: [8, "Min password length is 8 characters"] },
//     creator: { type: String },
//     tags: { type: [String] },
//     selectedFile: { type: String },
//     likeCount: { type: Number, default: 0 },
//     createdAt: { type: Date, default: new Date() },
//   },
//   { timestamps: true }
// );

// export default mongoose.model<IPost>("PostMessage", postSchema);

//* V2 -> Typegoose Model
import { prop, getModelForClass, modelOptions, DocumentType } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true, collection: "postmessages" } })
class postClass {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true, minlength: 8 })
  public message!: string;

  @prop()
  public creator!: string;

  @prop({ type: () => [String] })
  public tags!: string[];

  @prop()
  public selectedFile!: string;

  @prop({ default: 0 })
  public likeCount!: number;

  @prop({ default: new Date() })
  public createdAt!: Date;
}

export type IPost = DocumentType<postClass>;
export const PostMessage = getModelForClass(postClass);
