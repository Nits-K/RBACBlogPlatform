import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs, deleteBlog } from "../../redux/blogSlice";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, MoreVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

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
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
    <h1 className="text-3xl font-bold text-gray-800">My Blogs</h1>
    <Button
  onClick={() => navigate("/admin/create-blog")}
  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
>
  <Plus className="w-5 h-5" />
  Create New Blog
</Button>


  </div>

  {loading ? (
    <div className="text-center text-gray-500">Loading...</div>
  ) : myBlogs.length === 0 ? (
    <p className="text-center text-gray-500">
      You haven't created any blogs yet.
    </p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-purple-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created At</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {myBlogs.map((blog) => (
            <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-800">{blog.title}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{blog.description}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{blog.category}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-2 space-y-1 bg-white border border-gray-200 rounded-lg shadow-md">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-800 hover:text-purple-600"
                      onClick={() => navigate(`/admin/edit-blog/${blog._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

    </>
  );
};

export default AdminBlogs;
