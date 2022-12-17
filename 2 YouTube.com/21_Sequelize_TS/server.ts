import http from "http";

import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import db from "./models/index";

//* Seeders
// import { users } from "./seeders/users";
// const createUsers = () => {
//   users.map((user) => {
//     db.User.create(user);
//   });
// };
// createUsers();

// import { projects } from "./seeders/projects";
// const createProjects = () => {
//   projects.map((project) => {
//     db.Project.create(project);
//   });
// };
// createProjects();

// import { projectAssignments } from "./seeders/projectAssignments";
// const createProjectsAssignments = () => {
//   projectAssignments.map((projectAssignment) => {
//     db.ProjectAssignment.create(projectAssignment);
//   });
// };
// createProjectsAssignments();

// Import routes
import indexRouter from "./indexRouter";

// The server
const app: Express = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

//Route middleware
app.use("/api", indexRouter);

// Test route
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

// Port
const port = (process.env.PORT || 5000) as number;

const server = http.createServer(app);

db.sequelize.sync().then(() => {
  server.listen({ port: port }, () => {
    console.log(`Server is listening at http://localhost:${port}`);
    // For testing only
    console.log("Current Time:", new Date().toLocaleTimeString());
  });
});
