import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import passport from "passport";

import http from "http";
import path from "path";

// Import routes
import indexRouter from "./indexRouter";

// The server
const app: Express = express();

// Passport
import initializePassport from "./passportConfig";
initializePassport(passport);

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined"));

// Express-session
app.use(
  session({
    // Key we want to keep secret which will encrypt all of our information
    secret: process.env.SESSION_SECRET as string,
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no value which we do not want to do
    saveUninitialized: false,
  })
);

// Function inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(session) above
app.use(passport.session());

app.use(flash());

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/public/favicon.png"));
});
//* Less styles
app.get("/*/styles.less", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/public/styles.less"));
});

// // Test Route
// app.get("/test", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>Server is running</h1>");
// });

//Route middleware
app.use("/", indexRouter);

// Port
const port = (process.env.PORT || 5000) as number;

const server = http.createServer(app);
server.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
