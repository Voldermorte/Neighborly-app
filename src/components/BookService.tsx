import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const BookService = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const { darkMode } = useTheme();

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking service", { id, date, description });
    alert("Your service has been booked successfully!");
    navigate('/');
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Book Service</h1>
      <form onSubmit={handleBooking}>
        <div className="mb-4">
          <label className="block mb-2">Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description of work needed:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            rows={4}
            required
          ></textarea>
        </div>
        <button type="submit" className={`${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white p-2 rounded`}>
          Confirm Booking
        </button>
      </form>
    </>
  );
};

export default BookService;