import axios from 'axios';

// src/services/authService.js
export const login = async (username, password) => {
    try {
      const response = await axios.post('/api/login', { username, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
}

export const register = async (username, email, password) => {
    try {
      const response = await axios.post('/api/register', { username, email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
}

  