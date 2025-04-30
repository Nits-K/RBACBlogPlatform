import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';
import { Card } from '../ui/card';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { blogs } = useSelector((state) => state.blogs);
  const navigate = useNavigate();

  if (user?.role !== 'admin') {
    navigate('/');
    return null;
  }

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
          {/* Add more stats cards as needed */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;