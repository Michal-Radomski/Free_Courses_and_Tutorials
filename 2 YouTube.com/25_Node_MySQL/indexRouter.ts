import express, { Request, Response } from "express";

const indexRouter: express.Router = express.Router();

indexRouter.get("/test", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.render("views/home.hbs", {});
});

export default indexRouter;
