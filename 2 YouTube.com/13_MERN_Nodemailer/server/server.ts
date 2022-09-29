import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

const sendEmail = require("./sendEmail");

// The server
const app: Express = express();

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: "GET,POST",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));

// Test route
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

app.post("/api/send-email", async (req: Request, res: Response) => {
  const { email } = req.body;
  // console.log({ email });
  try {
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = "Thank You Message From NodeCourse";
    const message = `
        <h3>Hello</h3>
        <p>Thank for your YouTube Node Tutorials</p>
        <p>Regards...</p>
    `;

    await sendEmail(subject, message, send_to, sent_from, reply_to);

    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
