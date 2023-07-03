import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
}

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.userName = action.payload;
    }
  },
});


export const { selectUser } = userSlice.actions;

export const selectUserName = (state) => state.userData.userName;

export default userSlice.reducer