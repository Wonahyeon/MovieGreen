import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  reviewList : [],
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.reviewList.push(action.payload);
    },
  },
});

export const {addReview} = reviewSlice.actions;

export const addReviewList = (state) => state.review.reviewList;

export default reviewSlice.reducer;