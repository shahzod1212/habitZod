import React from "react";

export const features = [
  {
    id: 1,
    title: "Keep the Streak",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtHydgUtJoZOR4zmRWaw8pAtHraEl2VSRiENcU6Qx0Q&s",
    description:
      "Stay consistent every day and build lasting habits by maintaining your streak.",
    stats: [
      {
        value: "100K+",
        text: "Users built 100+ day streaks",
      },
      {
        value: "85%",
        text: "Complete their habits every day",
      },
      {
        value: "1M+",
        text: "Habits successfully tracked",
      },
    ],
  },
  {
    id: 2,
    title: "See the pattern",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVyHk6MBIyhj6lleWZjsRSlqGz1yZPPGn7YO2kqgJyzQ&s=10",
    description:
      "Visualize recurring habit trends to understand your behavior patterns over time and improve consistency.",
    stats: [
      {
        value: "3+",
        text: "Key behavior patterns detected daily",
      },
      {
        value: "85%",
        text: "Accuracy in habit pattern recognition",
      },
      {
        value: "Weekly",
        text: "Insight updates to track progress trends",
      },
    ],
  },
  {
    id: 3,
    title: "Daily Check-ins",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzTe7ifWKpdNgFhzryUZVKDsCAhBGQipKFKd6VN2wMjw&s=10",
    description:
      "Track your daily progress with quick check-ins and celebrate every small achievement.",
    stats: [
      {
        value: "2M+",
        text: "Daily check-ins completed",
      },
      {
        value: "95%",
        text: "Users log progress consistently",
      },
      {
        value: "365",
        text: "Days of continuous progress",
      },
    ],
  },
  {
    id: 4,
    title: "Smart Reminders",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTF_F7jV1pccLmyuhpCl5PFqeTpau8LtEX_9F5jpJK7w&s=10",
    description:
      "Smart notifications adapt to your routine so you never forget the habits that matter most.",
    stats: [
      {
        value: "99%",
        text: "Reminder delivery success rate",
      },
      {
        value: "50K+",
        text: "Personalized schedules created",
      },
      {
        value: "3×",
        text: "Higher habit completion rate",
      },
    ],
  },
];
const Features = () => {
  return (
    <div
      id="products"
      className="flex flex-col gap-5 items-center min-h-screen mt-5 mb-5"
    >
      <div className="max-w-xl mx-auto flex flex-col items-center gap-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 border border-emerald-200 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          <p className="text-xs font-medium uppercase tracking-widest text-emerald-700">
            Features
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-serif text-4xl text-emerald-950 leading-tight">
            Built to keep you consistent
          </h1>
          <p className="text-emerald-800/60 leading-relaxed">
            Quick check-ins, clear streaks, and just enough insight to help you
            show up again tomorrow.
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-5">
        {features.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-emerald-100 rounded-xl hover:border-green-300 hover:shadow-md hover:shadow-emerald-900/5 transition flex items-stretch overflow-hidden min-h-[220px]"
          >
            <div className="w-52 shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0 p-5 flex flex-col justify-center">
              <h1 className="font-serif text-xl text-green-700">
                {item.title}
              </h1>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                {item.description}
              </p>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-emerald-100">
                {item.stats.map((stat) => (
                  <div key={stat.text} className="min-w-0">
                    <p className="font-serif text-sm text-emerald-950">
                      {stat.value}
                    </p>
                    <p className="text-[6px] text-emerald-700 uppercase tracking-wide leading-tight">
                      {stat.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
