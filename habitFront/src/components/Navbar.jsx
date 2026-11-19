import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const links = ["Products", "Habits", "Reviews", "Contact"];
  const username = useSelector((state) => state.user.username);
  const email = useSelector((state) => state.user.email);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClickLink(link) {
    if (link === "Products") {
      navigate("/home#products");
    } else if (link === "Habits") {
      navigate("/tool");
    } else if (link === "Reviews") {
      navigate("/home#testimonials");
    } else {
      navigate("/home#contact");
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          <span
            className={`font-serif text-xl font-semibold transition-colors duration-300 ${
              scrolled ? "text-emerald-950" : "text-white"
            }`}
          >
            HabitZod
          </span>
        </div>

        <div className="hidden md:flex items-center  gap-8">
          {links.map((link) => (
            <span
              onClick={() => handleClickLink(link)}
              key={link}
              className={`text-sm cursor-pointer transition-colors duration-300 ${
                scrolled
                  ? "text-emerald-900 hover:text-emerald-700"
                  : "text-white hover:text-white/70"
              }`}
            >
              {link}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`${username ? "hidden" : "block"} text-sm text-emerald-800/70 hover:text-emerald-950 cursor-pointer transition`}
          >
            Log in
          </span>
          <button className="rounded-lg bg-emerald-950 text-white text-sm font-medium px-4 py-1.5 w-fit">
            {username ? (
              <div className="flex gap-2 justify-start items-center">
                <img src="/avatar.png" alt="" className="w-8" />
                <div className="flex flex-col justify-start items-start">
                  <p className="text-sm">{username.split(" ").slice(0, 1)}</p>
                  <p className="text-xs text-gray-300">{email}</p>
                </div>
              </div>
            ) : (
              <p>Get Started</p>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
