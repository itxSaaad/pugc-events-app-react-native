import { createSlice } from '@reduxjs/toolkit';

import {
  cancelRSVP,
  fetchEventRSVPs,
  fetchUserRSVPs,
  rsvpToEvent,
} from '../asyncThunks/rsvpThunks';

type RSVP = {
  id: string;
  eventId: string;
  userId: string;
  createdAt: string;
};

type RSVPState = {
  userRsvps: RSVP[];
  eventRsvps: RSVP[];
  loading: boolean;
  message: string | null;
  error: string | null;
};

const initialState: RSVPState = {
  userRsvps: [],
  eventRsvps: [],
  loading: false,
  message: null,
  error: null,
};

const rsvpSlice = createSlice({
  name: 'rsvps',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRSVPs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserRSVPs.fulfilled, (state, action) => {
        state.userRsvps = action.payload.data.data.rsvps;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserRSVPs.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchEventRSVPs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventRSVPs.fulfilled, (state, action) => {
        state.eventRsvps = action.payload.data.data.rsvps;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchEventRSVPs.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(rsvpToEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(rsvpToEvent.fulfilled, (state, action) => {
        state.userRsvps.push(action.payload.data.data.rsvp);
        state.loading = false;
        state.error = null;
      })
      .addCase(rsvpToEvent.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(cancelRSVP.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelRSVP.fulfilled, (state, action) => {
        state.userRsvps = state.userRsvps.filter(
          (rsvp) => rsvp.id !== action.payload.data.data.rsvp.id
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(cancelRSVP.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearMessage } = rsvpSlice.actions;

export default rsvpSlice.reducer;
