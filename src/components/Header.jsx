import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative max-h-screen min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/headerImage.webp')" }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center px-4">
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-emerald-100 bg-white/10 border border-white/20 rounded-full px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Built for daily habits
        </span>

        <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight mt-6">
          HabitZod
        </h1>

        <p className="text-white/80 text-lg mt-4 max-w-xl mx-auto">
          Small habits, kept daily, turn into streaks worth protecting.
        </p>

        <button
          onClick={() => navigate("/tool")}
          className="rounded-lg bg-emerald-950 text-white text-sm font-medium px-6 py-3 mt-8 hover:bg-emerald-900 transition"
        >
          Start your streak
        </button>
      </div>
    </div>
  );
};

export default Header;
