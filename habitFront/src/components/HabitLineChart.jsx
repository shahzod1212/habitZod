import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const placeholderData = [
  { date: "1", count: 2 },
  { date: "2", count: 3 },
  { date: "3", count: 2.5 },
  { date: "4", count: 4 },
  { date: "5", count: 3 },
  { date: "6", count: 4.5 },
  { date: "7", count: 3.5 },
];

const HabitLineChart = ({ dates, color, label }) => {
  const data = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const counts = {};
    (dates || []).forEach((rawDate) => {
      const date = new Date(rawDate);
      if (date > today) return;
      counts[rawDate] = (counts[rawDate] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([date, count]) => ({
        date: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        count,
      }));
  }, [dates]);

  const total = data.reduce((sum, entry) => sum + entry.count, 0);
  const peak = data.reduce((max, entry) => Math.max(max, entry.count), 0);
  const gradientId = `gradient-${color.replace("#", "")}`;
  const emptyLabel = `No ${label.toLowerCase()} yet`;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-sm text-emerald-950 font-semibold">
          {label}
        </h2>
        {data.length > 0 && (
          <div className="flex items-center gap-3 text-xs font-sans text-emerald-900/40">
            <span>
              Total{" "}
              <span className="font-semibold text-emerald-950">{total}</span>
            </span>
            <span>
              Peak{" "}
              <span className="font-semibold text-emerald-950">{peak}</span>
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 min-h-0 relative mt-1">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#ecfdf5"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#065f46" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 10, fill: "#065f46" }}
                axisLine={false}
                tickLine={false}
                width={24}
              />
              <Tooltip
                cursor={{
                  stroke: color,
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  borderRadius: 8,
                  borderColor: "#d1fae5",
                  fontFamily: "serif",
                  fontSize: 12,
                }}
                formatter={(value) => [`${value}`, label]}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke={color}
                strokeWidth={2.5}
                fill={`url(#${gradientId})`}
                dot={{ r: 3, fill: color, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <>
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={placeholderData}
                  margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="gradient-placeholder"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="5 4"
                    fill="url(#gradient-placeholder)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xs font-sans text-emerald-900/40 bg-white/70 px-3 py-1 rounded-full">
                {emptyLabel}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HabitLineChart;
