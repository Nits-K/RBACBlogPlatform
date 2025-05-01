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

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">Total Blogs</h3>
            <p className="text-3xl font-bold text-purple-600">{blogs.length}</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
