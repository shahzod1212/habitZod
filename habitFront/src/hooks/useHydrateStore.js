import { get } from "idb-keyval";
import { useDispatch } from "react-redux";
import { initialUser } from "../redux/userSlice";
import { useEffect } from "react";
import { initialHabit, initialHabitOne } from "../redux/habitSlice";
import { initialHabitLogSlice } from "../redux/habitLogSlice";
import { initialStatistics } from "../redux/analyticsSlice";
import { initialAwards } from "../redux/userAwardsSlice";

export function useHydrateStore() {
  const dispatch = useDispatch();
  async function hydrate() {
    const user = (await get("user")) || [];
    const habits = (await get("habits")) || [];
    const habitLog = (await get("habitLogFull")) || [];
    const habitLogForHabit = (await get("habitLog")) || [];
    const analytics = (await get("statistics")) || null;
    const habit = (await get("habit")) || null;
    const userAwards = (await get("userAwards")) || [];

    dispatch(initialUser(user));
    dispatch(initialHabit(habits));
    dispatch(initialHabitOne(habit));
    dispatch(
      initialHabitLogSlice({
        habitLog: habitLog,
        habitLogForHabit: habitLogForHabit,
      }),
    );
    dispatch(initialAwards(userAwards));
    dispatch(initialStatistics(analytics));
  }

  useEffect(() => {
    hydrate();
  }, []);
}
