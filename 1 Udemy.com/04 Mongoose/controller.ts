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
      viewCounter: req.body.viewCounter,
    });
    const post = await newPost.save();
    // console.log({post});

    res.status(201).json(post);
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};

export const getPost: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  console.log("req.ip:", req.ip);
  try {
    const post = await Post.findById(req.params.id);
    // console.log(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error({ error });
    res.status(500).send("Server Error");
  }
};

export const updatePost: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, text } = req.body;
    const id = req.params.id;
    // console.log({ id });
    const post = await Post.findById(id);
    // console.log({ post });
    if (!post) {
      console.log(`No post with this _id: ${id}`);
      return res.status(404).json({ msg: `No post with this _id: ${id}` });
    }
    const updatedPost = { title: title, text: text, id: id };

    await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    res.status(202).json(updatedPost);
  } catch (error) {
    console.error({ error });
    res.status(500).send("Server Error");
  }
};
