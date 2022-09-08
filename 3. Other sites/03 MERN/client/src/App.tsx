import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import "./App.scss";
import CreateComponent from "./components/CreateComponent";
import EditComponent from "./components/EditComponent";
import IndexComponent from "./components/IndexComponent";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to={"/"}>
              React Express App
            </Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/create"} className="nav-link">
                    Create
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/index"} className="nav-link">
                    Index
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <h2 style={{marginTop: 20, textAlign: "center"}}>MERN Port App</h2>
          <Switch>
            <Route exact={true} path="/create" component={CreateComponent} />
            <Route path="/edit/:id" component={EditComponent} />
            <Route path="/index" component={IndexComponent} />
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
};

export default App;
