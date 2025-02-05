import { createSlice } from '@reduxjs/toolkit';
import {
  fetchEvents,
  fetchEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../asyncThunks/eventThunks';

type Event = {
  id: string;
  title: string;
  description: string;
  department: string;
  date: string;
  time: string;
  location: string;
};

type EventState = {
  events: Event[];
  loading: boolean;
  message: string | null;
  error: string | null;
};

const initialState: EventState = {
  events: [],
  loading: false,
  message: null,
  error: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload.data.data.events;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.events = [action.payload.data.data.event];
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchEventById.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events = [...state.events, action.payload.data.data.event];
        state.loading = false;
        state.error = null;
      })
      .addCase(createEvent.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const updatedEvent = action.payload.data.data.event;
        state.events = state.events.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(updateEvent.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event.id !== action.payload.data.data.eventId
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteEvent.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearMessage } = eventSlice.actions;

export default eventSlice.reducer;
