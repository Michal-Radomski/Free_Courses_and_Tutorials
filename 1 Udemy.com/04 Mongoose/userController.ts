import { Request, RequestHandler, Response } from "express";

import User, { IUser } from "./UserModel";

export const createUser: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const { name, role } = req.body;

  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser: IUser = await User.create({ name: name, role: role });
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" + error });
    console.log({ error });
  }
};
