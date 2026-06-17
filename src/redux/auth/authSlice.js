import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/utils/axios";

const initialState = {
  token: null,
  expiresAt: null,
  loginStatus: "idle",
  loginError: null,
  loginFieldErrors: null,
  registerStatus: "idle",
  registerMessage: null,
  registerError: null,
  registerFieldErrors: null,
};

function normalizeAuthError(error, fallbackMessage) {
  return {
    message:
      error?.message ||
      error?.error ||
      fallbackMessage ||
      "Authentication failed. Please try again.",
    error: error?.error || null,
    errors: error?.errors || null,
  };
}

function isTokenExpired(expiresAt) {
  if (!expiresAt) {
    return true;
  }

  return new Date(expiresAt).getTime() <= Date.now();
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      return await api.post("/auth/register", payload);
    } catch (error) {
      return rejectWithValue(
        normalizeAuthError(error, "Registration failed. Please try again."),
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      return await api.post("/auth", payload);
    } catch (error) {
      return rejectWithValue(
        normalizeAuthError(error, "Login failed. Please try again."),
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) {
      return null;
    }

    try {
      return await api.delete("/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return rejectWithValue(
        normalizeAuthError(error, "Logout failed. Your local session was cleared."),
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthSession(state) {
      state.token = null;
      state.expiresAt = null;
      state.loginStatus = "idle";
      state.loginError = null;
      state.loginFieldErrors = null;
    },
    clearRegisterState(state) {
      state.registerStatus = "idle";
      state.registerMessage = null;
      state.registerError = null;
      state.registerFieldErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
        state.loginError = null;
        state.loginFieldErrors = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.loginError = null;
        state.loginFieldErrors = null;
        state.token = action.payload?.data?.token || null;
        state.expiresAt = action.payload?.data?.expires_at || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError = action.payload?.message || action.error.message;
        state.loginFieldErrors = action.payload?.errors || null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loginStatus = "loading";
        state.loginError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.expiresAt = null;
        state.loginStatus = "idle";
        state.loginError = null;
        state.loginFieldErrors = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.token = null;
        state.expiresAt = null;
        state.loginStatus = "idle";
        state.loginError = action.payload?.message || action.error.message;
        state.loginFieldErrors = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = "loading";
        state.registerMessage = null;
        state.registerError = null;
        state.registerFieldErrors = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerStatus = "succeeded";
        state.registerMessage = action.payload?.message || null;
        state.registerError = null;
        state.registerFieldErrors = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.registerMessage = null;
        state.registerError = action.payload?.message || action.error.message;
        state.registerFieldErrors = action.payload?.errors || null;
      });
  },
});

export const { clearAuthSession, clearRegisterState } = authSlice.actions;

export const selectAuthToken = (state) => state.auth.token;
export const selectAuthExpiresAt = (state) => state.auth.expiresAt;
export const selectIsAuthenticated = (state) => {
  return Boolean(state.auth.token) && !isTokenExpired(state.auth.expiresAt);
};

export default authSlice.reducer;
