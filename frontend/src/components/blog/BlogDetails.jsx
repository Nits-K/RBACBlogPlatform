import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { fetchBlogById } from "../../redux/blogSlice";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { blogs, currentBlog, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    const foundBlog = blogs.find((b) => b._id === id);

    if (foundBlog) {
      // Use it if already in blogs array
      dispatch({ type: 'blogs/setCurrentBlog', payload: foundBlog });
    } else {
      // Otherwise fetch from API
      dispatch(fetchBlogById(id));
    }
  }, [dispatch, blogs, id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading blog...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !currentBlog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">Blog not found or failed to load.</p>
        </div>
        <Footer />
      </>
    );
  }

  const blog = currentBlog;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        {/* Blog Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">{blog.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 mt-4">
            <div className="flex items-center gap-2">
              <img
                src={blog.owner?.profileImage || '/default-avatar.png'}
                alt={blog.owner?.name}
                className="w-8 h-8 rounded-full"
              />
              <span>{blog.owner?.name}</span>
            </div>
            <span>•</span>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {blog.category}
            </span>
          </div>
        </div>

        {/* Feature Image */}
        {blog.featureImage && (
          <div className="mb-8">
            <img
              src={blog.featureImage}
              alt={blog.title}
              className="w-120 h-120 object-contain sm:object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">{blog.description}</p>
          <div className="whitespace-pre-wrap text-gray-800">{blog.content}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;
