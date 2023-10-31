import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  majorCategory: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    selectMajorCategory : (state, action) => {
      state.majorCategory = action.payload;
    },
  },
});

export const { selectMajorCategory } = categorySlice.actions;
export default categorySlice.reducer;




