import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const NotFound = (): JSX.Element => <h1 style={{ textAlign: "center", marginTop: "80px" }}>Page Not Found</h1>;

function App(): JSX.Element {
  const user = JSON.parse(localStorage.getItem("profile") as string);

  return (
    <React.Fragment>
      <Router>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route path="/" exact={true} component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact={true} component={Home} />
            <Route path="/posts/search" exact={true} component={Home} />
            <Route path="/posts/:id" exact={true} component={PostDetails} />
            <Route path="/auth" exact={true} component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
