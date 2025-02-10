import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL
  ? process.env.EXPO_PUBLIC_API_URL
  : 'http://localhost:8000';

export const fetchUserRSVPs = createAsyncThunk(
  'rsvp/fetchUserRSVPs',
  async (_, { rejectWithValue, getState }) => {
    const { authToken } = (getState() as any).auth;

    if (!authToken) {
      return rejectWithValue({
        status: 400,
        message: 'User is not logged in',
      });
    }

    try {
      const response = await axios.get(`${API_URL}/api/events/user/rsvp`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      return response;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response && error.response.status,
        message:
          error.response && error.response.message
            ? error.response.message
            : error.message,
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
        status: 400,
        message: 'User is not logged in',
      });
    }

    try {
      const response = await axios.get(
        `${API_URL}/api/events/${eventId}/rsvp`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      return response;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response && error.response.status,
        message:
          error.response && error.response.message
            ? error.response.message
            : error.message,
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
        status: 400,
        message: 'User is not logged in',
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

      return response;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response && error.response.status,
        message:
          error.response && error.response.message
            ? error.response.message
            : error.message,
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
        status: 400,
        message: 'User is not logged in',
      });
    }

    try {
      const response = await axios.delete(
        `${API_URL}/api/events/${eventId}/rsvp`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      return response;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response && error.response.status,
        message:
          error.response && error.response.message
            ? error.response.message
            : error.message,
      });
    }
  }
);
