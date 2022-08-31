//- Curl Commands:
//* curl -d '{"name": "Michal"}' -H "Content-Type: application/json" http://localhost:5000/data
//* curl -d '{"name": "Bedroom", "serial": "001", "temperature": 26.05}' -H "Content-Type: application/json" http://localhost:5000/data
//* curl -d '{"name": "Kitchen", "serial": "001", "temperature": 25.05}' -H "Content-Type: application/json" http://localhost:5000/data
//* curl -d '{"name": "Salon", "serial": "001", "temperature": 22.65}' -H "Content-Type: application/json" http://localhost:5000/data
//* curl -d '{"name": "Salon2", "serial": "001", "temperature": 20.00}' -H "Content-Type: application/json" http://localhost:5000/data?key=12345
//* curl -d '{"name": "Salon6", "serial": "001", "temperature": 20.00}' -H "Content-Type: application/json" -H "hmac: edecd53ef508cf7bc2a52cc3573c9f04ff14d0ec" http://localhost:5000/data?key=12345

// hmac: edecd53ef508cf7bc2a52cc3573c9f04ff14d0ec

const express = require("express");
import {NextFunction, Request, Response} from "express";
const {Sequelize, DataTypes} = require("sequelize");
const helmet = require("helmet");
const compression = require("compression");
import rateLimit from "express-rate-limit";

const crypto = require("crypto");

const HMAC_KEY = "cupcakes";

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
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

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 10, // Limit each IP to 10 requests per `window` (here, per 2 minutes)
});

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(limiter);

const port = (process.env.PORT || 5000) as number;

// app.get("/hello", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>Hello, API is running</h1>");
// });

app.use((req: Request, res: Response, next: NextFunction) => {
  let key = req.query.key;
  console.log({key});
  if (!key || key !== "12345") {
    res.status(403).send("Access denied");
    return;
  }
  next();
});

app.get("/data", async (req: Request, res: Response) => {
  let limit = req.query.limit || 10;
  let offset = req.query.offset || 0;
  const allData = await SensorData.findAll({limit: limit, offset: offset});
  console.log("req.ip:", req.ip);
  console.log({allData});
  res.status(200).send(allData);
  return;
});

app.post("/data", async (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  let data = req.body;
  console.log({data});
  let hmac = req.headers["hmac"];
  let hmacExpected = crypto.createHmac("sha1", HMAC_KEY).update(JSON.stringify(data)).digest("hex");
  console.log({hmac});
  console.log({hmacExpected});

  let hmacEqual = crypto.timingSafeEqual(Buffer.from(hmac as string), Buffer.from(hmacExpected));
  console.log({hmacEqual});

  if (!hmacEqual) {
    res.status(403).send("Bad HMAC");
    return;
  }

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
