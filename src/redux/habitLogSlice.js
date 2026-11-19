import { createSlice } from "@reduxjs/toolkit";
import { set, del } from "idb-keyval";

const habitLogSlice = createSlice({
  name: "habitLog",
  initialState: {
    habitLog: [],
    habitLogForHabit: [],
  },
  reducers: {
    addHabitLog: (state, action) => {
      state.habitLog = action.payload;
      set("habitLogFull", JSON.parse(JSON.stringify(state.habitLog)));
    },

    addHabitLogOneByOne: (state, action) => {
      state.habitLog.push(action.payload);
      set("habitLogFull", JSON.parse(JSON.stringify(state.habitLog)));
    },

    setHabitLogForHabit: (state, action) => {
      state.habitLogForHabit = action.payload;
      set("habitLog", JSON.parse(JSON.stringify(state.habitLogForHabit)));
    },

    initialHabitLog: (state, action) => {
      state.habitLog = action.payload;
      set("habitLog", JSON.parse(JSON.stringify(state.habitLogForHabit)));
    },

    initialHabitLogSlice: (state, action) => {
      state.habitLog = action.payload.habitLog;
      state.habitLogForHabit = action.payload.habitLogForHabit;
    },

    changehabitLog: (state, action) => {
      const updatedLog = action.payload;

      const habitIndex = state.habitLogForHabit.findIndex(
        (item) => item.id === updatedLog.id,
      );

      if (habitIndex !== -1) {
        state.habitLogForHabit[habitIndex] = updatedLog;
      }

      const fullIndex = state.habitLog.findIndex(
        (item) => item.id === updatedLog.id,
      );

      if (fullIndex !== -1) {
        state.habitLog[fullIndex] = updatedLog;
      }

      set("habitLog", JSON.parse(JSON.stringify(state.habitLogForHabit)));
      set("habitLogFull", JSON.parse(JSON.stringify(state.habitLog)));
    },

    removeHabitLog: (state) => {
      state.habitLog = [];
      state.habitLogForHabit = [];

      del("habitLog");
      del("habitLogFull");
    },
  },
});

export const {
  addHabitLog,
  addHabitLogOneByOne,
  setHabitLogForHabit,
  initialHabitLog,
  initialHabitLogSlice,
  changehabitLog,
  removeHabitLog,
} = habitLogSlice.actions;

export default habitLogSlice.reducer;
