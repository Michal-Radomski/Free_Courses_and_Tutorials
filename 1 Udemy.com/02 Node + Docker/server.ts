//- Curl Commands:
//* curl -d '{"name": "Michal"}' -H "Content-Type: application/json" http://localhost:5000/data
//* curl -d '{"name": "Bedroom", "serial": "001", "temperature": 26.05}' -H "Content-Type: application/json" http://localhost:5000/data
//* curl -d '{"name": "Kitchen", "serial": "001", "temperature": 25.05}' -H "Content-Type: application/json" http://localhost:5000/data
//* curl -d '{"name": "Salon", "serial": "001", "temperature": 22.65}' -H "Content-Type: application/json" http://localhost:5000/data

const express = require("express");
import {Request, Response} from "express";

const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
});

const SensorData = sequelize.define("sensor-data", {
  // Model attributes are defined here
  serial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const app = express();
app.use(express.json());

const port = (process.env.PORT || 5000) as number;

// app.get("/hello", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>Hello, API is running</h1>");
// });

app.get("/data", async (req: Request, res: Response) => {
  const allData = await SensorData.findAll();
  console.log("req.ip:", req.ip);
  console.log({allData});
  res.status(200).send(allData);
  return;
});

app.post("/data", async (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  let data = req.body;
  console.log({data});
  const sensorData = await SensorData.create(data);
  console.log({sensorData});
  res.status(201).send(sensorData);
  return;
});

app.listen({port: port}, async () => {
  await console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  await console.log("Current Time:", new Date().toLocaleTimeString());

  try {
    await sequelize.authenticate();
    await console.log("Connection to the DB has been established successfully");
    await sequelize.sync({alter: true});
    await console.log("Sync to the DB");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
