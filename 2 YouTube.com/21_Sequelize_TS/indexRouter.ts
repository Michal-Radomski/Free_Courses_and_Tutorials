import express, { Request, Response } from "express";

import db from "./models/index";

const indexRouter: express.Router = express.Router();

indexRouter.get("/users", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  db.User.findAll({
    include: {
      model: db.Project,
    },
  })
    .then((result: object) => res.json(result))
    .catch((error: object) => console.error(error));
});

export default indexRouter;
