import { createSlice } from "@reduxjs/toolkit";
import { set, del } from "idb-keyval";

const userAwardsSlice = createSlice({
  name: "userAward",
  initialState: {
    awards: [],
  },
  reducers: {
    setAwards: (state, action) => {
      state.awards = action.payload;
      set("userAwards", JSON.parse(JSON.stringify(state.awards)));
    },

    initialAwards: (state, action) => {
      state.awards = action.payload;
      set("userAwards", JSON.parse(JSON.stringify(state.awards)));
    },

    removeUserAwards: (state) => {
      state.awards = [];
      del("userAwards");
    },
  },
});

export const { setAwards, initialAwards, removeUserAwards } =
  userAwardsSlice.actions;

export default userAwardsSlice.reducer;
