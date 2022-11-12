import { Request, RequestHandler, Response } from "express";

import Post, { IPost } from "./Model";

export const getPosts: RequestHandler = async (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  try {
    const list: IPost[] = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(list);
  } catch (error) {
    console.log({ error });
    res.status(404).json(error);
  }
};
