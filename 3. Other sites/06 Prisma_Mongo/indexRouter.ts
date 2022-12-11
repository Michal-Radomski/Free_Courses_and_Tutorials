import express from "express";

import { AddTask, DeleteOneTask, FetchAllTasks, FetchOneTask, UpdateOneTask } from "./controller";

const indexRouter: express.Router = express.Router();

indexRouter.post("/tasks", AddTask);
indexRouter.get("/tasks/:id", FetchOneTask);
indexRouter.get("/tasks", FetchAllTasks);
indexRouter.put("/tasks/:id", UpdateOneTask);
indexRouter.delete("/tasks/:id", DeleteOneTask);

export default indexRouter;
