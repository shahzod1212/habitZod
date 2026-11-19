import React from "react";
import { AtSign, Camera, Link2 } from "lucide-react";

const Footer = () => {
  const columns = [
    {
      title: "Product",
      links: ["Features", "Testimonials", "Statistics", "Dashboard"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Contact"],
    },
    {
      title: "Resources",
      links: ["Guides", "Support", "Community", "Status"],
    },
  ];

  return (
    <footer className="w-full bg-emerald-950 text-emerald-100 pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="font-serif text-xl text-white tracking-tight">
                HabitZod
              </span>
            </div>
            <p className="text-sm text-emerald-300/60 mt-4 max-w-xs">
              Small habits, tracked daily, add up to something worth keeping.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                aria-label="Twitter"
                className="h-9 w-9 rounded-lg bg-emerald-900 flex items-center justify-center hover:bg-emerald-800 transition"
              >
                <AtSign className="h-4 w-4 text-emerald-200" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="h-9 w-9 rounded-lg bg-emerald-900 flex items-center justify-center hover:bg-emerald-800 transition"
              >
                <Camera className="h-4 w-4 text-emerald-200" />
              </a>
              <a
                href="#"
                aria-label="Github"
                className="h-9 w-9 rounded-lg bg-emerald-900 flex items-center justify-center hover:bg-emerald-800 transition"
              >
                <Link2 className="h-4 w-4 text-emerald-200" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-medium uppercase tracking-widest text-emerald-400/70 mb-4">
                {col.title}
              </p>
              <div className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-sm text-emerald-200/80 hover:text-white transition w-fit"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-6 border-t border-emerald-900">
          <p className="text-xs text-emerald-400/60">
            © 2026 HabitZod. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-emerald-400/60 hover:text-emerald-200 transition"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs text-emerald-400/60 hover:text-emerald-200 transition"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
