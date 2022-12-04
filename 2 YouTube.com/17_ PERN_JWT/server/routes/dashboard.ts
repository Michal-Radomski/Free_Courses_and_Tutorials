import express, { Request, Response, Router } from "express";

import pool from "../psql";
import authorize from "../middleware/authorize";

interface CustomRequest extends Request {
  user?: { id?: string };
}

const dashboardRouter: Router = express.Router();

dashboardRouter.get("/", authorize, async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user!.id]);
    // console.log({ user });

    res.status(200).json(user.rows[0]);
  } catch (error) {
    console.error({ error });
    res.status(500).send("Server error" + error);
  }
});

export default dashboardRouter;
