import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updateSearchQuery, updatePage } from "../slices/blogsSlice";
import { FETCH_BLOGS } from "../constants";

// Async thunk for fetching blogs
export const fetchBlogs = createAsyncThunk(
  FETCH_BLOGS,
  async ({ limit, page, searchQuery, status }) => {
    const response = await axios.get(
      `/api/blogapi?limit=${limit}&page=${page}&searchQuery=${searchQuery}&status=${status}`
    );
    return response.data;
  }
);

export const setSearchQuery = (blogName) => (dispatch) => {
  dispatch(updateSearchQuery(blogName));
};

export const setPage = (page) => (dispatch) => {
  dispatch(updatePage(page));
};
