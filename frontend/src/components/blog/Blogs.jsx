import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../redux/blogSlice';
import BlogCard from './BlogCard';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              
              <BlogCard key={blog._id} blog={blog} />

            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
