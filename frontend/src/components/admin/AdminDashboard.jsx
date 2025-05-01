import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../shared/Navbar';
import { Card } from '../ui/card';
import { useNavigate } from 'react-router-dom';
import { fetchBlogs } from '../../redux/blogSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { blogs } = useSelector((state) => state.blogs);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    dispatch(fetchBlogs());
  }, [dispatch, user, navigate]);

  const adminBlogs = blogs.filter(blog => blog?.owner?._id === user?._id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Admin Info Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
          <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
            <img
              src={user?.profileImage || 'https://via.placeholder.com/100'}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user?.name || 'Admin'}</h2>
              <p className="text-gray-500 text-md">@{user?.username}</p>
              <p className="text-gray-600 text-md">{user?.email}</p>
              <span className="mt-2 inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Blogs</h3>
            <p className="text-4xl font-bold text-purple-600">{adminBlogs.length}</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
