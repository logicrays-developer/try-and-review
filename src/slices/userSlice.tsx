import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Config/Axios/axiosInstance";
import { TUserProps } from "../typings/SliceData";

const initialState: TUserProps = {
  userData: null,
  accessToken: "",
  refreshToken: "",
  serveyCountData: [],
};

export const updateAccessToken = createAsyncThunk(
  "updateToken",
  async (tokens: string) => {
    const response = await axiosInstance.post("/api/app/token/refresh", {
      refresh_token: tokens,
    });
    return response?.data?.token;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.userData = action?.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    setServeyCountData(state, action) {
      const isAvailable = state.serveyCountData.some(
        (i: string) => i == action.payload
      );
      if (!isAvailable) {
        state.serveyCountData =
          action.payload == null
            ? []
            : [...state.serveyCountData, action.payload];
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(updateAccessToken.rejected, (state, action) => {
        state.accessToken = "";
      });
  },
});

export const {
  setUserData,
  setAccessToken,
  setRefreshToken,
  setServeyCountData,
} = userSlice.actions;
export default userSlice.reducer;
