export {};
const mongoose = require("mongoose");

// Secret Schema
const secretSchema = new mongoose.Schema(
  {
    secret: {
      type: String,
      required: true,
    },
    bgColor: {
      type: String,
      default: "46244c",
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Secret", secretSchema);
