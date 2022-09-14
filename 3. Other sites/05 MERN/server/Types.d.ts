// Types and interfaces

import { Document } from "mongoose";

export interface BookModel extends Document {
  title: string;
  isbn: string;
  author: string;
  description: string;
  published_date: Date;
  publisher: string;
  updated_date: Date;
}
