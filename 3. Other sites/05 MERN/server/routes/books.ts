import express from "express";

import { createBook, deleteBook, getBookById, getBooks, updateBook } from "../controllers/book";

const router = express.Router();
// // @route GET api/books/test
// // @description Tests books route
// // @access Public
// router.get("/test", (req, res) => {
//   console.log("req.ip:", req.ip);
//   res.send("book route testing!");
// });

// @route GET api/books
// @description Get all books
// @access Public
router.get("/", getBooks);

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get("/:id", getBookById);

// @route POST api/books
// @description add/save book
// @access Public
router.post("/", createBook);

// @route PUT api/books/:id
// @description Update book
// @access Public
router.put("/:id", updateBook);

// @route DELETE api/books/:id
// @description Delete book by id
// @access Public
router.delete("/:id", deleteBook);

module.exports = router;
