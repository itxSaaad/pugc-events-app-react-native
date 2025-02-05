import { createSlice } from '@reduxjs/toolkit';
import { fetchEvents, updateEvent } from '../asyncThunks/eventThunks';

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
  error: string | null;
};

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(
          (event) => event.id === action.payload.id
        );
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      });
  },
});

export const { addEvent, removeEvent } = eventSlice.actions;
export default eventSlice.reducer;
