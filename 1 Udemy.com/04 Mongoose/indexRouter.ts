import express, { Router } from "express";

import { getPosts } from "./controller";

const indexRouter: Router = express.Router();

indexRouter.get("/posts", getPosts);

export default indexRouter;
