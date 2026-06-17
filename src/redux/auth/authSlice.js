import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/utils/axios";

const initialState = {
  registerStatus: "idle",
  registerMessage: null,
  registerError: null,
  registerFieldErrors: null,
};

function normalizeAuthError(error) {
  return {
    message:
      error?.message ||
      error?.error ||
      "Registration failed. Please try again.",
    error: error?.error || null,
    errors: error?.errors || null,
  };
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      return await api.post("/auth/register", payload);
    } catch (error) {
      return rejectWithValue(normalizeAuthError(error));
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearRegisterState(state) {
      state.registerStatus = "idle";
      state.registerMessage = null;
      state.registerError = null;
      state.registerFieldErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder
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

export const { clearRegisterState } = authSlice.actions;

export default authSlice.reducer;
