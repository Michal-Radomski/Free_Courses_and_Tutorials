import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <Router>
        <Container maxWidth="lg">
          <Navbar />
          <Home />
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
