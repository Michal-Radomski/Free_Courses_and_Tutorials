export {};
const router = require("express").Router();
const passport = require("passport");
import {Request, Response, NextFunction} from "express";

import {CustomError, IUser} from "../Types";

//Require User Model
const User = require("../models/User");

// Use passport-local configuration to create passport local Strategy
passport.use(User.createStrategy());

//Serialize and deserialize are only necessary when using session
passport.serializeUser(function (user: IUser, done: (arg0: null, arg1: string) => void) {
  done(null, user.id);
});
passport.deserializeUser(function (id: string, done: (arg0: string, arg1: IUser) => void) {
  User.findById(id, function (err: string, user: IUser) {
    done(err, user);
  });
});

// Local route Register new user in the DB
router.post("/auth/register", async (req: Request, res: Response) => {
  try {
    // Register User
    const registerUser = await User.register({username: req.body.username}, req.body.password); //* register -> passport method
    if (registerUser) {
      // If user registered, we will authenticate the user using passport
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    } else {
      res.redirect("/register");
    }
  } catch (err) {
    console.log(err);
    res.send("Error: " + (err as CustomError).message);
  }
});

// Local route Login user (local login: name + password)
router.post("/auth/login", (req: Request, res: Response) => {
  // Create new user
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  console.log({user});
  // Use passport login method to check if user credentials true and authenticate it
  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    }
  });
});

//Logout user
router.get("/auth/logout", (req: Request, res: Response, next: NextFunction) => {
  // Use passport logout method to end user session and un-authenticate it
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//Export router
module.exports = router;
