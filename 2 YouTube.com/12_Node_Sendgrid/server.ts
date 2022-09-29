import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
const path = require("path");

import sendEmail from "./sendEmail";

// The server
const app: Express = express();

// EJS
app.set("view engine", "ejs");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use("/public", express.static(path.join(__dirname, "public")));

// Test route
// app.get("/test", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
// });

// Email routes
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.render("contact");
});

app.get("/sent", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.render("sent");
});

app.post("/sendemail", (req: Request, res: Response) => {
  const { name, surname, email } = req.body;
  // console.log({ name, surname, email });

  const from = process.env.FROM as string;
  const to = process.env.TO as string;

  const subject = "New Contact Request";

  const output = `
    <p>You have a new Contact Request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${name}</li>
      <li>Surname: ${surname}</li>
      <li>Email: ${email}</li>
    </ul>
  `;

  sendEmail(to, from, subject, output);
  res.redirect("/sent");
});

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
