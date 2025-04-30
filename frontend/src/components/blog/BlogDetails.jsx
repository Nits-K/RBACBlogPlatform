import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const BlogDetails = () => {
  const { id } = useParams();
  const { blogs } = useSelector((state) => state.blogs);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const foundBlog = blogs.find(b => b._id === id);
    setBlog(foundBlog);
  }, [blogs, id]);

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-700">Blog not found</p>
        </div>
        <Footer />
      </>
    );
  }

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
                src={blog.owner.profileImage || '/default-avatar.png'}
                alt={blog.owner.name}
                className="w-8 h-8 rounded-full"
              />
              <span>{blog.owner.name}</span>
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
              className="w-full h-96 object-cover rounded-lg shadow-lg"
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
