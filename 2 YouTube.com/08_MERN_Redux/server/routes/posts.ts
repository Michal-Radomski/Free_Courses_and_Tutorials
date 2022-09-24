import express from "express";

import { createPost, deletePost, getPosts, getPostsBySearch, likePost, updatePost } from "../controllers/posts";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware, createPost);
router.patch("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);
router.patch("/:id/likePost", authMiddleware, likePost);
router.get("/search", getPostsBySearch);

export default router;
