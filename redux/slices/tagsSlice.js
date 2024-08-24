// redux/slices/tagsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tags: [],
  loadingTags: false,
  errorTags: null,
  tagsCount: 0,
};

// Async thunk for fetching tags
export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const response = await axios.get("/api/tagsapi");
  return response.data;
});

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loadingTags = true;
        state.errorTags = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loadingTags = false;
        state.tags = action.payload;
        state.tagsCount = action.payload.length || 0;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loadingTags = false;
        state.errorTags = action.error.message;
      });
  },
});

export default tagsSlice.reducer;
