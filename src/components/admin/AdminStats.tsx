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
      color: "bg-[#00a8e1]",
    },
    {
      label: "Total Series",
      value: totalSeries,
      icon: Tv,
      color: "bg-[#e50914]",
    },
    {
      label: "Total Episodes",
      value: totalEpisodes,
      icon: PlayCircle,
      color: "bg-[#00a8e1]",
    },
    {
      label: "Trending",
      value: trendingCount,
      icon: TrendingUp,
      color: "bg-[#00a8e1]",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-[#161f2e] rounded-lg p-3 sm:p-4 lg:p-6 border border-gray-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-1">{stat.value}</p>
            </div>
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg ${stat.color} flex items-center justify-center`}
            >
              <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
