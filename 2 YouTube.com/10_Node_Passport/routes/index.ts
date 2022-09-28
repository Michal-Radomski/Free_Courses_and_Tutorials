import express, { Request, Response } from "express";

import { ensureAuthenticated, forwardAuthenticated } from "../config/auth";

const router = express.Router();

// Home/ Welcome Page
router.get("/", forwardAuthenticated, async (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  // res.send("Welcome to port:5000");
  await res.render("welcome");
});

// Dashboard
router.get("/dashboard", ensureAuthenticated, async (req: Request, res: Response) => {
  // console.log("req.user:", req.user);
  await res.render("dashboard", {
    user: req.user,
  });
});

export default router;
