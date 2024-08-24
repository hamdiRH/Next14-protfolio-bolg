import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  otpCode: null,
  otpError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateOtpCode: (state, action) => {
      state.otpCode = action.payload;
    },
    updateOtpError: (state, action) => {
      state.otpError = action.payload;
    },
  },
});

export const { updateOtpCode, updateOtpError } = authSlice.actions;

export default authSlice.reducer;
