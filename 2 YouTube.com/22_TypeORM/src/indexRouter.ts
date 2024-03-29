import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import "reflect-metadata";
import { validate } from "class-validator";

import { User } from "./entity/User";
import { Post } from "./entity/Post";

const indexRouter: express.Router = express.Router();

// Create
indexRouter.post("/users", async (req: Request, res: Response): Promise<any> => {
  const { name, email, role } = req.body;

  try {
    const user = User.create({ name, email, role });

    const errors = await validate(user);
    if (errors.length > 0) {
      console.log({ errors });
      throw errors;
    }

    await user.save();

    return res.status(201).json(user);
  } catch (error) {
    console.log({ error });
    return res.status(500).json(error);
  }
});

// Read
indexRouter.get("/users", async (req: Request, res: Response): Promise<any> => {
  console.log("req.ip:", req.ip);
  try {
    const users = await User.find({ relations: ["posts"] });
    return res.status(200).json(users);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Update
indexRouter.put("/users/:uuid", async (req: Request, res: Response): Promise<any> => {
  const uuid = req.params.uuid;
  // console.log({ uuid });
  const { name, email, role } = req.body;

  try {
    const user = await User.findOneBy({ uuid });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Delete
indexRouter.delete("/users/:uuid", async (req: Request, res: Response): Promise<any> => {
  const uuid = req.params.uuid;

  try {
    const user = await User.findOneBy({ uuid });

    await user.remove();

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Something went wrong" });
  }
});

indexRouter.get("/users/:uuid", async (req: Request, res: Response): Promise<any> => {
  const uuid = req.params.uuid;

  try {
    const user = await User.findOneBy({ uuid });

    return res.status(200).json(user);
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ user: "User not found" });
  }
});

// Create a Post
indexRouter.post("/posts", async (req: Request, res: Response): Promise<any> => {
  const { userUuid, title, body } = req.body;

  try {
    const user = await User.findOneBy({ uuid: userUuid });
    const post = new Post({ title, body, user });

    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Read posts
indexRouter.get("/posts", async (req: Request, res: Response): Promise<any> => {
  console.log("req.ip:", req.ip);
  try {
    const posts = await Post.find({ relations: ["user"] });

    return res.status(200).json(posts);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Something went wrong" });
  }
});

export default indexRouter;
