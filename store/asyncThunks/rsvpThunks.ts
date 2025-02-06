import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://chief-mistakenly-husky.ngrok-free.app';

export const fetchUserRSVPs = createAsyncThunk(
  'rsvp/fetchUserRSVPs',
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
      const response = await axios.get(
        `${API_URL}/api/events/${eventId}/user/rsvp`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
        data: error.response?.data?.data || null,
      });
    }
  }
);

export const fetchEventRSVPs = createAsyncThunk(
  'rsvp/fetchEventRSVPs',
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
      const response = await axios.get(
        `${API_URL}/api/events/${eventId}/rsvp`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
        data: error.response?.data?.data || null,
      });
    }
  }
);

export const rsvpToEvent = createAsyncThunk(
  'rsvp/rsvpToEvent',
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
      const response = await axios.post(
        `${API_URL}/api/events/${eventId}/rsvp`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
        data: error.response?.data?.data || null,
      });
    }
  }
);

export const cancelRSVP = createAsyncThunk(
  'rsvp/cancelRSVP',
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
      const response = await axios.delete(
        `${API_URL}/api/events/${eventId}/rsvp`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
        data: error.response?.data?.data || null,
      });
    }
  }
);
