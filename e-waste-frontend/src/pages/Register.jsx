// src/pages/Register.jsx

import React, { useState } from 'react';
import { register } from '../api/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      setMessage('✅ Registration Successful! Please log in.');
      navigate('/login');
    } catch (error) {
      // The server returns a 500 RuntimeException if email exists
      const errorMessage = error.response?.data?.message || 'Server error or email already exists.';
      setMessage(`❌ Registration Failed: ${errorMessage}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="form-control mb-2" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="form-control mb-2" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="form-control mb-2" required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} className="form-control mb-2" required />
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      {message && <p className={`mt-3 ${message.startsWith('✅') ? 'text-success' : 'text-danger'}`}>{message}</p>}
      <p className="mt-3">Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Register;