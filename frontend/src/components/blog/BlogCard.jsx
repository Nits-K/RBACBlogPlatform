import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      {blog.featureImage && (
        <img
          src={blog.featureImage}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
      <p className="text-gray-600 mb-2">{blog.description}</p>
      <p className="text-sm text-gray-400">Category: {blog.category}</p>
      <button
        onClick={() => navigate(`/blogs/${blog._id}`)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Read More
      </button>
    </div>
  );
};

export default BlogCard;
