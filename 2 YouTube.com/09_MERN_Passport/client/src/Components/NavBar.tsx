import React from "react";
import { Link, useHistory } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";

import { myContext } from "../Context";

const NavBar = (): JSX.Element => {
  const history = useHistory();
  const ctx = React.useContext(myContext);

  const logout = () => {
    Axios.get("/logout", {
      withCredentials: true,
    }).then((res: AxiosResponse) => {
      if (res.data === "Success") {
        // window.location.href = "/";
        history.push("/");
      }
    });
  };
  return (
    <div className="NavContainer">
      {ctx ? (
        <>
          <Link onClick={logout} to="/logout">
            Logout
          </Link>
          {ctx.isAdmin ? <Link to="/admin">Admin</Link> : null}
          <Link to="/profile">Profile</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      <Link to="/">Home</Link>
    </div>
  );
};

export default NavBar;
