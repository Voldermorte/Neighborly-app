import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getServiceProviders, ServiceProvider } from '../utils/mockBackend';

const serviceCategories = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Handyman",
  "Gardening",
  "Painting",
];

const Home = () => {
  const { darkMode } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const [favoriteProviders, setFavoriteProviders] = useState<ServiceProvider[]>([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const allProviders = getServiceProviders();
      const userFavorites = JSON.parse(localStorage.getItem(`favorites_${user.id}`) || '[]');
      const favorites = allProviders.filter(provider => userFavorites.includes(provider.id));
      setFavoriteProviders(favorites);
    }
  }, [isAuthenticated, user]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Welcome to Neighborly</h1>
      <p className="mb-4">Find local services in your area</p>
      {isAuthenticated && user ? (
        <>
          <div className="mb-4 flex items-center">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-10 h-10 rounded-full mr-2 object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full mr-2 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 font-bold">{user.username.charAt(0).toUpperCase()}</span>
              </div>
            )}
            <span>Welcome, {user.username}!</span>
          </div>
          {user.community ? (
            <>
              <p className="mb-4">Your community: {user.community}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {serviceCategories.map((category) => (
                  <Link
                    key={category}
                    to={`/services/${category.toLowerCase()}`}
                    className={`p-4 rounded text-center ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                  >
                    {category}
                  </Link>
                ))}
              </div>
              {favoriteProviders.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">Your Favorite Providers</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favoriteProviders.map(provider => (
                      <Link
                        key={provider.id}
                        to={`/service/${provider.id}`}
                        className={`p-4 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-100'}`}
                      >
                        <h3 className="text-lg font-semibold">{provider.name}</h3>
                        <p>{provider.category}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="mb-4 text-yellow-500">Please update your profile with your community information to see available services.</p>
          )}
          <div className="flex justify-between">
            <Link to="/profile" className={`${darkMode ? 'text-blue-300' : 'text-blue-500'}`}>View Profile</Link>
            <Link to="/become-provider" className={`${darkMode ? 'text-green-300' : 'text-green-500'}`}>Become a Service Provider</Link>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="mb-4">Please log in to access our services.</p>
          <Link
            to="/login"
            className={`inline-block p-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            Log In / Sign Up
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;