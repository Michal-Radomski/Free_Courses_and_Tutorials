import express, { Request, Response } from "express";
import "reflect-metadata";
import { validate } from "class-validator";

import { User } from "./entity/User";
// import { Post } from './entity/Post'

import * as dotenv from "dotenv";
dotenv.config();

const indexRouter: express.Router = express.Router();

indexRouter.get("/users/:Id", async (req: Request, res: Response) => {
  const Id = req.params.Id;
  console.log(Id);

  try {
    // @ts-ignore
    const user = await User.findOneOrFail({ Id });

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ user: "User not found" });
  }
});

export default indexRouter;
