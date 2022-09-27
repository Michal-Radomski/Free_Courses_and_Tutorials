import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPage";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";

import "./App.scss";
import { myContext } from "./Context";

const NotFound = (): JSX.Element => <h1 style={{ textAlign: "center", marginTop: "80px" }}>Page Not Found</h1>;

function App(): JSX.Element {
  const ctx = React.useContext(myContext);
  console.log({ ctx });

  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact={true} component={HomePage} />
          {ctx ? (
            <>
              {ctx.isAdmin ? <Route path="/admin" component={AdminPage} /> : null}
              <Route path="/profile" component={Profile} />
            </>
          ) : (
            <>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </>
          )}
          <Route path="/*" component={NotFound} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
