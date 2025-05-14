import axios from 'axios';

// src/services/backService.js

const baseUrl = process.env.REACT_APP_API_URL;
export const getCampuses = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/campuses`);
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Getting Campuses failed');
    }
}

  