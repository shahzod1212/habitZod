import React from "react";
import { Mail, MessageSquare, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div id="contact" className="w-full bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-emerald-700 bg-emerald-100 rounded-full px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Get in touch
          </span>
          <h2 className="font-serif text-4xl text-emerald-950 mt-5">
            Questions about your streak?
          </h2>
          <p className="text-emerald-800/70 mt-3 max-w-sm">
            Reach out for support, feedback, or just to tell us which habit
            you're building. We read everything.
          </p>

          <div className="flex flex-col gap-5 mt-8">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-emerald-950 flex items-center justify-center shrink-0">
                <Mail className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-emerald-950 font-medium">Email</p>
                <p className="text-xs text-emerald-700/60">
                  support@habitzod.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-emerald-950 flex items-center justify-center shrink-0">
                <MessageSquare className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-emerald-950 font-medium">
                  Live chat
                </p>
                <p className="text-xs text-emerald-700/60">Mon–Fri, 9am–6pm</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-emerald-950 flex items-center justify-center shrink-0">
                <MapPin className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-emerald-950 font-medium">Office</p>
                <p className="text-xs text-emerald-700/60">
                  Remote-first, worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 sm:p-8">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium uppercase tracking-wide text-emerald-800/80 mb-1.5"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Jane Doe"
                className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-sm text-emerald-950 placeholder:text-emerald-700/30 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
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
                placeholder="you@example.com"
                className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-sm text-emerald-950 placeholder:text-emerald-700/30 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium uppercase tracking-wide text-emerald-800/80 mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Tell us what's on your mind"
                className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-sm text-emerald-950 placeholder:text-emerald-700/30 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition resize-none"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-emerald-950 text-white text-sm font-medium py-3 hover:bg-emerald-900 transition"
            >
              Send message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
