import {Request, Response} from "express";

const ToDoModel = require("../models/todo");

export const getToDo = async (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);

  try {
    const todo = await ToDoModel.find();
    res.send(todo);
  } catch (err) {
    res.send(err as string);
    console.log({err});
  }
};

export const saveToDo = (req: Request, res: Response) => {
  const {text} = req.body;

  ToDoModel.create({text})
    .then(() => res.set(201).send("Added Successfully..."))
    .catch((err: string) => console.log({err}));
};

export const deleteToDo = (req: Request, res: Response) => {
  const {_id} = req.body;

  ToDoModel.findByIdAndDelete(_id)
    .then(() => res.set(201).send("Deleted Successfully..." + _id))
    .catch((err: string) => console.log({err}));
};

export const updateToDo = (req: Request, res: Response) => {
  const {_id, text} = req.body;

  ToDoModel.findByIdAndUpdate(_id, {text})
    .then(() => res.set(201).send("Updated Successfully..." + _id))
    .catch((err: string) => console.log({err}));
};
