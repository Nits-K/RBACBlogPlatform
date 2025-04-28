import { BlogPost } from "../models/blogpost.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createBlogPost = asyncHandler(async (req, res) => {
  const { title, content, description, category } = req.body;
  const userId = req.user._id;

  if (
    [title, content, description, category].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  let featureImageUrl = null;

  if (req.files?.featureImage) {
    try {
      const imagePath = req.files.featureImage[0].path;
      const uploadedImage = await uploadOnCloudinary(imagePath);
      featureImageUrl = uploadedImage?.url;
    } catch (error) {
      throw new ApiError(500, "Error uploading image to cloud");
    }
  }

  const newblogPost = await BlogPost.create({
    title,
    content,
    owner: userId,
    description,
    category,
    featureImage: featureImageUrl,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newblogPost, "Blog created successfully"));
});

export const getAllBlogPosts = asyncHandler(async (req, res) => {
    const category = req.query.category || "";
  
    const query = category ? { category } : {};
  
    const blogPosts = await BlogPost.find(query)
      .populate("owner", "name username")
      .sort({ createdAt: -1 });
  
    if (!blogPosts || blogPosts.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, "No blog posts found"));
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, blogPosts, "Blog posts fetched successfully"));
  });
  

export const getBlogPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await BlogPost.findById(id).populate("owner", "name username");

  if (!post) {
    throw new ApiError(404, "Blog post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Blog post fetched successfully"));
});

export const updateBlogPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, description, category } = req.body;
  const userId = req.user._id;

  const post = await BlogPost.findById(id);

  if (!post) {
    throw new ApiError(404, "Blog post not found");
  }

  if (post.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to update this post");
  }

  post.title = title || post.title;
  post.content = content || post.content;
  post.description = description || post.description;
  post.category = category || post.category;

  if (req.files?.featureImage) {
    const imagePath = req.files.featureImage[0].path;
    const uploadedImage = await uploadOnCloudinary(imagePath);
    post.featureImage = uploadedImage?.url;
  }

  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Blog post updated successfully"));
});

export const deleteBlogPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const post = await BlogPost.findById(id);

  if (!post) {
    throw new ApiError(404, "Blog post not found");
  }

  if (post.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this post");
  }

  await post.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Blog post deleted successfully"));
});
