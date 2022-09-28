import express, { Express } from "express";
import mongoose from "mongoose";
require("dotenv").config();
const bodyParser = require("body-parser");
// const ejs = require("ejs"); //* Not necessary to import
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

// Import routes
const authRoute = require("./routes/auth");
const secretRoute = require("./routes/secrets");

// The server
const app: Express = express();

//Setup view engine EJS
app.set("view engine", "ejs");
// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

//Setup session
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);

//Initialize passport
app.use(passport.initialize());
//Use passport to deal with session
app.use(passport.session());

// Mongo DB
mongoose
  .connect(process.env.MONGO_URL as string)
  .then((con: { connection: { host: string } }) => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  })
  .catch((error: string) => console.log("Mongo DB Error => ", error));

//Route middleware
app.use("/", authRoute);
app.use("/", secretRoute);

// Test route
// app.get("/test", (req: Request, res: Response) => {
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
