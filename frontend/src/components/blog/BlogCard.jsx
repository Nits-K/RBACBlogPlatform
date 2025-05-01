import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">{blog.title}</h2>
      <p className="text-gray-600 mb-3 line-clamp-3">{blog.description}</p>
      <p className="text-sm text-gray-500 mb-4">Category: {blog.category}</p>
      <button
        onClick={() => navigate(`/blog/${blog._id}`)}
        className="mt-auto self-start px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
      >
        Read More
      </button>
    </div>
  );
};

export default BlogCard;
