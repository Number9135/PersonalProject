import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstRatingStar: null,
  secondRatingStar: null,
  thirdRatingStar: null,
};

const ratingStartSlice = createSlice({
  name: "ratingStar",
  initialState,
  reducers: {
    selectFirstRating : (state, action) => { state.firstRatingStar = action.payload; },
    selectSecondRating : (state, action) => { state.secondRatingStar = action.payload; },
    selectThirdRating : (state, action) => { state.thirdRatingStar = action.payload; },
  },
});

export const {selectFirstRating, selectSecondRating, selectThirdRating} = ratingStartSlice.actions;
export default ratingStartSlice.reducer;
