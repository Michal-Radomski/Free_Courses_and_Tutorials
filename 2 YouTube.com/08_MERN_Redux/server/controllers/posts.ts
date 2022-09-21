import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";

// import PostMessage, { IPost } from "../models/PostMessage"; //* V1-> Mongoose Modele
import { PostMessage, IPost } from "../models/PostMessage"; //* v2 -> Typegoose Model
import { CustomError } from "../Types";

export const getPosts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const postMessages: IPost[] = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: (error as CustomError).message });
  }
};

export const getPost: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const post: IPost | null = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: (error as CustomError).message });
  }
};

export const createPost: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { title, message, selectedFile, creator, tags } = req.body;

  const newPostMessage: IPost = new PostMessage({ title, message, selectedFile, creator, tags });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: (error as CustomError).message });
  }
};

export const updatePost: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const { id: _id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with this _id: ${_id}`);
  }

  const updatedPost = { creator, title, message, tags, selectedFile, _id: _id };

  await PostMessage.findByIdAndUpdate(_id, updatedPost, { new: true });
  res.json(updatedPost);
};

export const deletePost: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost: RequestHandler = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  const post: IPost | null = await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post!.likeCount + 1 }, { new: true });

  res.json(updatedPost);
};
