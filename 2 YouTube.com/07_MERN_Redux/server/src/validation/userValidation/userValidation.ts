import { RequestHandler, Request, Response, NextFunction } from "express";

import validator from "../validator";
import { userSchema } from "./userSchema";

export const signupUserValidation: RequestHandler = (req: Request, _res: Response, next: NextFunction) =>
  validator(userSchema.signupUser, req.body, next);

export const signinUserValidation: RequestHandler = (req: Request, _res: Response, next: NextFunction) =>
  validator(userSchema.signinUser, req.body, next);

export const sendVerificationMailValidation: RequestHandler = (req: Request, _res: Response, next: NextFunction) =>
  validator(userSchema.sendVerificationMail, req.body, next);

export const verifyUserMailValidation: RequestHandler = (req: Request, _res: Response, next: NextFunction) =>
  validator(userSchema.verifyUserMail, req.body, next);

export const sendForgotPasswordMailValidation: RequestHandler = (req: Request, _res: Response, next: NextFunction) =>
  validator(userSchema.sendForgotPasswordMail, req.body, next);

export const verifyForgotMailValidation: RequestHandler = (req: Request, _res: Response, next: NextFunction) =>
  validator(userSchema.verifyForgotMail, req.body, next);
