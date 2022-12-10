import express, { Request, Response } from "express";

// Prisma
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { checkForErrors, postValidationRules, userValidationRules } from "./validation";

const indexRouter: express.Router = express.Router();

//* Users
// Create
indexRouter.post("/users", userValidationRules, checkForErrors, async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw { email: "Email already exists" };
    const user = await prisma.user.create({
      data: { name, email, role },
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// Read
indexRouter.get("/users", async (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  try {
    const users = await prisma.user.findMany({
      select: {
        uuid: true,
        name: true,
        role: true,
        posts: {
          select: {
            body: true,
            title: true,
          },
        },
      },
    });

    return res.json(users);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Update
indexRouter.put("/users/:uuid", userValidationRules, checkForErrors, async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  const uuid = req.params.uuid;
  try {
    let user = await prisma.user.findUnique({ where: { uuid } });
    console.log({ user });
    if (!user) throw { user: "User not found" };

    user = await prisma.user.update({
      where: { uuid },
      data: { name, email, role },
    });

    return res.json(user);
  } catch (error) {
    console.log({ error });
    return res.status(404).json(error);
  }
});

// Delete
indexRouter.delete("/users/:uuid", async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({ where: { uuid: req.params.uuid } });

    return res.json({ message: "User deleted" });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// Find
indexRouter.get("/users/:uuid", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { uuid: req.params.uuid } });

    return res.json(user);
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ user: "User not found" });
  }
});

//* Posts
// Create a post
indexRouter.post("/posts", postValidationRules, checkForErrors, async (req: Request, res: Response) => {
  const { title, body, userUuid } = req.body;
  try {
    const post = await prisma.post.create({
      data: { title, body, user: { connect: { uuid: userUuid } } },
    });

    return res.json(post);
  } catch (error) {
    console.log({ error });
    return res.status(500).json(error);
  }
});

// Read all posts
indexRouter.get("/posts", async (_req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });

    return res.json(posts);
  } catch (error) {
    console.log({ error });
    return res.status(500).json(error);
  }
});

export default indexRouter;
