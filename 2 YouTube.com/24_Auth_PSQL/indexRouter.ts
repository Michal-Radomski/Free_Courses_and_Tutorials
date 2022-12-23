import * as dotenv from "dotenv";
dotenv.config();
import express, { Router, Request, Response } from "express";
import bcrypt from "bcrypt";

import pool from "./dbConfig";

const indexRouter: Router = express.Router();

// GET
indexRouter.get("/", async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  await res.render("index", {});
});

indexRouter.get("/users/register", async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  await res.render("register", {});
});

indexRouter.get("/users/login", async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  await res.render("login", { messages: "test" });
});

indexRouter.get("/users/dashboard", async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  await res.render("dashboard", { user: "Michal" });
});

// POST
indexRouter.post("/users/register", async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, password2 } = req.body;
  const errors = [];
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
          return res.render("register", {
            message: "Email already registered",
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
              // req.flash("success_msg", "You are now registered. Please log in");
              res.redirect("/users/login");
            }
          );
        }
      }
    );
  }
});

export default indexRouter;
