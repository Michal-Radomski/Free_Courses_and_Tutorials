import { BookModel } from "./../Types.d";

import express, { Request, Response } from "express";
const router = express.Router();

// Load Book model
const Book = require("../../models/Book");

// @route GET api/books/test
// @description Tests books route
// @access Public
// router.get("/test", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("book route testing!");
// });

// @route GET api/books
// @description Get all books
// @access Public
router.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  Book.find()
    .then((books: BookModel[]) => res.json(books))
    .catch((err: string) => res.status(404).json({ noBooksFound: "No Books found" + err }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get("/:id", (req: Request, res: Response) => {
  Book.findById(req.params.id)
    .then((book: BookModel) => res.json(book))
    .catch((err: string) => res.status(404).json({ noBookFound: "No Book found0" + err }));
});

// @route POST api/books
// @description add/save book
// @access Public
router.post("/", (req: Request, res: Response) => {
  Book.create(req.body)
    .then((book: BookModel) => res.json({ msg: "Book added successfully" + book }))
    .catch((err: string) => res.status(400).json({ error: "Unable to add this book" + err }));
});

// @route PUT api/books/:id
// @description Update book
// @access Public
router.put("/:id", (req: Request, res: Response) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then((book: BookModel) => res.json({ msg: "Updated successfully" + book }))
    .catch((err: string) => res.status(400).json({ error: "Unable to update the Database" + err }));
});

// @route DELETE api/books/:id
// @description Delete book by id
// @access Public
router.delete("/:id", (req: Request, res: Response) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then((book: BookModel) => res.json({ mgs: "Book entry deleted successfully" + book }))
    .catch((err: string) => res.status(404).json({ error: "No such a book" + err }));
});

export default router;
