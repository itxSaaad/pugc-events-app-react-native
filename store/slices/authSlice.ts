import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

import {
  fetchProfile,
  loginUser,
  logoutUser,
  registerUser,
} from '../asyncThunks/authThunks';

type AuthState = {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  } | null;
  authToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  message: string | null;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  authToken: null,
  isAuthenticated: false,
  loading: false,
  message: null,
  error: null,
};

(async () => {
  const user = await AsyncStorage.getItem('user');
  const authToken = await AsyncStorage.getItem('authToken');
  initialState.user = user ? JSON.parse(user) : null;
  initialState.authToken = authToken;
})();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.data.data.user;
        state.authToken = action.payload.data.data.token;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
        AsyncStorage.setItem('authToken', action.payload.data.data.token);
        AsyncStorage.setItem(
          'user',
          JSON.stringify(action.payload.data.data.user)
        );
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: any) => {
        state.user = action.payload.data.data.user;
        state.authToken = action.payload.data.data.token;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
        AsyncStorage.setItem('authToken', action.payload.data.data.token);
        AsyncStorage.setItem(
          'user',
          JSON.stringify(action.payload.data.data.user)
        );
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        console.log('Auth from slice', state.authToken);
        state.user = null;
        state.authToken = null;
        state.isAuthenticated = false;
        state.loading = false;
        AsyncStorage.removeItem('authToken');
        AsyncStorage.removeItem('user');
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearMessage } = authSlice.actions;

export default authSlice.reducer;
