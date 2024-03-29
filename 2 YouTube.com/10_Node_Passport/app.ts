import * as dotenv from "dotenv";
dotenv.config();
// const ejs = require("ejs"); //* Not necessary to import
import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import expressLayouts from "express-ejs-layouts";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";

// Import routes
import routes from "./routes/index";
import userRouter from "./routes/users";

// Import passportConfig
import passportConfig from "./config/passportConfig";
passportConfig(passport);

// The server
const app: Express = express();

// EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined"));
app.use(express.static("public"));

//Setup session
app.use(
  session({
    secret: process.env.SECRET as string,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);

// Passport middleware
//Initialize passport
app.use(passport.initialize());
//Use passport to deal with session
app.use(passport.session());

//Route middleware
app.use("/", routes);
app.use("/users", userRouter);

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
// app.get("/test", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   console.log("res.locals:", res.locals);
//   res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
// });

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
