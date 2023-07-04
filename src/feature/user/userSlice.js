import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  userPick: []
}

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.userName = action.payload;
    },
    pickMovie: (state, {payload: movie}) => {
      state.userPick.push(movie);
    },
    deletePickMovie: (state, {payload: movieId}) => {
      const targetIndex = state.userPick.findIndex((pick) => pick.id === movieId);
      state.userPick.splice(targetIndex,1);
    }
  },
});


export const { selectUser, pickMovie, deletePickMovie } = userSlice.actions;

export const selectUserName = (state) => state.userData.userName;

export const userPickMovie = (state) => state.userData.userPick;

export default userSlice.reducer