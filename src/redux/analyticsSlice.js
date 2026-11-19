import { createSlice } from "@reduxjs/toolkit";
import { set, del } from "idb-keyval";

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    statistics: null,
  },
  reducers: {
    setStatistics: (state, action) => {
      state.statistics = action.payload;
      set("statistics", JSON.parse(JSON.stringify(state.statistics)));
    },

    initialStatistics: (state, action) => {
      state.statistics = action.payload;
      set("statistics", JSON.parse(JSON.stringify(state.statistics)));
    },

    removeAnalytics: (state) => {
      state.statistics = null;
      del("statistics");
    },
  },
});

export const { setStatistics, initialStatistics, removeAnalytics } =
  analyticsSlice.actions;

export default analyticsSlice.reducer;
