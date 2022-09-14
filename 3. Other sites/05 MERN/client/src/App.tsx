import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.scss";
import CreateBook from "./components/CreateBook";
import ShowBookDetails from "./components/ShowBookDetails";
import ShowBookList from "./components/ShowBookList";
import UpdateBookInfo from "./components/UpdateBookInfo";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <Router>
        <div>
          <Route exact path="/" component={ShowBookList} />
          <Route path="/create-book" component={CreateBook} />
          <Route path="/edit-book/:id" component={UpdateBookInfo} />
          <Route path="/show-book/:id" component={ShowBookDetails} />
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
