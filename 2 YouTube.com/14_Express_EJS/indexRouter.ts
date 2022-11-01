import * as dotenv from "dotenv";
dotenv.config();
import express, { Router, Request, Response } from "express";

const indexRouter: Router = express.Router();

indexRouter.get("/", async (req: Request, res: Response) => {
  await console.log("req.ip:", req.ip);
  await res.render("pages/index", {});
});

indexRouter.get("/*", async (_req: Request, res: Response) => {
  res.send("<h1 style='color:blue;text-align:center'>Page Not Found</h1>");
});

export default indexRouter;
