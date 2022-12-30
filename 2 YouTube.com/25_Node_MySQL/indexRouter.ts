import express from "express";

import { addUser, findUser, formPage, viewUsers } from "./userController";

const indexRouter: express.Router = express.Router();

indexRouter.get("/", viewUsers);
indexRouter.post("/", findUser);

indexRouter.get("/adduser", formPage);
indexRouter.post("/adduser", addUser);

export default indexRouter;
