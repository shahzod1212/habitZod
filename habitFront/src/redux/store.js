import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import habitReducer from "./habitSlice";
import habitLogReducer from "./habitLogSlice";
import analyticsReducer from "./analyticsSlice";
import userAwardsReducer from "./userAwardsSlice";
import userStreakReducer from "./userStreakSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    habit: habitReducer,
    habitLog: habitLogReducer,
    analytics: analyticsReducer,
    userAward: userAwardsReducer,
    userStreak: userStreakReducer,
  },
});

export default store;
