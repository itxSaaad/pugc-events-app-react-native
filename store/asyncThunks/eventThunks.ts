import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://chief-mistakenly-husky.ngrok-free.app';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
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
      const response = await axios.get(`${API_URL}/api/events`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
        data: error.response?.data?.data || null,
      });
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchById',
  async (eventId: string, { rejectWithValue, getState }) => {
    const { authToken } = (getState() as any).auth;

    if (!authToken) {
      return rejectWithValue({
        status: 401,
        message: 'Unauthorized, please login again',
        data: null,
      });
    }

    try {
      const response = await axios.get(`${API_URL}/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
        data: error.response?.data?.data || null,
      });
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/create',
  async (eventData: any, { rejectWithValue, getState }) => {
    const { authToken } = (getState() as any).auth;

    if (!authToken) {
      return rejectWithValue({
        status: 401,
        message: 'Unauthorized, please login again',
        data: null,
      });
    }

    try {
      const response = await axios.post(`${API_URL}/api/events`, eventData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
        data: error.response?.data?.data || null,
      });
    }
  }
);

export const updateEvent = createAsyncThunk(
  'events/update',
  async (
    { eventId, eventData }: { eventId: string; eventData: any },
    { rejectWithValue, getState }
  ) => {
    const { authToken } = (getState() as any).auth;

    if (!authToken) {
      return rejectWithValue({
        status: 401,
        message: 'Unauthorized, please login again',
        data: null,
      });
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/events/${eventId}`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
        data: error.response?.data?.data || null,
      });
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/delete',
  async (eventId: string, { rejectWithValue, getState }) => {
    const { authToken } = (getState() as any).auth;

    if (!authToken) {
      return rejectWithValue({
        status: 401,
        message: 'Unauthorized, please login again',
        data: null,
      });
    }

    try {
      const response = await axios.delete(`${API_URL}/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
        data: error.response?.data?.data || null,
      });
    }
  }
);
