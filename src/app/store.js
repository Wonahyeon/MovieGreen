import { configureStore  } from "@reduxjs/toolkit";
import movieReducer from '../feature/movie/movieSlice';
import reviewReducer from '../feature/review/reviewSlice';
import userSlice from "../feature/user/userSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    review: reviewReducer,
    userNickName: userSlice,
  },
});

export default store;