import React, { useEffect } from "react";
import HabitToolNavbar from "./HabitToolNavbar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getStreak, statisticsOfUser } from "../axios/Apis";
import { setStatistics } from "../redux/analyticsSlice";
import HabitPieChart from "./HabitPieChart";
import HabitLineChart from "./HabitLineChart";
import { CheckCircle2, XCircle, Sparkles, PartyPopper } from "lucide-react";
import { setInitialUserStreak } from "../redux/userStreakSlice";

const AnalyticsDetail = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const statistics = useSelector((state) => state.analytics.statistics);
  const habits = useSelector((state) => state.habit.habits);

  const completedHabits = habits.filter((item) => item.status === "COMPLETED");
  const missedHabits = habits.filter(
    (item) => item.status === "IN_PROGRESS" || item.status === "NONE",
  );

  async function fetchAnalytics() {
    try {
      const response = await statisticsOfUser(userId);

      if (response.status === 200) {
        dispatch(setStatistics(response.data));
      }
    } catch (err) {
      toast.error(err?.message);
    }
  }
  // async function fetchUserStreak() {
  //   try {
  //     const response = await getStreak(userId);

  //     if (response.status === 200) {
  //       dispatch(setInitialUserStreak(response.data));
  //       console.log(response.data);
  //     }
  //   } catch (err) {
  //     toast.error(err?.message);
  //   }
  // }

  useEffect(() => {
    if (userId) {
      fetchAnalytics();
      // fetchUserStreak();
    }
  }, [userId]);

  if (!statistics) {
    return (
      <div className="flex-1 min-w-0">
        <HabitToolNavbar />
        <div className="flex items-center justify-center h-[70vh] text-emerald-900/40 font-serif">
          Loading statistics...
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
      <HabitToolNavbar />
      <div className="flex-1 min-h-0 overflow-y-auto">
        <section
          className="grid gap-4 p-4"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "auto 220px 220px",
            gridTemplateAreas: `"a a b b" "c d b b" "e e f f"`,
          }}
        >
          <div
            style={{ gridArea: "a" }}
            className="flex flex-col gap-3 bg-white border border-emerald-100 rounded-2xl p-5"
          >
            <div>
              <h1 className="font-serif text-xl text-emerald-950">
                Statistics
              </h1>
              <p className="text-sm text-emerald-900/40 font-sans mt-1">
                A summary of how consistently you've kept up with your habits.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-full h-2.5 rounded-full bg-emerald-50 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${statistics.completionRate}%` }}
                />
              </div>
              <p className="text-sm font-sans font-semibold text-emerald-950 shrink-0">
                {statistics.completionRate}%
              </p>
            </div>

            <div className="flex items-center gap-6 mt-1">
              <div>
                <p className="text-xs text-emerald-900/40 font-sans">Total</p>
                <p className="text-lg font-serif text-emerald-950">
                  {statistics.totalHabits}
                </p>
              </div>
              <div>
                <p className="text-xs text-emerald-900/40 font-sans">
                  Completed
                </p>
                <p className="text-lg font-serif text-emerald-700">
                  {statistics.completedHabits}
                </p>
              </div>
              <div>
                <p className="text-xs text-emerald-900/40 font-sans">Missed</p>
                <p className="text-lg font-serif text-red-400">
                  {statistics.missedHabits}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{ gridArea: "b" }}
            className="bg-white border border-emerald-100 rounded-2xl p-5"
          >
            <HabitPieChart
              completed={statistics.completedHabits}
              missed={statistics.missedHabits}
            />
          </div>

          <div
            style={{ gridArea: "c" }}
            className="bg-white border border-emerald-100 rounded-2xl p-4 flex flex-col gap-3 overflow-y-auto"
          >
            <h2 className="font-serif text-sm text-emerald-950 font-semibold">
              Completed habits
            </h2>
            {completedHabits.length > 0 ? (
              <div className="flex flex-col gap-2">
                {completedHabits.map((habit) => (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle2
                        size={15}
                        className="text-emerald-500 shrink-0"
                      />
                      <span className="text-emerald-950 font-sans truncate">
                        {habit.title}
                      </span>
                    </div>
                    <span className="text-xs text-emerald-700/60 font-sans shrink-0">
                      {habit.category}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-2 text-center py-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-200/40 blur-lg rounded-full" />
                  <Sparkles size={26} className="relative text-emerald-400" />
                </div>
                <p className="text-sm font-serif text-emerald-950">
                  Nothing checked off yet
                </p>
                <p className="text-xs font-sans text-emerald-900/40 max-w-[180px]">
                  Complete a habit today and watch this list fill up.
                </p>
              </div>
            )}
          </div>

          <div
            style={{ gridArea: "d" }}
            className="bg-white border border-emerald-100 rounded-2xl p-4 flex flex-col gap-3 overflow-y-auto"
          >
            <h2 className="font-serif text-sm text-emerald-950 font-semibold">
              Missed habits
            </h2>
            {missedHabits.length > 0 ? (
              <div className="flex flex-col gap-2">
                {missedHabits.map((habit) => (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <XCircle size={15} className="text-red-400 shrink-0" />
                      <span className="text-emerald-950 font-sans truncate">
                        {habit.title}
                      </span>
                    </div>
                    <span className="text-xs text-emerald-700/60 font-sans shrink-0">
                      {habit.category}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-2 text-center py-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-200/40 blur-lg rounded-full" />
                  <PartyPopper size={26} className="relative text-amber-500" />
                </div>
                <p className="text-sm font-serif text-emerald-950">
                  Perfect streak
                </p>
                <p className="text-xs font-sans text-emerald-900/40 max-w-[180px]">
                  You haven't missed a single habit. Keep it going!
                </p>
              </div>
            )}
          </div>

          <div
            style={{ gridArea: "e" }}
            className="bg-white border border-emerald-100 rounded-2xl p-5"
          >
            <HabitLineChart
              dates={statistics.dateCompleted}
              color="#10b981"
              label="Completed dates"
            />
          </div>

          <div
            style={{ gridArea: "f" }}
            className="bg-white border border-emerald-100 rounded-2xl p-5"
          >
            <HabitLineChart
              dates={statistics.missedDates}
              color="#f87171"
              label="Missed dates"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnalyticsDetail;
