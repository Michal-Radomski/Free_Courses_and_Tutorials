import express, { Request, Response, Router } from "express";
import bcrypt from "bcrypt";

import pool from "../psql";
import jwtGenerator from "../utils/jwtGenerator";
import validInfo from "../middleware/validInfo";
import authorize from "../middleware/authorize";

const jwtAuthRouter: Router = express.Router();

// Register
jwtAuthRouter.post("/register", validInfo, async (req: Request, res: Response): Promise<Object> => {
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
    throw error;
  }
});

// Login
jwtAuthRouter.post("/login", validInfo, async (req: Request, res: Response): Promise<Object | undefined> => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.status(200).json({ jwtToken });
  } catch (error) {
    console.error({ error });
    res.status(500).send("Server error" + error);
  }
});

// Verify
jwtAuthRouter.post("/verify", authorize, (_req: Request, res: Response) => {
  try {
    res.json(true);
  } catch (error) {
    console.error({ error });
    res.status(500).send("Server error");
  }
});

export default jwtAuthRouter;
