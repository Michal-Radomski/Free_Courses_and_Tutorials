import express from "express";
import {Request, Response} from "express";
import config from "config";

import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import {deserializeUser} from "./middleware/";

// The App
const app = express();

// Mongo DB
connect();

// Middlewares -> parses incoming requests with JSON payloads -> //* The same as body-parser !!!
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Custom Middlewares
app.use(deserializeUser);

//Route middleware
// Empty -> routes.ts

// Test Route
app.get("/test", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

const port = (process.env.PORT || 5000 || config.get("port")) as number;

app.listen({port: port}, () => {
  //Route middleware
  routes(app);
  log.info(`Server is listening at http://localhost:${port}`);
  // For testing only
  log.info("Current Time:", new Date().toLocaleTimeString());
});
