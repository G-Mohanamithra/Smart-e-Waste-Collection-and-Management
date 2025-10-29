// src/api/authService.js

import axios from 'axios';
import { getToken , getEmail} from '../utils/localStorage';

// Base URL for your Spring Boot Application
const BASE_URL = 'http://localhost:8080';
const REQUESTS_URL = `${BASE_URL}/api/requests`; // Requests base URL

// ------------------ Axios Instance for PROTECTED Calls ------------------

const protectedAxios = axios.create();
protectedAxios.interceptors.request.use(config => {
  const token = getToken();
  const email = getEmail(); 

  // Add Authorization header
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  // CRITICAL FIX: Add custom header for dynamic user lookup in backend
  if (email) { 
    config.headers['X-User-Email'] = email; 
  }
  return config;
}, error => {
  return Promise.reject(error);
});
// ...

// ------------------ PUBLIC AUTHENTICATION ENDPOINTS ------------------

export const register = (userData) => {
  return axios.post(`${BASE_URL}/api/auth/register`, userData);
};

export const login = (credentials) => {
  return axios.post(`${BASE_URL}/api/auth/login`, credentials);
};


// ------------------ PROTECTED USER ENDPOINTS ------------------

export const fetchProfile = () => {
  return protectedAxios.get(`${BASE_URL}/api/users/profile`);
};

export const updateProfile = (profileData) => {
  return protectedAxios.put(`${BASE_URL}/api/users/profile`, profileData);
};

// 🟢 CRITICAL FIX: FUNCTION TO FETCH ALL REQUESTS
export const fetchUserRequests = () => {
    // Calls the backend endpoint to get the request history.
    // This relies on the backend using a hardcoded user (admin@ewaste.com) for now.
    return protectedAxios.get(`${REQUESTS_URL}/my-requests`); 
};