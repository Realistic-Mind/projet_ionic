import axios from 'axios';

const API_BASE_URL = 'https://server-1-t93s.onrender.com/api/tp'; // Base URL for your API

// Function to handle user sign-up
export const signUp = async (firstName: string, lastName: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to handle user login
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
