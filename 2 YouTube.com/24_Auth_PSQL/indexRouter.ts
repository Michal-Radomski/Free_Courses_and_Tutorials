import express, { Router, Request, Response } from "express";

const indexRouter: Router = express.Router();

indexRouter.get("/", async (req: Request, res: Response) => {
  await console.log("req.ip:", req.ip);
  await res.render("index", {});
});

export default indexRouter;
