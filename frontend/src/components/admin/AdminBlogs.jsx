import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs, deleteBlog } from "../../redux/blogSlice";
import BlogCard from "../blog/BlogCard";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const AdminBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, loading } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const myBlogs = user
    ? blogs?.filter((blog) => blog?.owner?._id === user?._id)
    : [];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Blogs</h1>
          <Button
            onClick={() => navigate("/admin/create-blog")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Blog
          </Button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBlogs.length > 0 ? (
              myBlogs.map((blog) => (
                <div key={blog._id} className="relative">
                  <BlogCard blog={blog} />
                  <div className="absolute top-2 right-2 space-x-2 flex">
                    <button
                      onClick={() => navigate(`/admin/edit-blog/${blog._id}`)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                You haven't created any blogs yet.
              </p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminBlogs;
