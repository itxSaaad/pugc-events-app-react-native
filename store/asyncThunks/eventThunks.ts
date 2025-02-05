import { createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all events
const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://your-api.com/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Update an event
const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async (
    { id, updatedData }: { id: string; updatedData: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`https://your-api.com/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Failed to update event');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export { fetchEvents, updateEvent };
