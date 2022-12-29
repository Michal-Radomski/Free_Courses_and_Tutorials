import express from "express";

import { getHomePage } from "./userController";

const indexRouter: express.Router = express.Router();

indexRouter.get("/", getHomePage);

export default indexRouter;
