import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";

// import PostMessage, { IPost } from "../models/PostMessage"; //* V1-> Mongoose Model
import { PostMessage, IPost } from "../models/PostMessage"; //* v2 -> Typegoose Model
import { CustomError } from "../Types";

interface CustomRequest extends Request {
  userId?: string;
}

export const getPosts: RequestHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const postMessages: IPost[] = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: (error as CustomError).message });
  }
};

//* Unnecessary
// export const getPost: RequestHandler = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;

//   try {
//     const post: IPost | null = await PostMessage.findById(id);

//     res.status(200).json(post);
//   } catch (error) {
//     res.status(404).json({ message: (error as CustomError).message });
//   }
// };

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
  // console.log({ id: _id });
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
  // console.log({ id });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: `Post with id: ${id} deleted successfully.` });
};

export const likePost: RequestHandler = async (req: CustomRequest, res: Response): Promise<any> => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post: IPost | null = await PostMessage.findById(id);

  const index = post?.likes.findIndex((id: string) => id === String(req.userId));
  console.log({ index });

  if (index === -1) {
    // Like a Post
    post?.likes.push(req.userId);
  } else {
    // Dislike a Post
    post!.likes = post!.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post as IPost, { new: true });
  res.status(200).json(updatedPost);
};
