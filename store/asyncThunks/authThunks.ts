import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://chief-mistakenly-husky.ngrok-free.app';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const registerUser = createAsyncThunk(
  'auth/userRegister',
  async (
    {
      name,
      email,
      password,
      confirmPassword,
    }: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/register`,
        {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
          role: 'student',
        },
        config
      );
      return response;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response && error.response.status,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        data:
          error.response && error.response.data.data
            ? error.response.data.data
            : null,
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/userLogin',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/login`,
        { email, password },
        config
      );

      return response;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response && error.response.status,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        data:
          error.response && error.response.data.data
            ? error.response.data.data
            : null,
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/userLogout',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { authToken } = (getState() as any).auth;

      if (!authToken) {
        return rejectWithValue({
          status: 401,
          message: 'Unauthorized, please login again',
          data: null,
        });
      }

      const response = await axios.post(
        `${API_URL}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response && error.response.status,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        data:
          error.response && error.response.data.data
            ? error.response.data.data
            : null,
      });
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue, getState }) => {
    const { authToken } = (getState() as any).auth;

    if (!authToken) {
      return rejectWithValue({
        status: 401,
        message: 'Unauthorized, please login again',
        data: null,
      });
    }

    try {
      const response = await axios.get(`${API_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response && error.response.status,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        data:
          error.response && error.response.data.data
            ? error.response.data.data
            : null,
      });
    }
  }
);
