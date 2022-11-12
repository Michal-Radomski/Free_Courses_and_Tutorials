import { Request, RequestHandler, Response } from "express";

import Post, { IPost } from "./Model";

export const getPosts: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  console.log("req.ip:", req.ip);
  try {
    const list: IPost[] = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json(list);
  } catch (error) {
    console.log({ error });
    res.status(404).json(error);
  }
};

export const sendPost: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const newPost = new Post({
      text: req.body.text,
      title: req.body.title,
    });
    const post = await newPost.save();
    // console.log({post});

    res.status(201).json(post);
  } catch (error) {
    console.log({ error });
  }
};
