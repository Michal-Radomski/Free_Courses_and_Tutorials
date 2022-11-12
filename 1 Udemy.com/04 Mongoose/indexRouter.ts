import express, { Router } from "express";

import { getPosts, sendPost } from "./controller";

const indexRouter: Router = express.Router();

indexRouter.get("/posts", getPosts);
indexRouter.post("/posts", sendPost);

export default indexRouter;
