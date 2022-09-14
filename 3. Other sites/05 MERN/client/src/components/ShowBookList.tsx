import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import BookCard from "./BookCard";
import { Book } from "../Interfaces";

const ShowBookList = (): JSX.Element => {
  const [books, setBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    axios
      .get("/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // console.log("PrintBook: " + JSON.stringify(books));
  let bookList;

  if (!books) {
    bookList = "There is no book records in the DB!";
  } else {
    bookList = books.map((book, index) => <BookCard book={book} key={index} />);
  }

  return (
    <div className="ShowBookList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Books List</h2>
          </div>
          <div className="col-md-11">
            <Link to="/create-book" className="btn btn-outline-warning float-right">
              + Add New Book
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>
        <div className="list">{bookList}</div>
      </div>
    </div>
  );
};

export default ShowBookList;
