import http from "http";

import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

// Import routes
import indexRouter from "./indexRouter";

// The server
const app: Express = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

//Route middleware
app.use("/api", indexRouter);

// Test route
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

// Port
const port = (process.env.PORT || 5000) as number;

const server = http.createServer(app);
server.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
