import { updateOtpCode } from "../slices/authSlice";

export const setOtpCode = (otpCode) => (dispatch) => {
  dispatch(updateOtpCode(otpCode));
};
