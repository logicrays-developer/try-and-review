import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUserProps } from "../typings/SliceData";
import axiosInstance from "../Config/Axios/axiosInstance";

const initialState: TUserProps = {
  isExistingUser: false,
  status: "loading",
  userData: {},
  accessToken: "",
  refreshToken: "",
};

// export const updateAccessToken = createAsyncThunk(
//   "updateToken",
//   async (tokens: any) => {
//     const response = await axiosInstance.post("/token/refresh/", {
//       refresh: tokens,
//     });
//     return response?.data?.access;
//   }
// );

const authSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setExistingUser(state, action) {
      state.isExistingUser = action.payload;
    },
    setUserData(state, action) {
      state.userData = action?.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
  },
});

export const {
  setExistingUser,
  setStatus,
  setUserData,
  setAccessToken,
  setRefreshToken,
} = authSlice.actions;

export default authSlice.reducer;
