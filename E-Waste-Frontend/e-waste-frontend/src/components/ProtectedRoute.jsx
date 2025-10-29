// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/localStorage';

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  
  if (!token) {
    // User is not authenticated (token is not in storage)
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the children (Profile page)
  return children;
};

export default ProtectedRoute;