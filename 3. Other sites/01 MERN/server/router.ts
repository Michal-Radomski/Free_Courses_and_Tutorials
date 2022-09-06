export {};
const express = require("express");
import {Request, Response} from "express";
const router = express.Router();

// Test route
router.get("/test", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

module.exports = router;
