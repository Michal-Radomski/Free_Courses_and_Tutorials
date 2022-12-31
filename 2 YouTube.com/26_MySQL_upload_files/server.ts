import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";

import http from "http";
import path from "path";

// Import routes
import indexRouter from "./indexRouter";

// Import DB settings
import pool from "./dbConfig";
pool.getConnection((error, connection) => {
  if (error) {
    console.log({ error });
    throw error;
  }
  console.log(`Connected as ID: ${connection.threadId}`);
});

// The server
const app: Express = express();

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

// View engine
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/public/favicon.png"));
});

//* Less styles
app.get("/*/styles.less", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/public/styles.less"));
});

// Test Route
app.get("/test", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>Server is running</h1>");
});

//Route middleware
app.use("/", indexRouter);

// Port
const port = (process.env.PORT || 5000) as number;

const server = http.createServer(app);
server.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
