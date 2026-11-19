import { LogOut } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAnalytics } from "../redux/analyticsSlice";
import { removeUser } from "../redux/userSlice";
import { removeHabits } from "../redux/habitSlice";
import { removeHabitLog } from "../redux/habitLogSlice";
import { removeUserAwards } from "../redux/userAwardsSlice";
import { useNavigate } from "react-router-dom";

const HabitToolNavbar = () => {
  const username = useSelector((state) => state.user.username);
  const [openLog, setOpenLog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logOut() {
    dispatch(removeAnalytics());
    dispatch(removeUser());
    dispatch(removeHabits());
    dispatch(removeHabitLog());
    dispatch(removeUserAwards());
    navigate("/login");
  }
  return (
    <nav className="sticky top-0 z-40 w-full flex items-center justify-between bg-white border-b border-emerald-300 shadow-[0_4px_6px_-6px_rgba(0,0,0,0.15)] px-6 py-3.5">
      <div
        onClick={() => navigate("/home")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
        <h2 className="text-xl font-serif text-emerald-950 tracking-tight">
          HabitZod
        </h2>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpenLog((prev) => !prev)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-950 text-amber-400 font-semibold hover:bg-emerald-900 transition-colors"
        >
          {username?.charAt(0).toUpperCase()}
        </button>

        {openLog && (
          <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            <button
              type="button"
              onClick={logOut}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HabitToolNavbar;
