import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";

const indexRouter: express.Router = express.Router();

indexRouter.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.render("home", {});
});

export default indexRouter;
