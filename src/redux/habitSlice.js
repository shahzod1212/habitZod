import { createSlice } from "@reduxjs/toolkit";
import { del, set } from "idb-keyval";

const habitSlice = createSlice({
  name: "habit",
  initialState: {
    habits: [],
    habit: null,
  },
  reducers: {
    addHabit: (state, action) => {
      state.habits = action.payload;
      set("habits", JSON.parse(JSON.stringify(state.habits)));
    },

    remove: (state, action) => {
      state.habits = state.habits.filter(
        (item) => item.id !== Number(action.payload),
      );
      set("habits", JSON.parse(JSON.stringify(state.habits)));
    },

    setHabit: (state, action) => {
      state.habit = action.payload;
      set("habit", JSON.parse(JSON.stringify(state.habit)));
    },

    addHabitOneByOne: (state, action) => {
      state.habits.push(action.payload);
      set("habits", JSON.parse(JSON.stringify(state.habits)));
    },

    initialHabit: (state, action) => {
      state.habits = action.payload;
      set("habits", JSON.parse(JSON.stringify(state.habits)));
    },

    initialHabitOne: (state, action) => {
      state.habit = action.payload;
      set("habit", JSON.parse(JSON.stringify(state.habit)));
    },

    removeHabits: (state) => {
      state.habits = [];
      state.habit = null;

      del("habits");
      del("habit");
    },
  },
});

export const {
  remove,
  addHabit,
  addHabitOneByOne,
  initialHabit,
  setHabit,
  initialHabitOne,
  removeHabits,
} = habitSlice.actions;

export default habitSlice.reducer;
