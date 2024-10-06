import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { createServiceProvider } from '../utils/mockBackend';

const categories = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Handyman",
  "Gardening",
  "Painting",
];

const ServiceProviderSignup = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [community, setCommunity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProvider = createServiceProvider({ name, description, category, community });
    console.log('New provider created:', newProvider);
    alert('Profile created successfully!');
    navigate('/');
  };

  return (
    <div className={`max-w-md mx-auto ${darkMode ? 'text-white' : 'text-black'}`}>
      <h2 className="text-2xl font-bold mb-4">Become a Service Provider</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
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
        <button
          type="submit"
          className={`w-full p-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default ServiceProviderSignup;