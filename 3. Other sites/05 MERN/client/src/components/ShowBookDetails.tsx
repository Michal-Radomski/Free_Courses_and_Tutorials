import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { History } from "history";

import "../App.scss";
import { Book } from "../Interfaces";

const ShowBookDetails = ({ match, history }: { match: { params: { id: string } }; history: History }): JSX.Element => {
  const [book, setBook] = React.useState<Book>({
    title: "",
    isbn: "",
    author: "",
    description: "",
    published_date: Date.now(),
    publisher: "",
  });
  // console.log("book:", book);
  // console.log("match.params.id:", match.params.id);

  React.useEffect(() => {
    axios
      .get("/books/" + match.params.id)
      .then((res) => {
        // console.log("Print-showBookDetails-API-response: " + JSON.stringify(res.data));
        setBook(res.data);
      })
      .catch((err) => {
        console.log("Error from ShowBookDetails" + err);
      });
  }, [match.params.id]);

  const onDeleteClick = async (id: string) => {
    await axios
      .delete("/books/" + id)
      .then((res) => {
        // console.log({ id });
        // console.log({ res });
        history.push("/");
      })
      .catch((err) => {
        console.log("Error form ShowBookDetails_deleteClick" + err);
      });
  };

  const BookItem = () => {
    return (
      <div>
        <table className="table table-hover table-dark">
          {/* <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead> */}
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Title</td>
              <td>{book.title}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Author</td>
              <td>{book.author}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>ISBN</td>
              <td>{book.isbn}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Publisher</td>
              <td>{book.publisher}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Published Date</td>
              <td>{new Date(book.published_date as string)?.toDateString()}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Description</td>
              <td>{book.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="ShowBookDetails">
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <br /> <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show Book List
            </Link>
          </div>
          <br />
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Book's Record</h1>
            <p className="lead text-center">View Book's Info</p>
            <hr /> <br />
          </div>
        </div>
        <div>{BookItem()}</div>

        <div className="row">
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-outline-danger btn-lg btn-block"
              onClick={(_id) => onDeleteClick(book._id)}
            >
              Delete Book
            </button>
            <br />
          </div>

          <div className="col-md-6">
            <Link to={`/edit-book/${book._id}`} className="btn btn-outline-info btn-lg btn-block">
              Edit Book
            </Link>
            <br />
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default ShowBookDetails;
