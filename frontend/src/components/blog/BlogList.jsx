import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../../redux/blogSlice";
import Blog from "./BlogCard.jsx";
import { Loader2 } from "lucide-react";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, user]);

  if (loading) {
    return (
      <div className="col-span-full flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full text-center text-red-500 p-4">
        {error.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.length > 0 ? (
          blogs.map((blog) => (
            <Blog 
              key={blog._id} 
              blog={blog}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-8">
            No blogs found. {user && "Be the first to create one!"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
