import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
// src/services/authService.js
export const login = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/api/users/login`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
}

export const register = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/api/users`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
}

export const passwordUpdate = async (data) => {
    try {
      const response = await axios.put(`${baseUrl}/api/users/password`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password update failed');
    }
}

  