import express, {Express, Request, Response} from "express";
import mongoose from "mongoose";
require("dotenv").config();
const bodyParser = require("body-parser");

// Import routes

// The server
const app: Express = express();

// Middlewares
app.use(bodyParser.json());
//Route middleware

// Mongo DB
mongoose
  .connect(process.env.MONGO_URL as string)
  .then((con: {connection: {host: string}}) => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  })
  .catch((error: string) => console.log("Mongo DB Error => ", error));

// Test route
app.get("/", (req: Request, res: Response) => {
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
