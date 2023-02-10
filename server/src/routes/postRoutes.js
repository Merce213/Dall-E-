import express from "express";
import { createPost, getPosts } from "../controller/post.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/", createPost);

export default router;
