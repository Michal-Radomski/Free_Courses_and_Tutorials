import express, { Express, Request, Response } from "express";
import cors from "cors";
require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");

// Import routes

// The server
const app: Express = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));
//Route middleware

// Test route
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  // console.log("Cookies: ", req.cookies);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
