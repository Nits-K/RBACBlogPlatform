import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById, updateBlog } from "../redux/blogSlice";

const AdminEditBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentBlog, loading, error } = useSelector((state) => state.blogs);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [featureImage, setFeatureImage] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentBlog) {
      setTitle(currentBlog.title || "");
      setDescription(currentBlog.description || "");
      setContent(currentBlog.content || "");
      setCategory(currentBlog.category || "");
    }
  }, [currentBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = new FormData();
    blogData.append("title", title);
    blogData.append("description", description);
    blogData.append("content", content);
    blogData.append("category", category);
    if (featureImage) {
      blogData.append("featureImage", featureImage);
    }

    await dispatch(updateBlog({ id, blogData }));
    navigate("/admin/blogs"); // redirect after update
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error.message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows="6"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Feature Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFeatureImage(e.target.files[0])}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default AdminEditBlog;
