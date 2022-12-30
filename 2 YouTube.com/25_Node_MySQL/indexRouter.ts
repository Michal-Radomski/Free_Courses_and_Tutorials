import express from "express";

import { findUser, viewUsers } from "./userController";

const indexRouter: express.Router = express.Router();

indexRouter.get("/", viewUsers);

indexRouter.post("/", findUser);

export default indexRouter;
