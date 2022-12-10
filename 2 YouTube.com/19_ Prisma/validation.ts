import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const userValidationRules = [
  body("email")
    .isLength({ min: 5 })
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Must be a valid email address"),
  body("name").isLength({ min: 3 }).withMessage("Name must not be empty"),
  body("role")
    .isIn(["ADMIN", "USER", "SUPERADMIN", undefined])
    .withMessage(`Role must be one of 'ADMIN', 'USER', 'SUPERADMIN'`),
];

const simpleValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

export const checkForErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = simpleValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }
  next();
};

export const postValidationRules = [body("title").isLength({ min: 5 }).withMessage("Title must not be empty")];
