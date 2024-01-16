import { createSlice } from "@reduxjs/toolkit";

const tvSlice = createSlice({
  name: "tv",
  initialState: {
    popularSeries: null,
  },
  reducers: {
    addPopularSeries: (state, action) => {
      state.popularSeries = action.payload;
    },
  },
});

export const { addPopularSeries } = tvSlice.actions;

export default tvSlice.reducer;
