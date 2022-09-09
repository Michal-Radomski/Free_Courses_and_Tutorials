import express, {Express, Request, Response} from "express";
import mongoose from "mongoose";
import cors from "cors";
require("dotenv").config();
const bodyParser = require("body-parser");

// Import routes
import todoRoutes from "./routes/routes";

// The server
const app: Express = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
//Route middleware
app.use(todoRoutes);

// Mongo DB
const options = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.set("useFindAndModify", false);

mongoose
  .connect(process.env.DATABASE as string, options)
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
