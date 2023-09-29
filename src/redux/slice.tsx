import { createSlice } from "@reduxjs/toolkit";
import { TUserProps } from "../typings/SliceData";

const initialState: TUserProps = {
  isExistingUser: false,
  status: "loading",
};

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
  },
});

export const { setExistingUser, setStatus } = authSlice.actions;

export default authSlice.reducer;
