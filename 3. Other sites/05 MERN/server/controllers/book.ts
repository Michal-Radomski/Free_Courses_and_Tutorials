import { Request, Response } from "express";

import { BookModel } from "./../Types.d";
const Book = require("../models/Book");

export const getBooks = (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  Book.find()
    .then((books: BookModel[]) => res.json(books))
    .catch((err: string) => res.status(404).json({ noBooksFound: "No Books found" + err }));
};

export const getBookById = (req: Request, res: Response) => {
  Book.findById(req.params.id)
    .then((book: BookModel) => res.json(book))
    .catch((err: string) => res.status(404).json({ noBookFound: "No Book found0" + err }));
};

export const createBook = (req: Request, res: Response) => {
  Book.create(req.body)
    .then((book: BookModel) => res.json({ msg: "Book added successfully" + book }))
    .catch((err: string) => res.status(400).json({ error: "Unable to add this book" + err }));
};

export const updateBook = (req: Request, res: Response) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then((book: BookModel) => res.json({ msg: "Updated successfully" + book }))
    .catch((err: string) => res.status(400).json({ error: "Unable to update the Database" + err }));
};

export const deleteBook = (req: Request, res: Response) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then((book: BookModel) => res.json({ mgs: "Book entry deleted successfully" + book }))
    .catch((err: string) => res.status(404).json({ error: "No such a book" + err }));
};
