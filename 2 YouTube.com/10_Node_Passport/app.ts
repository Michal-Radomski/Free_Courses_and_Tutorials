import * as dotenv from "dotenv";
dotenv.config();
// const ejs = require("ejs"); //* Not nesesery to import
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import expressLayouts from "express-ejs-layouts";
import passport from "passport";
import flash from "connect-flash";
import session from "express-session";

// Import routes
import routes from "./routes/index";
import userRouter from "./routes/users";

// The server
const app: Express = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

//Route middleware
app.use("/", routes);
app.use("/users", userRouter);

// Express session
app.use(
  session({
    secret: process.env.SECRET as string,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Mongo DB
mongoose
  .connect(process.env.MONGO_URL as string, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con: { connection: { host: string } }) => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  })
  .catch((error: string) => console.log("Mongo DB Error => ", error));

// // Test route
// app.get("/", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
// });

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
