import React from "react";
import { Link } from "react-router-dom";
import { History, Location } from "history";

const Landing = ({ history, location }: { history: History; location: Location }): JSX.Element => {
  console.log({ history, location });
  return (
    <React.Fragment>
      <div className="jumbotron mt-5">
        <h1>Welcome to the Todo City</h1>
        <p>Sign In and start building your todo list</p>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
        <Link to="/register" className="btn btn-secondary ml-3">
          Register
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Landing;
