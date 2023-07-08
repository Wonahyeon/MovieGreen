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
    togglePick(state, {payload: movie}) {
      const existingPick = state.userPick.find(pick => pick.id === movie.id);
      if(existingPick) {
        const pickIndex = state.userPick.findIndex(pick => pick.id === movie.id);
        state.userPick.splice(pickIndex, 1);
      } else {
        state.userPick.unshift(movie);
      }
    },
  },
});


export const { selectUser, selectLogin, togglePick  } = userSlice.actions;

export const selectUserName = (state) => state.userData.userName;
export const selectLoginUser = (state) => state.userData.logInfo;
export const pickStatus = (state) => state.userData.pickStatus;
export const userPickMovie = (state) => state.userData.userPick;

export default userSlice.reducer