import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { darkMode } = useTheme();
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [community, setCommunity] = useState(user?.community || '');
  const [parish, setParish] = useState(user?.parish || '');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(user?.profilePicture || '');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setCommunity(user.community);
      setParish(user.parish);
      setPreviewUrl(user.profilePicture);
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { 
      ...user, 
      username, 
      email, 
      community, 
      parish,
      profilePicture: profilePicture ? URL.createObjectURL(profilePicture) : user.profilePicture
    };
    login(updatedUser); // Update the user in the context
    localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // Update local storage
    alert('Profile updated successfully!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const parishes = [
    'Kingston', 'St. Andrew', 'St. Catherine', 'Clarendon', 'Manchester',
    'St. Elizabeth', 'Westmoreland', 'Hanover', 'St. James', 'Trelawny',
    'St. Ann', 'St. Mary', 'Portland', 'St. Thomas'
  ];

  return (
    <div className={`p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <div className="mb-4 flex flex-col items-center">
          {previewUrl ? (
            <img src={previewUrl} alt="Profile" className="profile-picture mb-4" />
          ) : (
            <div className="w-32 h-32 rounded-full mb-4 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 font-bold text-4xl">{username.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          />
        </div>
        <div>
          <label htmlFor="username" className="block mb-1">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          />
        </div>
        <div>
          <label htmlFor="parish" className="block mb-1">Parish:</label>
          <select
            id="parish"
            value={parish}
            onChange={(e) => setParish(e.target.value)}
            className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          >
            <option value="">Select a parish</option>
            {parishes.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
            <option value="outside">Outside Jamaica</option>
          </select>
        </div>
        <div>
          <label htmlFor="community" className="block mb-1">Community:</label>
          <input
            type="text"
            id="community"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            placeholder="Enter your exact community"
            className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          />
        </div>
        <button
          type="submit"
          className={`p-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          Update Profile
        </button>
      </form>
      <div className="mt-4 space-y-2">
        <Link to="/" className={`block ${darkMode ? 'text-blue-300' : 'text-blue-500'}`}>Back to Home</Link>
        <button
          onClick={handleLogout}
          className={`p-2 rounded ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;