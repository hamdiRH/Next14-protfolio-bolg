// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import blogsReducer from "./slices/blogsSlice";
import tagsReducer from "./slices/tagsSlice";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    tags: tagsReducer,
  },
});

export default store;
