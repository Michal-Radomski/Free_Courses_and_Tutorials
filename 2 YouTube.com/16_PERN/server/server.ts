import http from "http";
// import path from "path";

import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";

// Import routes
import indexRouter from "./indexRouter";

// The server
const app: Express = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);

//Route middleware
app.use("/api", indexRouter);

// Test route
app.get("/test", (req: Request, res: Response) => {
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

//* ---------------------
//* Deployment to Heroku -> add React build to client/build - second tutorial

// app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static("./client/build")); => for demonstration

// console.log({ __dirname });
// console.log("path.join(__dirname, '/'):", path.join(__dirname, "/"));
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));
// }

//* Catch all method
// app.get("/*", (_req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });
