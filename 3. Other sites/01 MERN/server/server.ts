const express = require("express");
import {Request, Response} from "express";

// App
const app = express();

// Test route
app.get("/test", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({port: port}, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
