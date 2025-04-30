import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Avatar, AvatarImage } from '../ui/avatar';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex flex-col items-center">
            <Avatar className="w-32 h-32 border-4 border-purple-500">
              <AvatarImage
                src={user?.profileImage}
                alt={user?.name}
              />
            </Avatar>
            <h1 className="mt-4 text-3xl font-bold">{user?.name}</h1>
            <p className="text-gray-600">{user?.username}</p>
            <p className="mt-2 text-gray-500">{user?.email}</p>
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800">
              {user?.role}
            </div>
          </div>
          
          <div className="mt-8 border-t pt-8">
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Member Since</p>
                <p className="font-medium">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Last Updated</p>
                <p className="font-medium">
                  {new Date(user?.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;