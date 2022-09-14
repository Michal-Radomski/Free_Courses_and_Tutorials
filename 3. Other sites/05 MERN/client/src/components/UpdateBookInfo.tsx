import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { History } from "history";

import "../App.scss";
import { Book } from "../Interfaces";

const UpdateBookInfo = ({ match, history }: { match: { params: { id: string } }; history: History }): JSX.Element => {
  const [book, setBook] = React.useState<Book>({
    title: "",
    isbn: "",
    author: "",
    description: "",
    published_date: Date.now(),
    publisher: "",
  });
  // console.log("book:", book);

  React.useEffect(() => {
    axios
      .get("/books/" + match.params.id)
      .then((res) => {
        setBook({
          title: res.data.title,
          isbn: res.data.isbn,
          author: res.data.author,
          description: res.data.description,
          published_date: res.data.published_date,
          publisher: res.data.publisher,
        });
      })
      .catch((err) => {
        console.log("Error from UpdateBookInfo" + err);
      });
  }, [match.params.id]);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setBook({ ...book, [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value });
  };

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const data = {
      title: book.title,
      isbn: book.isbn,
      author: book.author,
      description: book.description,
      published_date: book.published_date,
      publisher: book.publisher,
    };

    await axios
      .put(("/books/" + match.params.id) as string, data)
      .then((_res) => {
        // console.log({ _res });
        history.push("/show-book/" + match.params.id);
      })
      .catch((err) => {
        console.log("Error in UpdateBookInfo!" + err);
      });
  };

  return (
    <div className="UpdateBookInfo">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show BooK List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Book</h1>
            <p className="lead text-center">Update Book's Info</p>
          </div>
        </div>

        <div className="col-md-8 m-auto">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Title of the Book"
                name="title"
                className="form-control"
                value={book.title}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                placeholder="ISBN"
                name="isbn"
                className="form-control"
                value={book.isbn}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                placeholder="Author"
                name="author"
                className="form-control"
                value={book.author}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                placeholder="Describe this book"
                name="description"
                className="form-control"
                value={book.description}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="published_date">Published Date</label>
              <input
                type="date"
                placeholder="published_date"
                name="published_date"
                className="form-control"
                value={book.published_date as string}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="publisher">Publisher</label>
              <input
                type="text"
                placeholder="Publisher of this Book"
                name="publisher"
                className="form-control"
                value={book.publisher}
                onChange={onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">
              Update Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBookInfo;
