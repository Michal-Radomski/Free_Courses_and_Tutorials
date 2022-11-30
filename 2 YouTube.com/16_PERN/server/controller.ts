import { Request, RequestHandler, Response } from "express";

import pool from "./psql";

export const createToDo: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
    console.log({ newTodo });
    res.status(201).json(newTodo.rows[0]);
  } catch (error) {
    console.error({ error });
  }
};

export const getAllToDos: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  console.log("req.ip:", req.ip);
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    console.log({ allTodos });
    res.status(200).json(allTodos.rows);
  } catch (error) {
    console.error({ error });
  }
};

export const getToDo: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    console.log({ todo });
    res.status(200).json(todo.rows[0]);
  } catch (error) {
    console.error({ error });
  }
};

export const updateToDo: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
    console.log({ updateTodo });
    res.status(200).json("Todo was updated!");
  } catch (error) {
    console.error({ error });
  }
};

export const deleteToDo: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    console.log({ deleteTodo });
    res.status(200).json("Todo was deleted!");
  } catch (error) {
    console.error({ error });
  }
};
