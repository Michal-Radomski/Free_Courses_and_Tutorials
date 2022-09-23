import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/AuthUser";

const secret = process.env.SECRET as string;

export const signin: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ userData: existingUser, token });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Something went wrong" + error });
  }
};

export const signup: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log({ salt, hashedPassword });

    const userData = await UserModel.create({ email: email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: userData.email, id: userData._id }, secret, { expiresIn: "1h" });

    res.status(201).json({ userData, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" + error });

    console.log({ error });
  }
};
