import express from "express";
import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} from "../controllers/blogPost.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { multipleUpload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/create", isAuthenticated, multipleUpload, createBlogPost);

router.get("/getBlogs", getAllBlogPosts);
router.get("/:id", getBlogPostById);

router.put("/update/:id", isAuthenticated, multipleUpload, updateBlogPost);

router.delete("/delete/:id", isAuthenticated, deleteBlogPost);

export default router;
