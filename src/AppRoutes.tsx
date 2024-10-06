import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import ServiceList from './components/ServiceList';
import ServiceDetails from './components/ServiceDetails';
import BookService from './components/BookService';
import Profile from './components/Profile';
import ServiceProviderSignup from './components/ServiceProviderSignup';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} />
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
      <Route element={<PrivateRoute />}>
        <Route path="/services/:category" element={<ServiceList />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/book/:id" element={<BookService />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/become-provider" element={<ServiceProviderSignup />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;