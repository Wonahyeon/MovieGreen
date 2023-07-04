import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import movieReducer from '../feature/movie/movieSlice';
import reviewReducer from '../feature/review/reviewSlice';
import userSlice from "../feature/user/userSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
  
  const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage, // 저장 공간
    whitelist: ['movie', 'review','userData'], // 유지하고 싶은 값
  };
  
  const reducer = combineReducers({
    movie: movieReducer,
    review: reviewReducer,
    userData: userSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;