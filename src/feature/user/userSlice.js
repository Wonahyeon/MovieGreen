import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  userName: null,
  userPick: [],
  logInfo: false,
  pickStatus: false
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
    pickStatusChange(state, action) {
      state.pickStatus = action.payload;
    },
    pickMovie: (state, {payload: movie}) => {
      const pickMovie = state.userPick.filter(pick => pick.userName === movie.userName).find(pick => pick.id === movie.id);
      if (!pickMovie) state.userPick.unshift(movie);
    },
    deletePickMovie: (state, {payload: movie}) => {
      const targetIndex = state.userPick.filter(pick => pick.userName === movie.userName).findIndex((pick) => pick.id === movie.id);
      state.userPick.splice(targetIndex,1);
    },
  },
});


export const { pickStatusChange, selectUser, pickMovie, deletePickMovie, selectLogin, resetPickMovie } = userSlice.actions;

export const selectUserName = (state) => state.userData.userName;
export const selectLoginUser = (state) => state.userData.logInfo;
export const pickStatus = (state) => state.userData.pickStatus;
export const userPickMovie = (state) => state.userData.userPick;

export default userSlice.reducer