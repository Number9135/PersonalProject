import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./MajorCategorySlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});

export default store;
