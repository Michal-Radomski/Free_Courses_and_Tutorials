import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/Landing";

const NotFound = (): JSX.Element => <h1 style={{ textAlign: "center", marginTop: "80px" }}>Page Not Found</h1>;

function App(): JSX.Element {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.jwt_token },
      });
      const parseRes = await res.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      // console.log({ parseRes });
    } catch (error) {
      console.error({ error });
    }
  };

  React.useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const setAuth = (isOrNotAuthenticated: boolean) => {
    setIsAuthenticated(isOrNotAuthenticated);
  };

  return (
    <React.Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) => (!isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />)}
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? <Register {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) => (isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to="/login" />)}
            />

            {/* <Redirect from="/" to="/login" /> */}
            {/* <Route path="/" exact={true} component={Landing} /> */}
            <Route
              exact
              path="/"
              render={(props) => (!isAuthenticated ? <Landing {...props} /> : <Redirect to="/dashboard" />)}
            />

            <Route path="/*" component={NotFound} />
          </Switch>
        </div>
      </Router>
      <ToastContainer autoClose={5000} />
    </React.Fragment>
  );
}

export default App;
