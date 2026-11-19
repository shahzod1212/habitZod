import React, { useEffect, useState } from "react";
import HabitToolNavbar from "./HabitToolNavbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Flame, Calendar, Clock, Target } from "lucide-react";
import { toast } from "react-toastify";
import { changeHabitLogStatus, getAllHabitLog } from "../axios/Apis";
import {
  addHabitLog,
  addHabitLogOneByOne,
  changehabitLog,
  setHabitLogForHabit,
} from "../redux/habitLogSlice";
import { setHabit } from "../redux/habitSlice";

function getWeekRange(date) {
  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const start = new Date(date);
  start.setDate(date.getDate() + diffToMonday);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

function getMonthRange(date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );
  return { start, end };
}

function inRange(dateStr, start, end) {
  const d = new Date(dateStr + "T00:00:00");
  return d >= start && d <= end;
}

const Details = () => {
  const habits = useSelector((state) => state.habit.habits);
  const { id } = useParams();
  const habit = habits.find((item) => item.id === Number(id));
  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);
  const [displayHabitLog, setDisplayHabitLog] = useState(null);
  const dispatch = useDispatch();
  const habitLogForHabit = useSelector(
    (state) => state.habitLog.habitLogForHabit,
  );

  useEffect(() => {
    if (!habit) return;

    const todayDate = new Date(today + "T00:00:00");

    if (habit.frequency === "DAILY") {
      setDisplayHabitLog(habitLogForHabit.find((item) => item?.date === today));
    } else if (habit.frequency === "WEEKLY") {
      const { start, end } = getWeekRange(todayDate);
      setDisplayHabitLog(
        habitLogForHabit.find((item) => inRange(item?.date, start, end)),
      );
    } else if (habit.frequency === "MONTHLY") {
      const { start, end } = getMonthRange(todayDate);
      setDisplayHabitLog(
        habitLogForHabit.find((item) => inRange(item?.date, start, end)),
      );
    }
  }, [habit, habitLogForHabit, today]);

  async function fetchHabitLogForHabit() {
    try {
      const response = await getAllHabitLog(habit.id);

      if (response.status === 200) {
        dispatch(setHabitLogForHabit(response.data));
        dispatch(addHabitLog(response.data));
      }
    } catch (err) {
      toast.error(err?.message);
    }
  }
  async function changeStatusOfHabitLog() {
    try {
      const response = await changeHabitLogStatus(
        displayHabitLog.id,
        "COMPLETED",
        displayHabitLog.date,
      );

      if (response.status === 200) {
        dispatch(changehabitLog(response.data));
      }
    } catch (err) {
      toast.error(err?.message);
    }
  }

  useEffect(() => {
    if (habit) {
      fetchHabitLogForHabit();
      dispatch(setHabit(habit));
    }
  }, [habit]);

  if (!habit) {
    return (
      <div className="flex-1 min-w-0 relative">
        <HabitToolNavbar />
        <p className="p-6 text-sm text-emerald-700/60">Habit not found.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0 relative">
      <HabitToolNavbar />
      <section className="flex">
        <div className="flex-1 min-w-0 flex flex-col gap-3 m-2">
          {displayHabitLog &&
            (() => {
              const logDate = new Date(displayHabitLog.date + "T00:00:00");
              const weekday = logDate.toLocaleDateString("en-US", {
                weekday: "long",
              });
              const monthDay = logDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              });

              return (
                <div className="w-full rounded-2xl p-5 bg-gradient-to-br from-emerald-900 to-emerald-800 shadow-lg shadow-emerald-950/20">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-orange-300 uppercase tracking-wider">
                        {weekday}
                      </p>
                      <p className="font-serif text-3xl text-white leading-tight mt-1">
                        {monthDay}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        changeStatusOfHabitLog();
                      }}
                      className={`group shrink-0 flex items-center gap-2 pl-3 pr-1 py-1 rounded-full border transition-all duration-200 active:scale-95 ${
                        displayHabitLog.status === "COMPLETED"
                          ? "bg-orange-500 border-orange-500"
                          : "bg-transparent border-white/20 hover:border-white/40"
                      }`}
                    >
                      <span
                        className={`text-xs font-medium transition-colors ${
                          displayHabitLog.status === "COMPLETED"
                            ? "text-white"
                            : "text-white/60 group-hover:text-white"
                        }`}
                      >
                        Complete
                      </span>
                      <span
                        className={`h-6 w-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                          displayHabitLog.status === "COMPLETED"
                            ? "bg-white scale-100"
                            : "bg-white/10 scale-90 group-hover:bg-white/20 group-hover:scale-100"
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className={`w-3.5 h-3.5 transition-all duration-200 ${
                            displayHabitLog.status === "COMPLETED"
                              ? "text-orange-500 scale-100 opacity-100"
                              : "text-transparent scale-50 opacity-0"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-white/10">
                    {habit.iconUrl ? (
                      <img
                        src={habit.iconUrl}
                        alt=""
                        className="h-8 w-8 shrink-0 rounded-lg object-cover ring-1 ring-white/10"
                      />
                    ) : (
                      <div className="h-8 w-8 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                        <Flame size={14} className="text-white/50" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-medium truncate transition-colors ${
                          displayHabitLog.status === "COMPLETED"
                            ? "text-white/50 line-through"
                            : "text-white"
                        }`}
                      >
                        {habit.title}
                      </p>
                      <p className="text-xs text-white/40">{habit.category}</p>
                    </div>

                    <span className="ml-auto text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/20 shrink-0">
                      {habit.difficulty}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="flex items-center gap-1.5 text-xs text-white/50">
                      <Clock size={12} className="text-orange-400 shrink-0" />
                      {habit.reminder
                        ? habit.reminder.slice(0, 5)
                        : "No reminder"}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/50">
                      <Target size={12} className="text-orange-400 shrink-0" />
                      {habit.targetCount}x target
                    </div>
                  </div>
                </div>
              );
            })()}
        </div>

        <div
          className="w-[35%] shrink-0 self-start sticky top-0 max-h-screen overflow-y-auto bg-white flex flex-col px-7 py-9 border-l border-emerald-100"
          style={{
            boxShadow: "-24px 0 40px -32px rgba(4,120,87,0.15)",
          }}
        >
          <div className="flex items-start gap-3">
            {habit.iconUrl && (
              <img
                src={habit.iconUrl}
                alt=""
                className="w-14 h-14 rounded-2xl object-cover ring-1 ring-emerald-100 shadow-sm"
              />
            )}
            <div className="min-w-0 pt-0.5">
              <h1 className="font-serif text-2xl text-emerald-950 leading-tight">
                {habit.title}
              </h1>
              <p className="text-xs text-orange-600 font-semibold mt-1 tracking-wide">
                {habit.category}
              </p>
            </div>
          </div>

          {habit.description && (
            <p className="text-sm text-emerald-800/60 mt-4 leading-relaxed">
              {habit.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3 mt-7">
            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
              <div className="flex items-center gap-1.5 text-emerald-700/50">
                <Flame size={13} className="text-orange-500" />
                <span className="text-[10px] uppercase tracking-wider">
                  Completed Rate:
                </span>
              </div>
              <p className="text-xl font-semibold text-emerald-950 mt-1.5">
                {habit.completedRate}{" "}
                <span className="text-sm font-normal text-emerald-700/50">
                  %
                </span>
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
              <div className="flex items-center gap-1.5 text-emerald-700/50">
                <Target size={13} className="text-orange-500" />
                <span className="text-[10px] uppercase tracking-wider">
                  Target
                </span>
              </div>
              <p className="text-xl font-semibold text-emerald-950 mt-1.5">
                {habit.targetCount}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-6">
            <span className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200">
              {habit.difficulty}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              {habit.frequency === "DAILY" ? "Daily" : "Weekly"}
            </span>
          </div>

          <div className="mt-7 pt-6 border-t border-emerald-100 space-y-3.5">
            <div className="flex items-center gap-2.5 text-sm text-emerald-800/70">
              <Calendar size={14} className="text-orange-500 shrink-0" />
              {habit.startDate}
              {habit.endDate ? ` → ${habit.endDate}` : ""}
            </div>
            {habit.reminder && (
              <div className="flex items-center gap-2.5 text-sm text-emerald-800/70">
                <Clock size={14} className="text-orange-500 shrink-0" />
                {habit.reminder}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Details;
