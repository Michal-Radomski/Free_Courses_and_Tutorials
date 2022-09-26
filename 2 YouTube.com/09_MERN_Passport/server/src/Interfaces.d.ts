// Types and Interfaces

import { Request } from "express";

import { UserInterface } from "./models/User";

export interface CustomRequest extends Request {
  user: UserInterface;
}
