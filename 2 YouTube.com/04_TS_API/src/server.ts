import express, { Express, Request, Response, NextFunction } from "express";
import http from "http";
import mongoose from "mongoose";

import { config } from "./config/config";
import Logging from "./library/Logging";
import authorRoutes from "./routes/Author";
import bookRoutes from "./routes/Book";

const app: Express = express();

/** Connect to Mongo */
mongoose
  .connect(config.mongo.url, { retryWrites: true })
  .then(() => {
    Logging.info("MongoDB connected successfully.");
    StartServer();
  })
  .catch((error) => Logging.error(error));

/** Only Start Server if Mongoose Connects */
const StartServer = () => {
  /** Log the request */
  app.use((req: Request, res: Response, next: NextFunction) => {
    /** Log the req */
    Logging.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on("finish", () => {
      /** Log the res */
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //   /** Rules of our API */
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  app.use("/authors", authorRoutes);
  app.use("/books", bookRoutes);

  /** Healthcheck */
  app.get("/ping", (req: Request, res: Response) => {
    console.log("req.ip:", req.ip);
    res.status(200).json({ hello: "world" });
  });

  //   /** Error handling */
  app.use((_req: Request, res: Response) => {
    const error = new Error("Not found");

    Logging.error(error);

    res.status(404).json({
      message: error.message
    });
  });

  http
    .createServer(app)
    .listen({ port: config.server.port }, () => Logging.info(`Server is running on port ${config.server.port}`));
};
