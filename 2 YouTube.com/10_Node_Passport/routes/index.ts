import express, { Request, Response } from "express";

// const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const router = express.Router();

// Home/ Welcome Page
router.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("welcome");
  // res.render("welcome");
});

// Dashboard
router.get("/dashboard", (req: Request, res: Response) =>
  res.render("dashboard", {
    user: req.user,
  })
);

export default router;
