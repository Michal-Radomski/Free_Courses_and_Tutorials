import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import passport from "passport";

// Load User model
import UserSchema, { IUser } from "../models/User";

const userRouter = express.Router();

// Login Page
userRouter.get("/login", (_req: Request, res: Response) => res.render("login"));

// Register Page
userRouter.get("/register", (_req: Request, res: Response) => res.render("register"));

export default userRouter;
