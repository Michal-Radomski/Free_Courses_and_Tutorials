import { RequestHandler, Request, Response, NextFunction } from "express";

import validator from "../validator";
import { userSchema } from "./userSchema";

export const signupUserValidation: RequestHandler = (req: Request, _res: Response, next: NextFunction) =>
  validator(userSchema.signupUser, req.body, next);
export const signinUserValidation: RequestHandler = (req: Request, _res: Response, next: NextFunction) =>
  validator(userSchema.signinUser, req.body, next);
