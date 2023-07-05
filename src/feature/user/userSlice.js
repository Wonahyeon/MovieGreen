import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  userName: null,
  userPick: [],
  logInfo: false,
};
// login페이지에서 로그인 성공 시 logInfo = true로 바뀌면 
// Nav 컴포넌트도 변경

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.userName = action.payload;
    },
    selectLogin(state, action) {
      state.logInfo = action.payload;
    },
    pickMovie: (state, {payload: movie}) => {
      const pickMovie = state.userPick.find(pick => pick.id === movie.id);
      if (!pickMovie) state.userPick.unshift(movie);
    },
    deletePickMovie: (state, {payload: movieId}) => {
      const targetIndex = state.userPick.findIndex((pick) => pick.id === movieId);
      state.userPick.splice(targetIndex,1);
    },
    resetPickMovie: (state) => {
      state.userPick = [];
      state.userName = null;
    }
  },
});


export const { selectUser, pickMovie, deletePickMovie, selectLogin, resetPickMovie } = userSlice.actions;

export const selectUserName = (state) => state.userData.userName;
export const selectLoginUser = (state) => state.userData.logInfo;
export const userPickMovie = (state) => state.userData.userPick;

export default userSlice.reducer