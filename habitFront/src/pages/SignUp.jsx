import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../axios/Apis";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const streak = [true, true, true, false, false, false, false];
  const [viewPassword, setViewPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  function handleWrite(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function fetchUser() {
    try {
      const response = await registerUser(form);

      if (response.status === 201) {
        addUser(response.data);
      }
    } catch (err) {
      toast.error(err?.message);
    }
  }

  return (
    <div className="max-h-screen min-h-screen w-full bg-emerald-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl shadow-emerald-900/5 border border-emerald-100 overflow-hidden grid md:grid-cols-2">
        <div className="hidden md:flex flex-col justify-between bg-emerald-950 p-10">
          <div>
            <span className="text-emerald-200 text-xs uppercase tracking-widest">
              Habitly
            </span>
            <h2 className="font-serif text-3xl text-white mt-4 leading-snug">
              Every day checked
              <br />
              is a day kept.
            </h2>
          </div>

          <svg viewBox="0 0 240 200" className="w-full h-auto mt-8" fill="none">
            <rect
              x="10"
              y="10"
              width="220"
              height="180"
              rx="14"
              fill="#0B3B2E"
              stroke="#1E5E4A"
              strokeWidth="2"
            />
            {Array.from({ length: 28 }).map((_, i) => {
              const col = i % 7;
              const row = Math.floor(i / 7);
              const done = [
                0, 1, 2, 3, 7, 8, 9, 14, 15, 16, 17, 18, 21, 22, 23,
              ].includes(i);
              return (
                <rect
                  key={i}
                  x={26 + col * 27}
                  y={28 + row * 36}
                  width="20"
                  height="20"
                  rx="5"
                  fill={done ? "#D98E04" : "#12503F"}
                />
              );
            })}
          </svg>

          <p className="text-emerald-300/70 text-xs">
            Joined by people building routines that stick.
          </p>
        </div>

        <div className="p-8 sm:p-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            {streak.map((filled, i) => (
              <span
                key={i}
                className={`h-2.5 w-2.5 rounded-full ${
                  filled ? "bg-amber-500" : "bg-emerald-100"
                }`}
              />
            ))}
          </div>

          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-emerald-950 tracking-tight">
              Start your streak
            </h1>
            <p className="text-sm text-emerald-700/70 mt-2">
              Small habits, tracked daily, add up.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-medium uppercase tracking-wide text-emerald-800/80 mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                onChange={(e) => handleWrite(e)}
                type="text"
                placeholder="earlyriser"
                className="w-full rounded-lg border border-emerald-200 bg-emerald-50/40 px-4 py-2.5 text-sm text-emerald-950 placeholder:text-emerald-700/30 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium uppercase tracking-wide text-emerald-800/80 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                onChange={(e) => handleWrite(e)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-emerald-200 bg-emerald-50/40 px-4 py-2.5 text-sm text-emerald-950 placeholder:text-emerald-700/30 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium uppercase tracking-wide text-emerald-800/80 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={`${viewPassword ? "text" : "password"}`}
                  placeholder="••••••••"
                  onChange={(e) => handleWrite(e)}
                  className="w-full rounded-lg border border-emerald-200 bg-emerald-50/40 px-4 py-2.5 text-sm text-emerald-950 placeholder:text-emerald-700/30 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                />
                {viewPassword ? (
                  <Eye
                    onClick={() => setViewPassword(false)}
                    className="absolute top-1/4 right-1 text-emerald-800/80 hover:bg-emerald-300/50  rounded-full px-1 py-0.5"
                  />
                ) : (
                  <EyeOff
                    onClick={() => setViewPassword(true)}
                    className="absolute top-1/4 right-1 text-emerald-800/80 hover:bg-emerald-300/50  rounded-full px-1 py-0.5"
                  />
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={fetchUser}
              className="w-full rounded-lg bg-emerald-950 text-white text-sm font-medium py-3 mt-2 hover:bg-emerald-900 transition"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-xs text-emerald-700/60 mt-6">
            Already tracking habits?{" "}
            <span className="text-emerald-900 font-medium cursor-pointer">
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
