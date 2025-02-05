import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL
const API_URL = 'https://your-api.com/api';

// Register
export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/logout`);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

// Fetch Profile
export const fetchProfile = createAsyncThunk(
  'auth/profile',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;

      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch profile'
      );
    }
  }
);
