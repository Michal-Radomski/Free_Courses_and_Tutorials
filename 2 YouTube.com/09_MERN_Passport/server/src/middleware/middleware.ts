import { Response, NextFunction } from "express";

import { CustomRequest } from "../Interfaces";
import User, { UserInterface } from "../models/User";

export const isAdministratorMiddleware = (req: CustomRequest | any, res: Response, next: NextFunction) => {
  const { user } = req;
  if (user) {
    User.findOne({ username: user.username }, (error: Error, doc: UserInterface) => {
      if (error) {
        console.log({ error });
        throw error;
      }
      if (doc?.isAdmin) {
        next();
      } else {
        res.send("Sorry, only admin's can perform this.");
      }
    });
  } else {
    res.send("Sorry, you aren't Logged In.");
  }
};
