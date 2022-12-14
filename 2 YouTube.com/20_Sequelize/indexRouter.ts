import express, { Request, Response } from "express";

const { User, Post } = require("./models/index");

const indexRouter: express.Router = express.Router();

indexRouter.post("/users", async (req: Request, res: Response): Promise<any> => {
  const { name, email, role } = req.body;

  try {
    const user = await User.create({ name, email, role });

    return res.status(200).json(user);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
});

indexRouter.get("/users", async (req: Request, res: Response): Promise<any> => {
  console.log("req.ip:", req.ip);
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Something went wrong" });
  }
});

indexRouter.get("/users/:uuid", async (req: Request, res: Response): Promise<any> => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid },
      include: "posts",
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Something went wrong" });
  }
});

indexRouter.delete("/users/:uuid", async (req: Request, res: Response): Promise<any> => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({ where: { uuid } });

    await user.destroy();

    return res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Something went wrong" });
  }
});

indexRouter.put("/users/:uuid", async (req: Request, res: Response): Promise<any> => {
  const uuid = req.params.uuid;
  const { name, email, role } = req.body;
  try {
    const user = await User.findOne({ where: { uuid } });

    user.name = name;
    user.email = email;
    user.role = role;

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Something went wrong" });
  }
});

indexRouter.post("/posts", async (req: Request, res: Response): Promise<any> => {
  const { userUuid, body } = req.body;

  try {
    const user = await User.findOne({ where: { uuid: userUuid } });

    const post = await Post.create({ body, userId: user.id });

    return res.status(200).json(post);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
});

indexRouter.get("/posts", async (req: Request, res: Response): Promise<any> => {
  console.log("req.ip:", req.ip);
  try {
    const posts = await Post.findAll({ include: "user" });

    return res.status(200).json(posts);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
});

export default indexRouter;
