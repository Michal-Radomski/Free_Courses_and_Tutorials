import { RequestHandler, Request, Response, NextFunction } from "express";
import createHttpError, { InternalServerError } from "http-errors";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User";
import { JWT_KEY } from "../config/config";

export const signupUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  //* Validation check by Validation files
  // if (password.length < 8) {
  //   console.log("Password must be at least 8 characters long");
  //   return next(createHttpError(400, "Password must be at least 8 characters long"));
  // }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createHttpError(422, "Email Already Exist!"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword });
    // console.log({ salt, user });
    await user.save(); //* Can be: await User.create({ name, email, password: hashedPassword })

    res.json({ message: "User Created", user });
  } catch (error) {
    console.log({ error });
    return next(InternalServerError);
  }
};

export const signinUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(404, "User not Found!"));
    }
    // if (!user.isUserVerified) {
    //   return next(createHttpError(406, "User not Verified"));
    // }

    const isValidPassword: boolean = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return next(createHttpError(401, "Not Valid Password!"));
    }

    // res.json({ message: "User Logged In" });

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        userId: user.id,
      },
      JWT_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    // console.log({ token });

    res.cookie("jwt", token, { httpOnly: true });
    res.json({ message: "User Logged In", name: user.name, token });
  } catch (error) {
    console.log({ error });
    return next(InternalServerError);
  }
};
