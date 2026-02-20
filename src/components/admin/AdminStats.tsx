"use client";

import { Film, Tv, PlayCircle, TrendingUp } from "lucide-react";
import { IContent } from "@/models/Content";

interface AdminStatsProps {
  content: IContent[];
}

export default function AdminStats({ content }: AdminStatsProps) {
  const totalMovies = content.filter((c) => c.type === "movie").length;
  const totalSeries = content.filter((c) => c.type === "series").length;
  const totalEpisodes = content.reduce(
    (acc, c) => acc + (c.seasons?.reduce((s, season) => s + season.episodes.length, 0) || 0),
    0
  );
  const trendingCount = content.filter((c) => c.category === "Trending").length;

  const stats = [
    {
      label: "Total Movies",
      value: totalMovies,
      icon: Film,
      color: "from-primary to-pink-600",
    },
    {
      label: "Total Series",
      value: totalSeries,
      icon: Tv,
      color: "from-secondary to-blue-600",
    },
    {
      label: "Total Episodes",
      value: totalEpisodes,
      icon: PlayCircle,
      color: "from-accent to-teal-600",
    },
    {
      label: "Trending",
      value: trendingCount,
      icon: TrendingUp,
      color: "from-yellow-500 to-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-xl p-4 sm:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-xs sm:text-sm">{stat.label}</p>
              <p className="text-2xl sm:text-3xl font-bold text-text mt-1">{stat.value}</p>
            </div>
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
            >
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
