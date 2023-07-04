import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  logInfo: false,
}
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
  },
});


export const { selectUser, selectLogin } = userSlice.actions;

export const selectUserName = (state) => state.userData.userName;
export const selectLoginUser = (state) => state.userData.logInfo;

export default userSlice.reducer