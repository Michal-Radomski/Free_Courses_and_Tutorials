import React from "react";
import { Link } from "react-router-dom";

import { Book } from "../Interfaces";

const BookCard = ({ book }: { book: Book }): JSX.Element => {
  return (
    <React.Fragment>
      <div className="card-container">
        <img
          src="https://image.shutterstock.com/image-vector/horizontal-stack-colored-books-isometriceducation-600w-565460449.jpg"
          alt="book"
          width={250}
        />
        <div className="desc">
          <h2>
            <Link to={`/show-book/${book._id}`}>{book.title}</Link>
          </h2>
          <h3>{book.author}</h3>
          <p>{book.description}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BookCard;
