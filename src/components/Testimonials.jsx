import React from "react";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Amira Hassan",
      role: "92 day streak",
      quote:
        "I've tried five habit apps before this one. HabitZod is the first one I actually kept open past week two.",
      initials: "AH",
    },
    {
      name: "Daniel Cho",
      role: "6 month streak",
      quote:
        "The check-in takes ten seconds. That's the whole trick — friction is what kills every habit tracker I've used.",
      initials: "DC",
    },
    {
      name: "Priya Nair",
      role: "41 day streak",
      quote:
        "Seeing the grid fill up in green is oddly motivating. I don't want to be the one blank square.",
      initials: "PN",
    },
  ];

  return (
    <div id="testimonials" className="w-full bg-emerald-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-emerald-700 bg-emerald-100 rounded-full px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Loved by streakers
          </span>
          <h2 className="font-serif text-4xl text-emerald-950 mt-5">
            People who kept showing up
          </h2>
          <p className="text-emerald-800/70 mt-3">
            Real streaks, real routines — a few words from people using HabitZod
            every day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-emerald-100 rounded-2xl p-6 flex flex-col"
            >
              <Quote className="h-6 w-6 text-amber-500" />
              <p className="text-sm text-emerald-900/80 leading-relaxed mt-4 flex-1">
                {t.quote}
              </p>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-emerald-100">
                <div className="h-10 w-10 rounded-full bg-emerald-950 flex items-center justify-center text-white text-xs font-medium">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-950">
                    {t.name}
                  </p>
                  <p className="text-xs text-emerald-700/60">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
