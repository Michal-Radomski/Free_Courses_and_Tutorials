import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
const bodyParser = require("body-parser");
const config = require("config");

const mongoURI: string = config.get("mongoURI");
// console.log({ mongoURI });

// Import routes
const bookRoutes = require("./routes/books");

// The server
const app: Express = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
//Route middleware
app.use("/api/books", bookRoutes);

// Mongo DB
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(mongoURI, options)
  .then((con: { connection: { host: string } }) => {
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

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
