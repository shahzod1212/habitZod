import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Flame,
  BarChart3,
  Bell,
  Settings,
  ChevronRight,
  Award,
  LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { removeAnalytics } from "../redux/analyticsSlice";
import { removeUser } from "../redux/userSlice";
import { removeHabits } from "../redux/habitSlice";
import { removeHabitLog } from "../redux/habitLogSlice";
import { removeUserAwards } from "../redux/userAwardsSlice";
import { toast } from "react-toastify";

const SideBar = ({ topic }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  const username = useSelector((state) => state.user.username);
  const email = useSelector((state) => state.user.email);
  const habit = useSelector((state) => state.habit.habit);
  const [openLog, setOpenLog] = useState(false);
  const dispatch = useDispatch();

  const [navItems, setNavItems] = useState([
    { icon: LayoutDashboard, label: "Dashboard", active: false },
    { icon: Flame, label: "Habits", active: false },
    { icon: BarChart3, label: "Statistics", active: false },
    { icon: Award, label: "Awards", active: false },
  ]);

  // Keep the highlighted item in sync with the actual URL,
  // not just with the topic prop or the last click.
  useEffect(() => {
    const path = location.pathname;

    let activeLabel = null;
    if (path === "/tool") {
      activeLabel = "Dashboard";
    } else if (path.startsWith("/tool/habit")) {
      activeLabel = "Habits";
    } else if (path === "/statistics") {
      activeLabel = "Statistics";
    } else if (path === "/awards") {
      activeLabel = "Awards";
    }

    setNavItems((items) =>
      items.map((item) => ({ ...item, active: item.label === activeLabel })),
    );
  }, [location.pathname]);

  const handleSelect = (label) => {
    setNavItems((items) =>
      items.map((item) => ({ ...item, active: item.label === label })),
    );
    if (label === "Dashboard") {
      navigate("/tool");
    } else if (label === "Habits") {
      if (habit) {
        navigate(`/tool/habit/${habit.id}`);
      } else {
        toast.info("Please select the habit you want to choose");
      }
    } else if (label === "Statistics") {
      navigate("/statistics");
    } else {
      navigate("/awards");
    }
  };
  function logOut() {
    dispatch(removeAnalytics());
    dispatch(removeUser());
    dispatch(removeHabits());
    dispatch(removeHabitLog());
    dispatch(removeUserAwards());
    navigate("/login");
  }

  const visibleItems = topic === "HabitPage" ? navItems.slice(0, 4) : navItems;

  return (
    <div
      className={`h-screen bg-emerald-950 flex flex-col transition-all duration-300 ${
        open ? "w-60" : "w-20"
      }`}
    >
      <div
        className={`flex items-center gap-2.5 px-5 h-16 border-b border-emerald-900 cursor-pointer ${
          open ? "justify-start" : "justify-center"
        }`}
        onClick={() => setOpen(!open)}
      >
        <img src="/logo.png" alt="" className="w-9 rounded" />
        {open && (
          <span className="font-serif text-lg text-white tracking-tight whitespace-nowrap overflow-hidden">
            HabitZod
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-1 px-3 py-6">
        {visibleItems.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            onClick={() => handleSelect(label)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition ${
              active
                ? "bg-emerald-900 text-white"
                : "text-emerald-300/70 hover:bg-emerald-900/60 hover:text-white"
            } ${open ? "justify-start" : "justify-center"}`}
          >
            <Icon
              className={`h-4.5 w-4.5 shrink-0 ${
                active ? "text-amber-400" : ""
              }`}
            />
            {open && (
              <span className="text-sm font-medium whitespace-nowrap overflow-hidden">
                {label}
              </span>
            )}
          </div>
        ))}
      </div>

      <div onClick={() => setOpenLog((prev) => !prev)} className="px-3 pb-3">
        <div
          className={`flex ${openLog ? "flex-col" : "flex"} items-center gap-3 rounded-lg bg-emerald-900/50 px-3 py-3 ${
            open ? "justify-start" : "justify-center"
          }`}
        >
          <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-emerald-950 text-xs font-semibold shrink-0">
            {username ? username.charAt(0).toUpperCase() : ""}
          </div>
          {open && (
            <div className="min-w-0">
              <p className="text-sm text-white font-medium truncate">
                {username}
              </p>
              <p className="text-xs text-emerald-400/60 truncate">{email}</p>
            </div>
          )}
          {openLog && open && (
            <button
              onClick={logOut}
              className="flex gap-1 text-xs text-gray-400  w-full items-center justify-center py-1 rounded hover:bg-red-100 hover:text-red-500 font-serif font-bold"
            >
              <LogOut />
              Log out
            </button>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="h-8 w-8 rounded-full bg-emerald-900 border border-emerald-800 flex items-center justify-center self-end -translate-x-1/2 -translate-y-4 hover:bg-emerald-800 transition"
      >
        <ChevronRight
          className={`h-4 w-4 text-emerald-200 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default SideBar;
