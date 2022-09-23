import React from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import memories from "../../images/memories.png";
import useStyles from "./styles";
import { AppDispatch, User } from "../../Types";
import { useAppDispatch } from "../../redux/hooks";
import * as actionType from "../../redux/actionTypes";

const Navbar = (): JSX.Element => {
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = React.useState<User | null>(JSON.parse(localStorage.getItem("profile") as string));
  // console.log("user:", user);
  // console.log("new Date().getTime():", new Date().getTime());

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push("/auth");
    setUser(null);
    googleLogout();
  };

  React.useEffect(() => {
    const expireIn = user?.expireIn;
    const now = new Date().getTime();
    const timeToLogout = (expireIn! - now) / 1000;
    // console.log(`AutoLogOut in : ${timeToLogout} seconds`);
    if (user) {
      if (timeToLogout < 0) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile") as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, user?.expireIn]);

  return (
    <React.Fragment>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
            Memories
          </Typography>
          <img className={classes.image} src={memories} alt="icon" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
          {user?.userData ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user?.userData.name} src={user?.userData.picture}>
                {user?.userData.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user?.userData.name}
              </Typography>
              <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
