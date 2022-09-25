import express from "express";

import {
  commentPost,
  createPost,
  deletePost,
  getPost,
  getPosts,
  getPostsBySearch,
  likePost,
  updatePost,
} from "../controllers/posts";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware, createPost);
router.patch("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);
router.patch("/:id/likePost", authMiddleware, likePost);
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);
router.post("/:id/commentPost", authMiddleware, commentPost);

export default router;
