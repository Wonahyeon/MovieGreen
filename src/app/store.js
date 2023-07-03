import { configureStore  } from "@reduxjs/toolkit";
import movieReducer from '../feature/movie/movieSlice';
import reviewReducer from '../feature/review/reviewSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    review: reviewReducer,
  },
});

export default store;