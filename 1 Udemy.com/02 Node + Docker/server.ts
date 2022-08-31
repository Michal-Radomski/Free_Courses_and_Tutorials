//- Curl Commands:
//* curl -d '{"name": "Michal"}' -H "Content-Type: application/json" http://localhost:5000/data

const express = require("express");
import {Request, Response} from "express";

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

app.listen({port: port}, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
