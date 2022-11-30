import express from "express";

import { createToDo, deleteToDo, getAllToDos, getToDo, updateToDo } from "./controller";

const indexRouter: express.Router = express.Router();

// Create a todo
indexRouter.post("/todos", createToDo);

// Get all todos
indexRouter.get("/todos", getAllToDos);

// Get a todo by id
indexRouter.get("/todos/:id", getToDo);

// Update a todo by id
indexRouter.put("/todos/:id", updateToDo);

// Delete a todo by id
indexRouter.delete("/todos/:id", deleteToDo);

export default indexRouter;
