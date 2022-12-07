import express, { Request, Response, Router } from "express";

import pool from "../psql";
import authorize from "../middleware/authorize";

interface CustomRequest extends Request {
  user?: { id?: string };
}

const dashboardRouter: Router = express.Router();

// Get all todos and name
dashboardRouter.get("/", authorize, async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const user = await pool.query(
      "SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
      [req.user!.id]
    );
    res.status(200).json(user.rows);
  } catch (error) {
    console.error({ error });
    res.status(500).send("Server error");
  }
});

// Create a todo
dashboardRouter.post("/todos", authorize, async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    // console.log("req.body:", req.body);
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *", [
      req.user!.id,
      description,
    ]);
    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    console.error({ error });
  }
});

// Update a todo
dashboardRouter.put("/todos/:id", authorize, async (req: CustomRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user!.id]
    );

    if (updateTodo.rows.length === 0) {
      return res.status(403).json("This todo is not yours");
    }

    res.status(200).json("Todo was updated");
  } catch (error) {
    console.error({ error });
  }
});

// Delete a todo
dashboardRouter.delete("/todos/:id", authorize, async (req: CustomRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *", [
      id,
      req.user!.id,
    ]);

    if (deleteTodo.rows.length === 0) {
      return res.status(403).json("This Todo is not yours");
    }

    res.status(200).json("Todo was deleted");
  } catch (error) {
    console.error({ error });
  }
});

export default dashboardRouter;
