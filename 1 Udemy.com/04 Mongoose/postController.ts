import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";

import Post, { IPost } from "./PostModel";

export const getPosts: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  console.log("req.ip:", req.ip);
  try {
    const list: IPost[] = await Post.find({}, { id: 1, title: 1, text: 1, author: 1 }).sort({ createdAt: -1 });
    res.status(200).json(list);
  } catch (error) {
    console.log({ error });
    res.status(404).json(error);
  }
};

export const sendPost: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const newPost: IPost = new Post({
      text: req.body.text,
      title: req.body.title,
      viewCounter: req.body.viewCounter,
      author: req.body.author,
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
    const post = await Post.findById(req.params.id).populate("author");
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

export const deletePost: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  console.log("req.ip:", req.ip);
  try {
    const { id } = req.params;
    // console.log({ id });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No post with id: ${id}`);
    }
    await Post.findByIdAndRemove(id);
    res.status(200).json({ message: `Post with id: ${id} deleted successfully.` });
  } catch (error) {
    console.error({ error });
    res.status(500).send("Server Error");
  }
};
