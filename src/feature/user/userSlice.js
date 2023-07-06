import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  userName: null,
  userPick: [],
  logInfo: false,
  pickStatus: false // pick 상태
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
    togglePick(state) {
      state.pickStatus = !state.pickStatus; // toggle pick 상태
    },
    addPick: (state, {payload: movie}) => {
      const pickMovie = state.userPick.filter(pick => pick.userName === movie.userName).find(pick => pick.id === movie.id);
      if (!pickMovie) state.userPick.unshift(movie);
    },
    removePick: (state, { payload: movie }) => {
      const targetIndex = state.userPick.findIndex(
        (pick) => pick.userName === movie.userName && pick.id === movie.id
      );
      if (targetIndex !== -1) {
        state.userPick.splice(targetIndex, 1);
      }
    },
  },
});


export const { togglePick, selectUser, addPick, removePick, selectLogin } = userSlice.actions;

export const selectUserName = (state) => state.userData.userName;
export const selectLoginUser = (state) => state.userData.logInfo;
export const pickStatus = (state) => state.userData.pickStatus;
export const userPickMovie = (state) => state.userData.userPick;

export default userSlice.reducer