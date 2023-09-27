import {createSlice} from '@reduxjs/toolkit';
import {TUserProps} from '../typings/SliceData';

const initialState: TUserProps = {
  isExistingUser: false,
  status: 'loading',
  favourites: [],
};

const authSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setExistingUser(state, action) {
      state.isExistingUser = action.payload;
    },
    setAddToFavourites(state, action) {
      let fav = state.favourites;
      fav.push(action.payload);
      state.favourites = [...fav];
    },
    setRemoveFromFavourites(state, action) {
      let fav = state.favourites;
      state.favourites = fav.filter((item: any) => {
        return item.id.value != action.payload.id.value;
      });
    },
    resetFavourites(state, action) {
      state.favourites = [];
    },
  },
});

export const {
  setExistingUser,
  setStatus,
  setAddToFavourites,
  setRemoveFromFavourites,
  resetFavourites,
} = authSlice.actions;

export default authSlice.reducer;
