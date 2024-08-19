// redux/slices/blogsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  blogs: [],
  loadingBlogs: false,
  errorBlogs: null,
};

// Async thunk for fetching blogs
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await axios.get("/api/blogapi");
  return response.data;
});

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loadingBlogs = true;
        state.errorBlogs = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loadingBlogs = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loadingBlogs = false;
        state.errorBlogs = action.error.message;
      });
  },
});

export default blogsSlice.reducer;
