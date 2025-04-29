import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (user?.role !== 'admin') {
    navigate('/');
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Add user rows here */}
            </TableBody>
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminUsers;