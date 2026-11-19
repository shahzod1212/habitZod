import React, { useState, useMemo } from "react";
import { X, Flame, Clock, ArrowRight, Image as ImageIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createHabit } from "../axios/Apis";
import { addHabitOneByOne } from "../redux/habitSlice";

const FREQUENCIES = ["DAILY", "WEEKLY", "MONTHLY"];
const DIFFICULTIES = [
  { key: "EASY", label: "Easy", weight: 1 },
  { key: "MEDIUM", label: "Medium", weight: 2 },
  { key: "HARD", label: "Hard", weight: 3 },
];

const CreateHabitModal = ({ isOpen, onClose, onCreate }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    frequency: "DAILY",
    targetCount: "",
    startDate: "",
    endDate: "",
    reminder: "",
    difficulty: "EASY",
    iconUrl: "",
    userId: id,
  });
  const [iconFailed, setIconFailed] = useState(false);

  if (!isOpen) return null;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const initial = form.title.trim().charAt(0).toUpperCase() || "?";
  const difficulty = DIFFICULTIES.find((d) => d.key === form.difficulty);
  const ringPercent = (difficulty.weight / 3) * 100;

  const summaryLine = useMemo(() => {
    const freq =
      form.frequency.charAt(0) + form.frequency.slice(1).toLowerCase();
    const count = form.targetCount ? `${form.targetCount}×` : "";
    return [freq, count].filter(Boolean).join(" · ");
  }, [form.frequency, form.targetCount]);

  const handleCreate = async () => {
    try {
      const response = await createHabit(form);

      if (response.status === 201) {
        dispatch(addHabitOneByOne(response.data));
        onClose(false);
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap');
        .cvh-serif { font-family: 'Fraunces', serif; }
        .cvh-sans { font-family: 'Inter', sans-serif; }
        .cvh-underline {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(6,78,59,0.18);
          border-radius: 0;
          padding: 10px 2px;
          color: #022C22;
          transition: border-color 0.2s ease;
        }
        .cvh-underline::placeholder { color: rgba(6,78,59,0.4); }
        .cvh-underline:focus {
          outline: none;
          border-bottom-color: #F97316;
        }
        .cvh-scroll::-webkit-scrollbar { width: 6px; }
        .cvh-scroll::-webkit-scrollbar-thumb {
          background: rgba(6,78,59,0.15);
          border-radius: 999px;
        }
      `}</style>

      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="cvh-sans relative w-full max-w-[860px] max-h-[88vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col md:flex-row bg-white"
        style={{ border: "1px solid rgba(6,78,59,0.1)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 grid place-items-center w-8 h-8 rounded-full text-[#047857] hover:text-[#022C22] hover:bg-[#ECFDF5] transition"
        >
          <X size={16} />
        </button>

        <div
          className="w-full md:w-[260px] bg-emerald-950 shrink-0 px-7 pt-8 pb-6 flex md:flex-col items-center md:items-start gap-5 md:gap-0"
          style={{
            borderBottom: "1px solid rgba(6,78,59,0.08)",
          }}
        >
          <span className="cvh-sans hidden md:block text-[10px] tracking-[0.2em] text-white uppercase mb-6">
            Preview
          </span>

          <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 text-white">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full -rotate-90"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(6,78,59,0.12)"
                strokeWidth="4"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#F97316"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 45}
                strokeDashoffset={2 * Math.PI * 45 * (1 - ringPercent / 100)}
                style={{ transition: "stroke-dashoffset 0.4s ease" }}
              />
            </svg>
            {FREQUENCIES.includes(form.frequency) &&
              Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * 2 * Math.PI - Math.PI / 2;
                const active =
                  form.frequency === "DAILY"
                    ? true
                    : form.frequency === "WEEKLY"
                      ? i % 2 === 0
                      : i % 4 === 0;
                const r = 41;
                const x = 50 + r * Math.cos(angle);
                const y = 50 + r * Math.sin(angle);
                return (
                  <svg
                    key={i}
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full"
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={active ? 1.6 : 1}
                      fill={active ? "#FDBA74" : "rgba(6,78,59,0.15)"}
                    />
                  </svg>
                );
              })}
            <div className="absolute inset-[10px] rounded-full grid place-items-center overflow-hidden bg-white border border-[#047857]/15">
              {form.iconUrl && !iconFailed ? (
                <img
                  src={form.iconUrl}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={() => setIconFailed(true)}
                />
              ) : (
                <span className="cvh-serif text-2xl text-[#022C22]">
                  {initial}
                </span>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="cvh-serif text-xl md:text-2xl text-white leading-tight truncate md:whitespace-normal md:mt-5">
              {form.title.trim() || "Untitled ritual"}
            </h3>
            {form.category && (
              <span className="inline-block mt-2 text-[11px] tracking-wide uppercase text-[#EA580C] border border-[#F97316]/30 rounded-full px-2.5 py-0.5">
                {form.category}
              </span>
            )}
            <p className="text-xs text-[#047857] mt-3">{summaryLine}</p>
            {form.reminder && (
              <p className="flex items-center gap-1.5 text-xs text-[#047857] mt-1.5">
                <Clock size={12} /> {form.reminder}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="px-7 pt-8 pb-2">
            <p className="text-[10px] tracking-[0.2em] text-[#059669] uppercase">
              New habit
            </p>
          </div>

          <div className="cvh-scroll px-7 pb-4 space-y-5 overflow-y-auto flex-1">
            <input
              className="cvh-underline w-full cvh-serif text-lg"
              placeholder="Name your habit"
              value={form.title}
              onChange={set("title")}
            />

            <textarea
              className="cvh-underline w-full h-16 resize-none text-sm"
              placeholder="What does success look like?"
              value={form.description}
              onChange={set("description")}
            />

            <div className="grid grid-cols-2 gap-5">
              <input
                className="cvh-underline text-sm"
                placeholder="Category"
                value={form.category}
                onChange={set("category")}
              />
              <input
                type="number"
                className="cvh-underline text-sm"
                placeholder="Target count"
                value={form.targetCount}
                onChange={set("targetCount")}
              />
            </div>

            <div>
              <p className="text-[10px] tracking-[0.15em] text-[#059669] uppercase mb-2">
                Frequency
              </p>
              <div className="flex gap-2">
                {FREQUENCIES.map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, frequency: freq }))}
                    className={`text-xs px-3.5 py-1.5 rounded-full border transition ${
                      form.frequency === freq
                        ? "bg-[#F97316] border-[#F97316] text-white font-medium"
                        : "border-[#047857]/20 text-[#047857] hover:border-[#047857]/40 hover:text-[#022C22]"
                    }`}
                  >
                    {freq.charAt(0) + freq.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.15em] text-[#059669] uppercase mb-2">
                Difficulty
              </p>
              <div className="flex gap-3 items-end">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d.key}
                    type="button"
                    onClick={() =>
                      setForm((f) => ({ ...f, difficulty: d.key }))
                    }
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div
                      className="w-8 rounded-full transition-all"
                      style={{
                        height: 10 + d.weight * 6,
                        background:
                          form.difficulty === d.key
                            ? "#F97316"
                            : "rgba(6,78,59,0.12)",
                      }}
                    />
                    <span
                      className={`text-[11px] transition ${
                        form.difficulty === d.key
                          ? "text-[#022C22]"
                          : "text-[#059669]/70 group-hover:text-[#047857]"
                      }`}
                    >
                      {d.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-[10px] tracking-[0.15em] text-[#059669] uppercase mb-1">
                  Start date
                </p>
                <input
                  type="date"
                  className="cvh-underline w-full text-sm"
                  value={form.startDate}
                  onChange={set("startDate")}
                />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.15em] text-[#059669] uppercase mb-1">
                  End date
                </p>
                <input
                  type="date"
                  className="cvh-underline w-full text-sm"
                  value={form.endDate}
                  onChange={set("endDate")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-[10px] tracking-[0.15em] text-[#059669] uppercase mb-1">
                  Reminder
                </p>
                <input
                  type="time"
                  className="cvh-underline w-full text-sm"
                  value={form.reminder}
                  onChange={set("reminder")}
                />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.15em] text-[#059669] uppercase mb-1">
                  Icon URL
                </p>
                <div className="flex items-center gap-2 cvh-underline">
                  <ImageIcon size={13} className="text-[#059669]/60 shrink-0" />
                  <input
                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#059669]/50"
                    placeholder="https://..."
                    value={form.iconUrl}
                    onChange={(e) => {
                      setIconFailed(false);
                      set("iconUrl")(e);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-end gap-3 px-7 py-5"
            style={{ borderTop: "1px solid rgba(6,78,59,0.08)" }}
          >
            <button
              onClick={onClose}
              className="text-sm text-[#047857] hover:text-[#022C22] transition px-2"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full text-white transition hover:brightness-110 active:brightness-95"
              style={{
                background: "linear-gradient(135deg, #FB923C, #F97316)",
                boxShadow: "0 8px 24px -8px rgba(249,115,22,0.5)",
              }}
            >
              <Flame size={15} />
              Create habit
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHabitModal;
