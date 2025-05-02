import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById, updateBlog } from "../../redux/blogSlice";
import Navbar from "../shared/Navbar";
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
    // If currentBlog is not set or its id doesn't match, fetch it
    if (!currentBlog || currentBlog._id !== id) {
      dispatch(fetchBlogById(id))
        .unwrap()
        .then((data) => {
          setTitle(data.title || "");
          setDescription(data.description || "");
          setContent(data.content || "");
          setCategory(data.category || "");
        })
        .catch((err) => console.error("Failed to load blog:", err));
    } else {
      setTitle(currentBlog.title || "");
      setDescription(currentBlog.description || "");
      setContent(currentBlog.content || "");
      setCategory(currentBlog.category || "");
    }
  }, [dispatch, id, currentBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload;
    if (featureImage) {
      // Use FormData if there's a feature image being updated
      payload = new FormData();
      payload.append("title", title);
      payload.append("description", description);
      payload.append("content", content);
      payload.append("category", category);
      payload.append("featureImage", featureImage);
    } else {
      // Regular payload when no new feature image
      payload = {
        title,
        description,
        content,
        category,
      };
    }

    try {
      await dispatch(updateBlog({ id, blogData: payload })).unwrap();
      navigate("/admin/myBlogs");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update blog. Please try again.");
    }
  };

  return (
    <>
    <Navbar />
    <div className="max-w-4xl mx-auto p-6 mt-4 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Blog</h2>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error.message}</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="6"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Feature Image
          </label>
          {currentBlog?.featureImage && (
            <img
              src={currentBlog.featureImage}
              alt="Current Feature"
              className="w-32 h-20 object-cover rounded-lg mb-4"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFeatureImage(e.target.files[0])}
            className="w-full bg-gray-200 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
  type="submit"
  disabled={loading}
  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center gap-2"
>
  {loading && (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  )}
  {loading ? "Updating..." : "Update Blog"}
</button>

      </form>
    </div>
    </>
  );
};

export default AdminEditBlog;
