import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  text: number;
  followers?: Schema.Types.ObjectId[];
  meta?: any;
  author: Schema.Types.ObjectId;
  comments?: { text: string; author: { id: Schema.Types.ObjectId; name: string } }[];
  viewCounter: number;
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
      set: function (value: string) {
        return value.toUpperCase();
      },
      get: function (value: string) {
        return value.toLowerCase();
      },
    },
    text: { type: String, required: true, minLength: [3, "At least 3 characters"], maxLength: 25 },
    followers: [Schema.Types.ObjectId],
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
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
    viewCounter: {
      type: Number,
      required: true,
      validate: {
        validator: function (value: number) {
          if (value < 0) {
            return false;
          } else return true;
        },
      },
    },
    published: { type: Boolean },
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
  { timestamps: true, toJSON: { getters: true } }
);

postSchema.virtual("Description").get(function (this: IPost) {
  return `Post has title: ${this.title} and text: ${this.text}`;
});

postSchema.pre("save", function (this, next) {
  console.log("doc:", this);
  next();
});

postSchema.pre("validate", function (next) {
  console.log("Validating...");
  next();
});

postSchema.post("validate", function () {
  console.log("After validation...");
});

postSchema.post("save", function (this) {
  console.log(`The document with this id: ${this.id} was saved to the MongoDB`);
});

postSchema.statics.staticMethod = function (callback: Function) {
  console.log("Static Method");
  return callback();
};

export default mongoose.model<IPost>("Post", postSchema);
