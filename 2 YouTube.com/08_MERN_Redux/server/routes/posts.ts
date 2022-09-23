import express from "express";

import { createPost, deletePost, getPosts, likePost, updatePost } from "../controllers/posts";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware, createPost);
router.patch("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);
router.patch("/:id/likePost", authMiddleware, likePost);

export default router;
