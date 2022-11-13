import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  text: number;
  followers?: Schema.Types.ObjectId[];
  mata?: any;
  comments?: { text: string; author: { id: Schema.Types.ObjectId; name: string } }[];
  viewCounter?: number;
  published?: boolean;
}

const postSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "At least 3 characters"],
      maxLength: 100,
      match: /^([\w ,.!?]{3,100})$/,
    },
    text: { type: String, required: true, minLength: [3, "At least 3 characters"], maxLength: 25 },
    followers: [Schema.Types.ObjectId],
    meta: Schema.Types.Mixed,
    comments: [
      {
        text: {
          type: String,
          trim: true,
          max: 2000,
        },
        author: {
          id: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          name: String,
        },
      },
    ],
    viewCounter: Number,
    published: Boolean,
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    //   required: true,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    //   required: true,
    // },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", postSchema);
