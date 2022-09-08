const express = require("express");
import {NextFunction, Request, Response} from "express";

const ServerSchemaRouter = express.Router();

const ServerSchema = require("../models/ServerSchema");

interface ServerPort {
  name: string;
  port: number;
  save: () => Promise<ServerPort>;
}

//* Routes
// Add
ServerSchemaRouter.route("/add").post(function (req: Request, res: Response) {
  const serverPort = new ServerSchema(req.body);
  serverPort
    .save()
    .then((serverPort: ServerPort) => {
      res.json({message: "Server added successfully", serverPort});
    })
    .catch((error: string) => {
      res.status(400).send("Unable to save to database" + error);
    });
});

// Get all
ServerSchemaRouter.route("/getall").get(function (_req: Request, res: Response) {
  ServerSchema.find(function (error: string, serverPorts: ServerPort[]) {
    if (error) {
      console.log(error);
    } else {
      res.json({serverPorts: serverPorts});
    }
  });
});

// Get by id
ServerSchemaRouter.route("/edit/:id").get(function (req: Request, res: Response) {
  const id = req.params.id;
  ServerSchema.findById(id, function (error: string, serverPort: ServerPort) {
    if (error) {
      console.log(error);
    }
    res.json({serverPort});
  });
});

// Update by id
ServerSchemaRouter.route("/update/:id").post(function (req: Request, res: Response, next: NextFunction) {
  ServerSchema.findById(req.params.id, function (error: string, serverPort: ServerPort) {
    if (!serverPort) return next(new Error("Could not load Document" + error));
    else {
      // Update here:
      serverPort.name = req.body.name;
      serverPort.port = req.body.port;

      serverPort
        .save()
        .then((serverPort: ServerPort) => {
          res.json("Update complete" + serverPort);
        })
        .catch((error) => {
          console.log({error});
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Delete by id
ServerSchemaRouter.route("/delete/:id").get(function (req: Request, res: Response) {
  ServerSchema.findByIdAndRemove({_id: req.params.id}, function (error: string, serverPort: ServerPort) {
    if (error) {
      console.log({error});
      res.json(error);
    } else res.json("Successfully removed:" + serverPort);
  });
});

module.exports = ServerSchemaRouter;
