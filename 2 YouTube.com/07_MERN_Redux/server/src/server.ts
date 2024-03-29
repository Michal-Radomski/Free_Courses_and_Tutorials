import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
import passport from "passport";
import createHttpError from "http-errors";

import JwtStrategy from "./middleware/passport";
import errorHandler from "./middleware/errorHandler";

// Import routes
import userRoutes from "./routes/userRoutes";

// The server
const app: Express = express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("combined"));

app.use(passport.initialize());
JwtStrategy(passport); //* Check if user if authenticated
// console.log({ JwtStrategy });

//Route middleware
app.use("/api/user", userRoutes);

app.use(() => {
  throw createHttpError(404, "Route not found");
});

app.use(errorHandler);

// Mongo DB
mongoose
  .connect(process.env.MONGO_PATH as string)
  .then((con: { connection: { host: string } }) => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  })
  .catch((error: string) => console.log("Mongo DB Error => ", error));

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
