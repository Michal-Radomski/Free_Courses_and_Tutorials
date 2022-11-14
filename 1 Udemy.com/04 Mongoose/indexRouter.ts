import express, { Router } from "express";

import { deletePost, getPost, getPosts, sendPost, updatePost } from "./postController";
import { createUser, getUsers } from "./userController";

const indexRouter: Router = express.Router();

indexRouter.get("/posts", getPosts);

indexRouter.get("/post/:id", getPost);
indexRouter.put("/post/:id", updatePost);
indexRouter.post("/post", sendPost);
indexRouter.delete("/post/:id", deletePost);

indexRouter.get("/users", getUsers);
indexRouter.post("/user", createUser);

export default indexRouter;
