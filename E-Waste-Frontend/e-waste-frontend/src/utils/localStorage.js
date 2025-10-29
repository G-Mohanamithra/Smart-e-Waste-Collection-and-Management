// src/utils/localStorage.js

const TOKEN_KEY = 'ewaste_access_token';
const ROLE_KEY = 'ewaste_user_role'; 
const EMAIL_KEY = 'ewaste_user_email'; 
 // Ensure this key is defined

// The setToken function MUST accept 'email'
export const setToken = ({ accessToken, role, email }) => { 
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(ROLE_KEY, role); 
  localStorage.setItem(EMAIL_KEY, email); // <<< Saves the email
};

export const getEmail = () => { // Function to retrieve email
  return localStorage.getItem(EMAIL_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getRole = () => {
  return localStorage.getItem(ROLE_KEY);
};


export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY); 
  localStorage.removeItem(EMAIL_KEY);
};