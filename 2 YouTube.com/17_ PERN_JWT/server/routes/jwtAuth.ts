import express, { Request, Response, Router } from "express";
import bcrypt from "bcrypt";

import pool from "../psql";
import jwtGenerator from "../utils/jwtGenerator";

const jwtAuthRouter: Router = express.Router();

// Register
jwtAuthRouter.post("/register", async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
    // console.log({ user });

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(12);
    const bcryptPassword = await bcrypt.hash(password, salt);
    // console.log({ salt, bcryptPassword });

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );
    // console.log({ newUser });

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);
    // console.log({ jwtToken });

    return res.status(200).json({ jwtToken });
  } catch (error) {
    console.error({ error });
    res.status(500).send("Server error" + error);
  }
});

export default jwtAuthRouter;
