import { createSlice } from "@reduxjs/toolkit";
import { set, del } from "idb-keyval";

const userStreakSlice = createSlice({
  name: "userStreak",
  initialState: {
    userStreak: null,
  },
  reducers: {
    setInitialUserStreak: (state, action) => {
      state.userStreak = action.payload;
      set("userStreak", JSON.parse(JSON.stringify(state.userStreak)));
    },
    removeUserStreak: (state) => {
      state.userStreak = null;
      del("userStreak");
    },
  },
});

export const { setInitialUserStreak, removeUserStreak } =
  userStreakSlice.actions;

export default userStreakSlice.reducer;
