import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import movieReducer from '../feature/movie/movieSlice';
import reviewReducer from '../feature/review/reviewSlice';
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: 'root',
  storage: storage, // 저장 공간
  whitelist: ['movie', 'review'], // 유지하고 싶은 값
};

const reducer = combineReducers({
  movie: movieReducer,
  review: reviewReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;