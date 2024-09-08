// redux/slices/blogsSlice.js
import { createSlice } from "@reduxjs/toolkit";

import {
  FETCH_BLOGS_FULFILLED,
  FETCH_BLOGS_PENDING,
  FETCH_BLOGS_REJECTED,
} from "../constants";

const initialState = {
  blogs: [],
  loadingBlogs: false,
  errorBlogs: null,
  searchQuery: "",
  publicBlogsCount: 0,
  draftBlogsCount: 0,
  totalResults: 0,
  limit: 10,
  page: 1,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FETCH_BLOGS_PENDING, (state) => {
        state.loadingBlogs = true;
        state.errorBlogs = null;
      })
      .addCase(FETCH_BLOGS_FULFILLED, (state, action) => {
        state.loadingBlogs = false;
        state.blogs = action.payload.blogs;

        if (action.payload.currentPage)
          state.publicBlogsCount = action.payload.blogs.filter(
            (blog) => blog.status === "publish"
          ).length;
        state.draftBlogsCount = action.payload.blogs.filter(
          (blog) => blog.status === "draft"
        ).length;
        state.totalResults = action.payload.totalResults;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(FETCH_BLOGS_REJECTED, (state, action) => {
        state.loadingBlogs = false;
        state.errorBlogs = action.error.message;
      });
  },
});

export const { updateSearchQuery, updatePage } = blogsSlice.actions;

export default blogsSlice.reducer;
