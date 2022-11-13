import express, { Router } from "express";

import { deletePost, getPost, getPosts, sendPost, updatePost } from "./postController";
import { createUser } from "./userController";

const indexRouter: Router = express.Router();

indexRouter.get("/posts", getPosts);

indexRouter.get("/post/:id", getPost);
indexRouter.put("/post/:id", updatePost);
indexRouter.post("/post", sendPost);
indexRouter.delete("/post/:id", deletePost);

indexRouter.post("/users", createUser);

export default indexRouter;
