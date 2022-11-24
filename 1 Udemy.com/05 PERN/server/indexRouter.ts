import express, { Router, Request, Response } from "express";

const indexRouter: Router = express.Router();

indexRouter.get("/hello", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.status(200).json({ msg: "hello" });
});

export default indexRouter;
