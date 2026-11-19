import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { toast } from "react-toastify";
import { getAllAwards, getAwardForUser, getStreak } from "../axios/Apis";
import HabitToolNavbar from "../components/HabitToolNavbar";
import { useDispatch, useSelector } from "react-redux";
import { setAwards } from "../redux/userAwardsSlice";

const Awards = () => {
  const [awards, setAwards12] = useState([]);
  const id = useSelector((state) => state.user.id);
  const userAwards = useSelector((state) => state.userAward.userAwards);
  const dispatch = useDispatch();

  async function fetchAllAwards() {
    try {
      const response = await getAllAwards();

      if (response.status === 200) {
        setAwards12(response.data);
      }
    } catch (err) {
      toast.error(err?.message);
    }
  }
  async function fetchAwardsForUser() {
    try {
      const response = await getAwardForUser(id);

      if (response.status === 200) {
        dispatch(setAwards(response.data));
      }
    } catch (err) {
      toast.error(err?.message);
    }
  }

  useEffect(() => {
    if (awards.length === 0) {
      fetchAllAwards();
    }
  }, []);
  useEffect(() => {
    if (id) {
      fetchAwardsForUser();
    }
  }, [id]);

  const updatedAwards = awards.map((award) => ({
    ...award,
    status: userAwards?.some((userAward) => userAward.awardId === award.id)
      ? "Completed"
      : "None",
  }));

  const earnedCount = updatedAwards.filter(
    (award) => award.status === "Completed",
  ).length;

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar topic="Awards" />
      <div className="flex-1 min-w-0 relative flex flex-col h-screen">
        <HabitToolNavbar />

        <div className="flex-1 min-h-0 overflow-y-auto">
          <section className="flex justify-center">
            <div className="w-full max-w-4xl flex flex-col gap-6 px-6 py-8">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <h1 className="text-2xl font-serif text-emerald-950 tracking-tight">
                  Awards
                </h1>
                <span className="text-sm text-emerald-700/60 font-medium">
                  {userAwards?.length || 0} earned
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {updatedAwards.map((award, index) => {
                  const isCompleted = award.status === "Completed";

                  return (
                    <div
                      key={award.id}
                      className={`${
                        isCompleted
                          ? "bg-emerald-50/60 border-emerald-300 shadow-[0_2px_10px_rgba(16,185,129,0.10)]"
                          : "hover:border-amber-300 hover:shadow-[0_4px_20px_rgba(4,47,46,0.08)] border-emerald-100 bg-white"
                      } group relative w-full flex items-center gap-5 px-5 py-4 rounded-lg border transition-all duration-300`}
                    >
                      <span className="font-serif text-xs text-emerald-900/25 tabular-nums w-6 shrink-0 text-right">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="w-px self-stretch bg-emerald-50" />

                      <div className="relative shrink-0">
                        <div
                          className={`w-16 h-16 rounded-full overflow-hidden ring-1 ${
                            isCompleted
                              ? "ring-emerald-400"
                              : "ring-emerald-100"
                          }`}
                        >
                          <img
                            src={award.icon}
                            alt={award.name}
                            className={`w-full h-full object-cover transition-all duration-500 ${
                              isCompleted
                                ? "grayscale-0"
                                : "grayscale-[15%] group-hover:grayscale-0"
                            }`}
                          />
                        </div>

                        {isCompleted ? (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 ring-2 ring-white flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-3.5 h-3.5"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        ) : (
                          <div className="absolute -inset-[3px] rounded-full border border-amber-400/0 group-hover:border-amber-400/70 transition-colors duration-500" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <h2
                          className={`text-lg font-serif font-semibold tracking-tight ${
                            isCompleted
                              ? "text-emerald-800"
                              : "text-emerald-950"
                          }`}
                        >
                          {award.name}
                        </h2>
                        <p className="text-sm text-emerald-900/50 leading-relaxed line-clamp-2">
                          {award.description}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 flex items-center gap-1 font-sans text-[10px] font-medium tracking-[0.15em] rounded px-2 py-1 border transition-colors duration-300 ${
                          isCompleted
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "text-emerald-700/50 border-emerald-100 group-hover:text-amber-700 group-hover:border-amber-300"
                        }`}
                      >
                        {isCompleted && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-2.5 h-2.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                        {isCompleted ? "Completed" : award.code.toUpperCase()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Awards;
