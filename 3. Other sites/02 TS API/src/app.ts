import express from "express";
import {Request, Response} from "express";
import config from "config";
// import { deserializeUser } from "./middleware";

// The App
const app = express();
// app.use(deserializeUser);

// Parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Test Route
app.get("/test", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

const port = (process.env.PORT || 5000 || config.get("port")) as number;

app.listen({port: port}, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
