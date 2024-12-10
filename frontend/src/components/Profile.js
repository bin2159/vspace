import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>

        {user.profileImage && (
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        )}

        <div className="mb-4">
          <p className="text-gray-700"><strong>Username:</strong> {user.username}</p>
          <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

