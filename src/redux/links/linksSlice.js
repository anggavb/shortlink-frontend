import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/utils/axios";

const initialState = {
  items: [],
  meta: {
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 0,
  },
  fetchStatus: "idle",
  fetchError: null,
  deleteStatus: "idle",
  deleteError: null,
};

function normalizeLinksError(error, fallbackMessage) {
  return {
    message:
      error?.message ||
      error?.error ||
      fallbackMessage ||
      "Unable to load links. Please try again.",
    error: error?.error || null,
    errors: error?.errors || null,
  };
}

export const fetchLinks = createAsyncThunk(
  "links/fetchLinks",
  async ({ page = 1, limit = 10, search = "" } = {}, { rejectWithValue }) => {
    try {
      return await api.get("/links", {
        params: {
          page,
          limit,
          search: search.trim() || undefined,
        },
      });
    } catch (error) {
      return rejectWithValue(
        normalizeLinksError(error, "Unable to load links. Please try again."),
      );
    }
  },
);

export const deleteLink = createAsyncThunk(
  "links/deleteLink",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/links/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        normalizeLinksError(error, "Unable to delete link. Please try again."),
      );
    }
  },
);

const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    clearLinksError(state) {
      state.fetchError = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLinks.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = null;
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.fetchError = null;
        state.items = action.payload?.results?.data || [];
        state.meta = {
          page: action.payload?.results?.meta?.page || 1,
          limit: action.payload?.results?.meta?.limit || 10,
          total: action.payload?.results?.meta?.total || 0,
          total_pages: action.payload?.results?.meta?.total_pages || 0,
        };
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.payload?.message || action.error.message;
      })
      .addCase(deleteLink.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteLink.fulfilled, (state) => {
        state.deleteStatus = "succeeded";
        state.deleteError = null;
      })
      .addCase(deleteLink.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload?.message || action.error.message;
      });
  },
});

export const { clearLinksError } = linksSlice.actions;

export const selectLinks = (state) => state.links.items;
export const selectLinksMeta = (state) => state.links.meta;
export const selectLinksFetchStatus = (state) => state.links.fetchStatus;
export const selectLinksFetchError = (state) => state.links.fetchError;
export const selectLinksDeleteStatus = (state) => state.links.deleteStatus;
export const selectLinksDeleteError = (state) => state.links.deleteError;

export default linksSlice.reducer;
