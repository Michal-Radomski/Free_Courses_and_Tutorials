import React from "react";
import { Link } from "react-router-dom";
import { History } from "history";
import axios from "axios";

import "../App.scss";
import { Book } from "../Interfaces";

class CreateBook extends React.Component<{ data: Book; history: History }, Book> {
  constructor(props: { data: Book; history: History }) {
    super(props);
    this.state = {
      title: "",
      isbn: "",
      author: "",
      description: "",
      published_date: "",
      publisher: "",
    };
  }

  onChange = (event: { target: { name: string; value: string | Date | number } }) => {
    this.setState<keyof Book>({ [event.target.name]: event.target.value } as Pick<Book, keyof Book>);
  };

  onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const data = {
      title: this.state.title,
      isbn: this.state.isbn,
      author: this.state.author,
      description: this.state.description,
      published_date: this.state.published_date,
      publisher: this.state.publisher,
    };

    axios
      .post("/books", data)
      .then((_res) => {
        // console.log({ _res });
        this.setState({
          title: "",
          isbn: "",
          author: "",
          description: "",
          published_date: "",
          publisher: "",
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log("Error in CreateBook!", err);
      });
  };

  render() {
    return (
      <div className="CreateBook">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show Book List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add a New Book</h1>
              <p className="lead text-center">Create a New book</p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Title of the Book"
                    name="title"
                    className="form-control"
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="ISBN"
                    name="isbn"
                    className="form-control"
                    value={this.state.isbn}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Author"
                    name="author"
                    className="form-control"
                    value={this.state.author}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Describe this book"
                    name="description"
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="date"
                    placeholder="published_date"
                    name="published_date"
                    className="form-control"
                    value={this.state.published_date as number}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Publisher of this Book"
                    name="publisher"
                    className="form-control"
                    value={this.state.publisher}
                    onChange={this.onChange}
                  />
                </div>

                <input type="submit" className="btn btn-outline-warning btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBook;
