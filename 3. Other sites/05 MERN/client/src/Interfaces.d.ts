// Types and Interfaces
import mongoose from "mongoose";

export interface Book {
  title: string;
  isbn: string;
  author: string;
  description: string;
  published_date: Date | string | number;
  publisher: string;
  _id?: mongoose.Schema.Types.ObjectId;
}
