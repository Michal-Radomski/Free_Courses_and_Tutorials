import mongoose, { Schema } from "mongoose";

import { BookModel } from "../Types";

const BookSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  published_date: {
    type: Date,
  },
  publisher: {
    type: String,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model<BookModel>("book", BookSchema);

export default Book;
