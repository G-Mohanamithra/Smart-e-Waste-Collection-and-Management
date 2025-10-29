import React, { useState } from 'react';
import { login } from '../api/authService';
import { setToken } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '',
    role: 'User'
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const ADMIN_EMAIL = 'admin@ewaste.com';
  
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let loginData;
    
    if (credentials.role === 'Admin') {
      loginData = {
        email: ADMIN_EMAIL, 
        password: credentials.password 
      };
    } else {
      loginData = {
        email: credentials.email,
        password: credentials.password
      };
    }

    try {
      const response = await login(loginData);
      
      // 🟢 FIX 1: Extract email from response (which is the email used in the request)
      const email = loginData.email; 
      // Note: If the backend returns the email in the DTO, use: const { accessToken, role, email } = response.data;
      
      // 🟢 FIX 2: Pass all three critical pieces of data to setToken
      const { accessToken, role } = response.data; 
      setToken({ accessToken, role, email: loginData.email }); // Pass email here
      
      setMessage('✅ Login Successful! Redirecting...');
      navigate('/profile'); 
      
    } catch (error) {
      setMessage('❌ Login Failed: Invalid credentials or network error.');
      console.error(error);
    }
  };

  const displayEmail = credentials.role === 'Admin' ? ADMIN_EMAIL : credentials.email;

  return (
    // ... (rest of the component remains the same)
    <div className="form-container">
      <h2 className="text-center app-title">E-Waste Login</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Role Selector Dropdown */}
        <div className="mb-3">
          <label className="form-label">Login As:</label>
          <select 
            name="role" 
            onChange={handleChange} 
            value={credentials.role}
            className="form-control"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        
        {/* Email Field */}
        <input 
          type="email" 
          name="email" 
          placeholder={credentials.role === 'Admin' ? ADMIN_EMAIL : 'Email'}
          value={displayEmail} 
          onChange={handleChange} 
          className="form-control mb-2" 
          required 
          disabled={credentials.role === 'Admin'} 
        />
        
        {/* Password Field */}
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          className="form-control mb-2" 
          required 
        />

        {credentials.role === 'Admin' && (
            <p className="alert alert-warning mt-2">
                This login is only for admin
            </p>
        )}
        
        <button type="submit" className="btn btn-success w-100 mt-3">Log In</button>
      </form>
      
      {message && <p className={`mt-3 text-center ${message.startsWith('✅') ? 'text-success' : 'text-danger'}`}>{message}</p>}
      <p className="mt-3 text-center">Don't have a user account? <a href="/register">Register here</a></p>
    </div>
  );
};

export default Login;