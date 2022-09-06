export {};
const express = require("express");
import {Request, Response} from "express";
const router = express.Router();

// Test route
router.get("/test", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.json("API is running correctly");
});

module.exports = router;
