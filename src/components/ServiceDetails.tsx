import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getServiceProviderById, ServiceProvider, addReview, updateServiceStatus } from '../utils/mockBackend';

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceProvider | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if (id) {
      const serviceData = getServiceProviderById(id);
      setService(serviceData);
      setStatus(serviceData?.status || 'Pending');
    }
  }, [id]);

  useEffect(() => {
    if (service && user && service.community.toLowerCase() !== user.community.toLowerCase()) {
      alert("You don't have access to this service as it's not in your community.");
      navigate('/');
    }
  }, [service, user, navigate]);

  const handleSubmitReview = () => {
    if (id && user) {
      addReview(id, {
        userId: user.id,
        username: user.username,
        rating,
        text: reviewText,
        date: new Date().toISOString()
      });
      alert('Review submitted successfully!');
      setRating(0);
      setReviewText('');
      // Refresh service data to show new review
      const updatedService = getServiceProviderById(id);
      setService(updatedService);
    }
  };

  const handleStatusChange = (newStatus: string) => {
    if (id) {
      updateServiceStatus(id, newStatus);
      setStatus(newStatus);
      alert(`Service status updated to ${newStatus}`);
    }
  };

  if (!user) {
    return <p>Please log in to view service details.</p>;
  }

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-2">{service.name}</h1>
      <p className="mb-2">Category: {service.category}</p>
      <p className="mb-2">Community: {service.community}</p>
      <p className="mb-4">{service.description}</p>
      
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Service Status</h2>
        <div className="flex space-x-2">
          {['Pending', 'In Progress', 'Completed'].map((statusOption) => (
            <button
              key={statusOption}
              onClick={() => handleStatusChange(statusOption)}
              className={`px-4 py-2 rounded ${
                status === statusOption
                  ? 'bg-green-500 text-white'
                  : darkMode
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {statusOption}
            </button>
          ))}
        </div>
      </div>
      
      <Link to={`/book/${id}`} className={`${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white p-2 rounded`}>Book Service</Link>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
        <div className="mb-4">
          <label className="block mb-2">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          >
            <option value="0">Select rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Review:</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            rows={4}
          ></textarea>
        </div>
        <button
          onClick={handleSubmitReview}
          className={`${darkMode ? 'bg-green-600' : 'bg-green-500'} text-white p-2 rounded`}
          disabled={rating === 0 || reviewText.trim() === ''}
        >
          Submit Review
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
        {service.reviews && service.reviews.length > 0 ? (
          service.reviews.map((review, index) => (
            <div key={index} className={`mb-4 p-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <p className="font-bold">{review.username}</p>
              <p>Rating: {review.rating} / 5</p>
              <p>{review.text}</p>
              <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;