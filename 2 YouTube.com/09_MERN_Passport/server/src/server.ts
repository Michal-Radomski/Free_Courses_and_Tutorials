import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";

// Import routes
import userRoutes from "./routes/userRoutes";

// Import passportConfig
import passportConfig from "./config/passportConfig";
passportConfig(passport);

// The server
const app: Express = express();

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(
  session({
    secret: process.env.SECRET as string,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());

// Passport
app.use(passport.initialize());
app.use(passport.session());

//Route middleware
app.use("/api", userRoutes);

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
  .catch((error: Error) => console.log("Mongo DB Error => ", error));

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
