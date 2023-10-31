import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import categoryReducer from './CategorySlice'

 export const store = configureStore({
  reducer: {
    category : categoryReducer,
  },
});


