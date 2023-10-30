import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  majorCategory: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setMajorCategory: (state, action) => {
      state.majorCategory = action.payload;
    },
  },
});

export const { setMajorCategory } = categorySlice.actions;
export default categorySlice.reducer;


