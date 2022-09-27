import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcryptjs";

import User, { UserInterface } from "../models/User";

// Register User by Username and Password
export const registerUser: RequestHandler = async (req: Request, res: Response) => {
  const { username, password } = req?.body;
  if (!username || !password || typeof username !== "string" || typeof password !== "string") {
    res.send("Improper Values");
    return;
  }
  User.findOne({ username }, async (error: Error, doc: UserInterface) => {
    if (error) {
      console.log({ error });
      throw error;
    }
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username: username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("Created");
      // res.status(201).json({ newUser });
    }
  });
};

export const deleteUser: RequestHandler = async (req: Request | any, res: Response) => {
  const { id }: { id: string } = req?.body;
  await User.findByIdAndDelete(id);
  res.send("success" + id);
};

export const getAllUsers: RequestHandler = async (_req: Request, res: Response) => {
  await User.find({}, (error, data: UserInterface[]) => {
    if (error) {
      console.log({ error });
      throw error;
    }

    const filteredUsers: UserInterface[] = [];
    data.forEach((item: UserInterface) => {
      const userInformation = {
        id: item._id,
        username: item.username,
        isAdmin: item.isAdmin,
      };
      filteredUsers.push(userInformation as UserInterface);
    });
    res.send(filteredUsers);
  });
};
