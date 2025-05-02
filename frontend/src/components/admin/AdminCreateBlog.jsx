import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createBlog } from "../../redux/blogSlice";

import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const AdminCreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.blogs);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    featureImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, featureImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("content", formData.content);
    data.append("category", formData.category);
    if (formData.featureImage) {
      data.append("featureImage", formData.featureImage);
    }
    
    try {
      await dispatch(createBlog(data)).unwrap();
      toast.success("Blog created successfully");
      navigate("/admin/myBlogs");
    } catch (error) {
      toast.error(error.message || "Failed to create blog");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Create New Blog</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <Label htmlFor="content" className="block text-lg font-medium text-gray-700 mb-2">Content</Label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 min-h-[200px]"
            />
          </div>

          <div>
            <Label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter category"
              required
            />
          </div>

          <div>
            <Label htmlFor="featureImage" className="block text-lg font-medium text-gray-700 mb-2">Feature Image</Label>
            <Input
              id="featureImage"
              name="featureImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-4 mx-auto w-32 h-32 rounded-md shadow-md object-cover"
              />
            )}
          </div>

          <Button
  type="submit"
  className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center gap-2"
  disabled={loading}
>
  {loading && (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  )}
  {loading ? "Submitting..." : "Create Blog"}
</Button>

        </form>
      </div>
    </>
  );
};

export default AdminCreateBlog;
