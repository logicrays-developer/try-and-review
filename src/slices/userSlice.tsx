import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Config/Axios/axiosInstance";

interface IUserSlice {
  userData: object;
  accessToken: string;
  refreshToken: string;
  isExistingUser: boolean;
}

const initialState: IUserSlice = {
  userData: {},
  accessToken: "",
  refreshToken: "",
  isExistingUser: false,
};

export const updateAccessToken = createAsyncThunk(
  "updateToken",
  async (tokens: any) => {
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
    setExistingUser(state, action) {
      state.isExistingUser = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateAccessToken.fulfilled, (state, action) => {
        console.log(
          "Updated Access-Token from User-Slices ---->",
          action.payload
        );
        state.accessToken = action.payload;
      })
      .addCase(updateAccessToken.rejected, (state, action) => {
        state.accessToken = "";
      });
  },
});

export const { setUserData, setAccessToken, setRefreshToken } =
  userSlice.actions;
export default userSlice.reducer;
