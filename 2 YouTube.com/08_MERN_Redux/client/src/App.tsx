import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <Router>
        <Container maxWidth="lg">
          <Navbar />
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/auth" exact={true} component={Auth} />
          </Switch>
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
