import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updateSearchQuery } from "../slices/blogsSlice";
import { FETCH_BLOGS } from "../constants";

// Async thunk for fetching blogs
export const fetchBlogs = createAsyncThunk(
  FETCH_BLOGS,
  async (limit, page, searchQuery) => {
    const response = await axios.get(
      `/api/blogapi?limit=${limit}&page=${page}&searchQuery=${searchQuery}`
    );
    return response.data;
  }
);

export const setSearchQuery = (blogName) => (dispatch) => {
  dispatch(updateSearchQuery(blogName));
};
