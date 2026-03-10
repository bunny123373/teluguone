"use client";

import { useEffect, useState } from "react";
import { Film, Tv, PlayCircle, Clock } from "lucide-react";

interface Stats {
  totalContent: number;
  totalMovies: number;
  totalSeries: number;
}

interface AdminStatsProps {
  content?: any[];
}

export default function AdminStats({ content = [] }: AdminStatsProps) {
  const [stats, setStats] = useState<Stats>({
    totalContent: 0,
    totalMovies: 0,
    totalSeries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      const totalMovies = content.filter((c) => c.type === "movie").length;
      const totalSeries = content.filter((c) => c.type === "series").length;
      setStats({
        totalContent: totalMovies + totalSeries,
        totalMovies,
        totalSeries,
      });
    } finally {
      setLoading(false);
    }
  };

  const totalEpisodes = content.reduce(
    (acc, c) => acc + (c.seasons?.reduce((s: number, season: any) => s + season.episodes.length, 0) || 0),
    0
  );

  const statsData = [
    {
      label: "Total Movies",
      value: stats.totalMovies,
      icon: Film,
      color: "bg-[#00a8e1]",
    },
    {
      label: "Total Series",
      value: stats.totalSeries,
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
      label: "Total Content",
      value: stats.totalContent,
      icon: Clock,
      color: "bg-[#00a8e1]",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[#161f2e] rounded-lg p-3 sm:p-4 lg:p-6 border border-gray-800 animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-20 bg-gray-700 rounded mb-2"></div>
                <div className="h-8 w-12 bg-gray-700 rounded"></div>
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statsData.map((stat) => (
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
