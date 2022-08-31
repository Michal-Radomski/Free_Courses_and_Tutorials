//- Curl Commands:
//* curl -d '{"name": "Michal"}' -H "Content-Type: application/json" http://localhost:5000/data

const express = require("express");
import {Request, Response} from "express";
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
});

const app = express();
app.use(express.json());

const port = (process.env.PORT || 5000) as number;

// app.get("/hello", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>Hello, API is running</h1>");
// });

const dataList = [] as Array<any>;

app.get("/data", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send(dataList);
  return;
});

app.post("/data", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  let data = req.body;
  console.log({data});
  dataList.push(data);
  res.status(201).send(data);
  return;
});

app.listen({port: port}, async () => {
  await console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  await console.log("Current Time:", new Date().toLocaleTimeString());

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
