import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import categoryReducer from './CategorySlice'
import ratingStarReducer from './RatingStarSlice';
import userInfoReducer from "./AuthSlice";

 export const store = configureStore({
  reducer: {
    category : categoryReducer,
    ratingStar : ratingStarReducer,
    userInfo : userInfoReducer,
  },
});


