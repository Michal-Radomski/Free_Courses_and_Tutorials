import * as dotenv from "dotenv";
dotenv.config();
import express, { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import bcrypt from "bcrypt";

import pool from "./dbConfig";

interface CustomRequest extends Request {
  user?: { name?: string };
}

function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/dashboard");
  }
  next();
}

function checkNotAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login");
}

const indexRouter: Router = express.Router();

// GET
indexRouter.get("/", async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  await res.render("index", {});
});

indexRouter.get("/users/register", checkAuthenticated, async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  await res.render("register", {});
});

indexRouter.get("/users/login", checkAuthenticated, async (req: Request, res: Response): Promise<void> => {
  // await console.log("req.ip:", req.ip);
  // Flash sets a messages variable. passport sets the error message
  await console.log("req.session:", req.session);
  await res.render("login", {});
});

indexRouter.get("/users/dashboard", checkNotAuthenticated, async (req: CustomRequest, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  await res.render("dashboard", { user: req.user?.name });
});

indexRouter.get("/users/logout", async (req: Request, res: Response): Promise<void> => {
  await req.logOut(function (error) {
    if (error) {
      console.log({ error });
    }
  });
  await res.render("index", { message: "You have logged out successfully" });
});

// POST
indexRouter.post("/users/register", async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, password2 } = req.body;
  const errors: { message: string }[] = [];
  console.log({
    name,
    email,
    password,
    password2,
  });

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 8) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.render("register", { errors, name, email, password, password2 });
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log({ hashedPassword });

    // Validation passed
    pool.query(
      `SELECT * FROM users
        WHERE email = $1`,
      [email],
      (error, results) => {
        if (error) {
          console.log({ error });
        }
        console.log("results.rows:", results.rows);

        if (results.rows.length > 0) {
          console.log("Email already registered");
          errors.push({ message: "Email already registered" });
          return res.render("register", {
            errors: errors,
          });
        } else {
          pool.query(
            `INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3)
                RETURNING id, password`,
            [name, email, hashedPassword],
            (error, results) => {
              if (error) {
                console.log({ error });
                throw error;
              }
              console.log("results.rows:", results.rows);
              req.flash("success_msg", "You are now registered. Please log in");
              res.redirect("/users/login");
            }
          );
        }
      }
    );
  }
});

indexRouter.post(
  "/users/login",
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

export default indexRouter;
