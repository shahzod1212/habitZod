import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#10b981", "#f87171"];

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex items-center justify-center gap-4 mt-1">
      {payload.map((entry) => (
        <div
          key={entry.value}
          className="flex items-center gap-1.5 text-xs font-sans"
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-emerald-900/60">{entry.value}</span>
          <span className="font-semibold text-emerald-950">
            {entry.payload.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const HabitPieChart = ({ completed, missed }) => {
  const total = completed + missed;
  const completionPct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const data = [
    { name: "Completed", value: completed },
    { name: "Missed", value: missed },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="font-serif text-sm text-emerald-950 font-semibold">
        Completion breakdown
      </h2>

      <div className="flex-1 min-h-0 relative">
        {total > 0 ? (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="60%"
                  outerRadius="85%"
                  paddingAngle={3}
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} habits`, name]}
                  contentStyle={{
                    borderRadius: 8,
                    borderColor: "#d1fae5",
                    fontFamily: "serif",
                    fontSize: 12,
                  }}
                />
                <Legend
                  content={renderLegend}
                  verticalAlign="bottom"
                  height={28}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -translate-y-3">
              <p className="text-2xl font-serif font-semibold text-emerald-950">
                {completionPct}%
              </p>
              <p className="text-[10px] font-sans text-emerald-900/40">
                {total} tracked
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-32 h-32">
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="14"
                  strokeDasharray="6 6"
                />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xs font-sans text-emerald-900/40 bg-white/70 px-3 py-1 rounded-full">
                No habits tracked yet
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HabitPieChart;
