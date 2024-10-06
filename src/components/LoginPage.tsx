import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { loginUser, registerUser } from '../utils/authService';

const LoginPage = () => {
  const { darkMode } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [parish, setParish] = useState('');
  const [community, setCommunity] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let user;
      if (isLogin) {
        user = await loginUser(email, password);
      } else {
        user = await registerUser(email, password, username, parish, community, profilePicture);
      }
      login(user);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Login/Register error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const parishes = [
    'Kingston', 'St. Andrew', 'St. Catherine', 'Clarendon', 'Manchester',
    'St. Elizabeth', 'Westmoreland', 'Hanover', 'St. James', 'Trelawny',
    'St. Ann', 'St. Mary', 'Portland', 'St. Thomas'
  ];

  return (
    <div className={`max-w-md mx-auto ${darkMode ? 'text-white' : 'text-black'}`}>
      <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
          />
        </div>
        {!isLogin && (
          <>
            <div>
              <label htmlFor="username" className="block mb-1">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
              />
            </div>
            <div>
              <label htmlFor="parish" className="block mb-1">Parish:</label>
              <select
                id="parish"
                value={parish}
                onChange={(e) => setParish(e.target.value)}
                required
                className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
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
                required
                placeholder="Enter your exact community"
                className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
              />
            </div>
            <div>
              <label htmlFor="profilePicture" className="block mb-1">Profile Picture:</label>
              <input
                type="file"
                id="profilePicture"
                onChange={(e) => setProfilePicture(e.target.files ? e.target.files[0] : null)}
                accept="image/*"
                className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
              />
            </div>
          </>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full p-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className={`font-bold ${darkMode ? 'text-blue-300' : 'text-blue-500'}`}
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default LoginPage;