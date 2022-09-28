import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcryptjs";
import passport from "passport";

// Load User model
import UserSchema, { IUser } from "../models/User";

interface Errors {
  msg: string;
}

export const register: RequestHandler = async (req: Request, res: Response) => {
  console.log("req.body:", req.body);
  const { name, email, password, password2 } = req.body;
  let errors = [] as Errors[];
  console.log({ errors });

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  // Check passwords match
  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  // Check password length
  if (password.length < 8) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    await UserSchema.findOne({ email: email }).then((user: IUser | null) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new UserSchema({
          name: name,
          email: email,
          password: password,
        });

        bcrypt.genSalt(12, (error, salt) => {
          if (error) {
            console.log({ error });
          }
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) {
              console.log({ error });
              throw error;
            }
            newUser.password = hash;
            newUser
              .save()
              .then((user: IUser) => {
                console.log({ user });
                res.redirect("/users/login");
              })
              .catch((error) => console.log({ error }));
          });
        });
      }
    });
  }
};

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  await passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
};

export const logout: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  await req.logOut(function (error) {
    if (error) {
      console.log({ error });
      return next(error);
    }
  });
  await res.redirect("/");
};
