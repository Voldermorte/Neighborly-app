import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getServiceProvidersByCategory, ServiceProvider, initializeMockData } from '../utils/mockBackend';

const ServiceList = () => {
  const { category } = useParams<{ category: string }>();
  const { darkMode } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const [services, setServices] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      if (category && user && user.community) {
        setLoading(true);
        setError(null);
        try {
          console.log('Fetching services for:', category, user.community);
          // Initialize mock data if no providers exist
          const initialProviders = getServiceProvidersByCategory(category, user.community);
          if (initialProviders.length === 0) {
            console.log('No providers found, initializing mock data');
            initializeMockData();
          }
          const providers = getServiceProvidersByCategory(category, user.community);
          console.log('Fetched providers:', providers);
          setServices(providers);
        } catch (err) {
          console.error('Error fetching service providers:', err);
          setError(`An error occurred while fetching services: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        if (!category) setError('No category specified');
        else if (!user || !user.community) setError('User community not set');
      }
    };

    fetchServices();
  }, [category, user]);

  useEffect(() => {
    if (user) {
      const userFavorites = JSON.parse(localStorage.getItem(`favorites_${user.id}`) || '[]');
      setFavorites(userFavorites);
    }
  }, [user]);

  const toggleFavorite = (serviceId: string) => {
    if (user) {
      const newFavorites = favorites.includes(serviceId)
        ? favorites.filter(id => id !== serviceId)
        : [...favorites, serviceId];
      
      setFavorites(newFavorites);
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-4">{category} Services {user?.community ? `in ${user.community}` : ''}</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : !user || !user.community ? (
        <p className="text-center mt-4">Please update your profile with your community information.</p>
      ) : services.length === 0 ? (
        <p className="text-center text-lg">No services found in your area.</p>
      ) : (
        services.map((service) => (
          <div key={service.id} className={`border p-4 mb-2 rounded ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
            <div className="flex justify-between items-center">
              <h2 className="text-xl">{service.name}</h2>
              <button
                onClick={() => toggleFavorite(service.id)}
                className={`p-2 rounded ${favorites.includes(service.id) ? 'text-yellow-500' : 'text-gray-500'}`}
              >
                {favorites.includes(service.id) ? '★' : '☆'}
              </button>
            </div>
            <p>{service.description}</p>
            <p>Community: {service.community}</p>
            <p>Status: {service.status}</p>
            <Link to={`/service/${service.id}`} className={`${darkMode ? 'text-blue-300' : 'text-blue-500'}`}>View Details</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default ServiceList;