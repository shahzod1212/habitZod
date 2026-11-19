import React, { useEffect, useState } from "react";
import HabitToolNavbar from "./HabitToolNavbar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteHabit, getAllHabitByUser, getCount } from "../axios/Apis";
import { addHabit, remove } from "../redux/habitSlice";
import CreateHabitModal from "./CreateHabitModal";
import { Flame, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

const HabitMain = () => {
  const id = useSelector((state) => state.user.id);
  const habits = useSelector((state) => state.habit.habits);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0); // 0-indexed page number

  const totalPages = Math.ceil(count / PAGE_SIZE);

  async function fetchUserHabit(pageToFetch = 0) {
    try {
      const response = await getAllHabitByUser(id, pageToFetch, PAGE_SIZE);

      if (response.status === 200) {
        dispatch(addHabit(response.data.content));
      }
    } catch (err) {
      toast.error(err?.message);
    }
  }
  async function fetchCount() {
    try {
      const response = await getCount(id);
      if (response.status === 200) {
        setCount(response.data);
      }
    } catch (err) {
      toast.error(err?.message);
    }
  }
  async function fetchDelete(id) {
    try {
      const response = await deleteHabit(id);
      if (response.status === 204) {
        dispatch(remove(id));
        fetchCount();
      }
    } catch (err) {
      toast.error(err?.message);
    }
  }

  useEffect(() => {
    if (id) {
      fetchCount();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchUserHabit(page);
    }
  }, [id, page]);

  function goToPage(newPage) {
    if (newPage < 0 || newPage >= totalPages) return;
    setPage(newPage);
  }

  return (
    <div className="flex-1 min-w-0 relative flex flex-col h-screen">
      <HabitToolNavbar />

      <section className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 min-h-0 overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {habits?.map((item) => {
              const circumference = 2 * Math.PI * 26;
              const offset =
                circumference - (item.completedRate / 100) * circumference;

              return (
                <div
                  onClick={() => navigate(`/tool/habit/${item.id}`)}
                  key={item.id}
                  className="group relative bg-white flex flex-col font-serif gap-4 border border-emerald-100 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-950/5 hover:border-amber-200"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fetchDelete(item.id);
                    }}
                    className="absolute top-4 right-4 grid place-items-center h-6 w-6 rounded-full text-emerald-900/30 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 hover:bg-red-50 hover:text-red-500 transition-all duration-200 ease-out"
                  >
                    <X size={12} />
                  </button>

                  <div className="flex items-start gap-3.5">
                    <img
                      src={item.iconUrl}
                      alt=""
                      className="w-11 h-11 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 pt-0.5">
                      <p className="font-serif text-lg text-emerald-950 leading-tight truncate">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${item.status === "COMPLETED" ? "bg-emerald-500" : "bg-red-400"}`}
                        />
                        <p className="text-xs text-emerald-700/70">
                          {item.category}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-emerald-900/40 font-sans leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-4 mt-1 pt-4 border-t border-emerald-50">
                    <div className="relative shrink-0 w-16 h-16">
                      <svg viewBox="0 0 60 60" className="w-16 h-16 -rotate-90">
                        <circle
                          cx="30"
                          cy="30"
                          r="26"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="5"
                          className="text-emerald-50"
                        />
                        <circle
                          cx="30"
                          cy="30"
                          r="26"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={offset}
                          className="text-amber-500 transition-all duration-500"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-sans font-semibold text-emerald-950">
                        {item.completedRate}%
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-800/60 font-sans">
                          Today
                        </span>
                        <span className="font-sans font-semibold text-emerald-950">
                          {item.completedToday}/{item.targetCount}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-sans font-medium uppercase tracking-wide px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                          {item.difficulty}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full flex gap-1 items-center bg-orange-50 text-orange-600 font-sans font-semibold">
                          <Flame size={13} />
                          {item.frequency === "DAILY"
                            ? "Daily"
                            : item.frequency === "WEEKLY"
                              ? "Weekly"
                              : "Monthly"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {count > PAGE_SIZE && (
          <div className="shrink-0 flex items-center justify-center gap-2 py-4 border-t border-emerald-100 bg-white">
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page === 0}
              className="h-8 w-8 rounded-full flex items-center justify-center border border-emerald-100 text-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-50 transition"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => goToPage(p)}
                className={`h-8 w-8 rounded-full text-sm font-medium transition ${
                  p === page
                    ? "bg-emerald-900 text-white"
                    : "text-emerald-700 border border-emerald-100 hover:bg-emerald-50"
                }`}
              >
                {p + 1}
              </button>
            ))}

            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages - 1}
              className="h-8 w-8 rounded-full flex items-center justify-center border border-emerald-100 text-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-50 transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </section>

      <div
        onClick={() => setOpenModal(true)}
        className="fixed bottom-6 right-6 z-50"
      >
        <div
          role="textbox"
          aria-multiline="true"
          aria-label="Чат с ChatGPT"
          className="group flex cursor-pointer items-center gap-3 rounded-2xl bg-orange-500 px-4 py-3 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-orange-500 text-lg font-bold transition-transform duration-300 group-hover:rotate-12">
            💬
          </div>

          <div className="flex flex-col text-white">
            <span className="text-sm font-semibold">Create Habit</span>
            <span className="text-xs opacity-80">Tap to create habit</span>
          </div>

          <div className="h-3 w-3 animate-pulse rounded-full bg-white"></div>
        </div>
      </div>
      {openModal && (
        <CreateHabitModal isOpen={true} onClose={() => setOpenModal(false)} />
      )}
    </div>
  );
};

export default HabitMain;
