import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs, deleteBlog } from "../../redux/blogSlice";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, MoreVertical } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Blogs</h1>
          <Button
            onClick={() => navigate("/admin/create-blog")}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
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
          <div className="overflow-x-auto rounded-lg border shadow-lg">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-purple-50">
                  <TableHead className="p-4 text-left text-sm font-semibold text-gray-700">
                    Title
                  </TableHead>
                  <TableHead className="p-4 text-left text-sm font-semibold text-gray-700">
                    Description
                  </TableHead>
                  <TableHead className="p-4 text-left text-sm font-semibold text-gray-700">
                    Category
                  </TableHead>
                  <TableHead className="p-4 text-left text-sm font-semibold text-gray-700">
                    Created At
                  </TableHead>
                  <TableHead className="p-4 text-right text-sm font-semibold text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myBlogs.map((blog) => (
                  <TableRow
                    key={blog._id}
                    className="bg-white hover:bg-gray-50 border-b"
                  >
                    <TableCell className="p-4 text-sm text-gray-700">
                      {blog.title}
                    </TableCell>
                    <TableCell className="p-4 text-sm text-gray-600">
                      {blog.description}
                    </TableCell>
                    <TableCell className="p-4 text-sm text-gray-600">
                      {blog.category}
                    </TableCell>
                    <TableCell className="p-4 text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="p-4 text-right">
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
                        <PopoverContent className="w-40 p-2 space-y-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-800 hover:text-purple-600"
                            onClick={() =>
                              navigate(`/admin/edit-blog/${blog._id}`)
                            }
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminBlogs;
