import axios from "axios";

import { IPost, SignUp } from "../Types";

const Api = axios.create({ baseURL: "/api" });

Api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers!.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile") as string).token}`;
    // console.log("req.headers!.Authorization:", req.headers!.Authorization);
  }
  // console.log({ req });
  return req;
});

// Posts
export const fetchPosts = () => Api.get("/posts");
export const createPost = (newPost: IPost) => Api.post("/posts", newPost);
export const likePost = (id: string) => Api.patch(`/posts/${id}/likePost`);
export const updatePost = (id: string, updatedPost: IPost) => Api.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id: string) => Api.delete(`/posts/${id}`);

// Users
export const signIn = (formData: SignUp) => Api.post("/auth/signin", formData);
export const signUp = (formData: SignUp) => Api.post("/auth/signup", formData);
