import axios from "axios";

import { IPost } from "../Types";

const url: string = "/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost: IPost) => axios.post(url, newPost);
export const likePost = (id: string) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id: string, updatedPost: IPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id: string) => axios.delete(`${url}/${id}`);
