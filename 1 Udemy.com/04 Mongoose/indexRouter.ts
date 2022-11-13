import express, { Router } from "express";

import { getPost, getPosts, sendPost, updatePost } from "./controller";

const indexRouter: Router = express.Router();

indexRouter.get("/posts", getPosts);

indexRouter.get("/post/:id", getPost);
indexRouter.put("/post/:id", updatePost);

indexRouter.post("/post", sendPost);

export default indexRouter;
