import express, { Request, Response } from "express";

import { login, logout, register } from "../controllers/users";

const userRouter = express.Router();

// Login Page
userRouter.get("/login", async (_req: Request, res: Response) => await res.render("login"));

// Register Page
userRouter.get("/register", async (_req: Request, res: Response) => await res.render("register"));

// Register
userRouter.post("/register", register);

// Login
userRouter.post("/login", login);

// Logout
userRouter.get("/logout", logout);

export default userRouter;
