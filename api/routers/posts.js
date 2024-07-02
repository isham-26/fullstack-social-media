import express from "express"
import { createPost, deletePost, getAllPost, getPost, likePost, updatePost,getAllUserPost } from "../controllers/post.js";
const router=express.Router();

 router.post("/",createPost)
 router.put("/:id",updatePost)
 router.put("/:id/likes",likePost)
 router.delete("/:id",deletePost)
 router.get("/profile/:username",getAllUserPost)
 router.get("/:id",getPost)
 router.get("/allpost/:userId",getAllPost)

export default router