import { createSlice } from '@reduxjs/toolkit';

import {
  createEvent,
  deleteEvent,
  fetchEventById,
  fetchEvents,
  updateEvent,
} from '../asyncThunks/eventThunks';

export type Event = {
  id: string;
  title: string;
  description: string;
  department: string;
  date: string;
  time: string;
  location: string;
  rsvps: Array<any>;
};

type EventState = {
  events: Event[];
  eventDetails: Event | null;
  loading: boolean;
  error: { status?: number; message: string } | null;
};

const initialState: EventState = {
  events: [],
  eventDetails: null,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload.data.data.events;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.eventDetails = action.payload.data.data.event;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchEventById.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload.data.data.event);
        state.loading = false;
        state.error = null;
      })
      .addCase(createEvent.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.events = state.events.map((event) =>
          event.id === action.payload.data.data.event.id
            ? action.payload.data.data.event
            : event
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(updateEvent.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event.id !== action.payload.data.data.event.id
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteEvent.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
