import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Avatar, AvatarImage } from '../ui/avatar';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-32 h-32 border-4 border-purple-500 shadow-md">
              <AvatarImage
                src={user?.profileImage || 'https://via.placeholder.com/150'}
                alt={user?.name}
                className="rounded-full object-cover"
              />
            </Avatar>

            <h1 className="mt-5 text-3xl font-extrabold text-gray-800">{user?.name}</h1>
            <p className="text-gray-500 text-lg">@{user?.username}</p>
            <p className="mt-2 text-gray-600">{user?.email}</p>

            <span className="mt-4 inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 font-medium text-sm uppercase tracking-wide">
              {user?.role}
            </span>
          </div>

          <div className="mt-10 border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Account Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
              <div>
                <p className="text-sm text-gray-500 mb-1">Member Since</p>
                <p className="font-medium">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Last Updated</p>
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
