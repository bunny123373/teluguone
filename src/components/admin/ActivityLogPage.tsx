"use client";

import { useState, useEffect } from "react";
import { Clock, Trash2, Upload, Edit, Eye } from "lucide-react";

interface ActivityLog {
  id: string;
  action: string;
  contentTitle: string;
  contentId: string;
  timestamp: number;
}

interface ActivityLogPageProps {}

export default function ActivityLogPage({}: ActivityLogPageProps) {
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("adminActivityLog");
    if (stored) {
      const logs: ActivityLog[] = JSON.parse(stored);
      setActivities(logs.sort((a, b) => b.timestamp - a.timestamp));
    }
  }, []);

  const clearLog = () => {
    if (confirm("Are you sure you want to clear all activity logs?")) {
      localStorage.removeItem("adminActivityLog");
      setActivities([]);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "upload":
        return <Upload className="w-4 h-4 text-green-400" />;
      case "edit":
        return <Edit className="w-4 h-4 text-blue-400" />;
      case "delete":
        return <Trash2 className="w-4 h-4 text-red-400" />;
      case "view":
        return <Eye className="w-4 h-4 text-gray-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Activity Log</h1>
          <p className="text-gray-400">Recent admin actions</p>
        </div>
        {activities.length > 0 && (
          <button
            onClick={clearLog}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-all"
          >
            Clear Log
          </button>
        )}
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-12 bg-[#161f2e] rounded-lg border border-gray-800">
          <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No activity recorded yet</p>
        </div>
      ) : (
        <div className="bg-[#161f2e] rounded-lg border border-gray-800 overflow-hidden">
          <div className="divide-y divide-gray-800">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 hover:bg-[#1f293a] transition-colors"
              >
                <div className="w-8 h-8 bg-[#0d1117] rounded-full flex items-center justify-center">
                  {getActionIcon(activity.action)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    {activity.action === "upload" && "Uploaded "}
                    {activity.action === "edit" && "Edited "}
                    {activity.action === "delete" && "Deleted "}
                    {activity.contentTitle}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {activity.contentId}
                  </p>
                </div>
                <div className="text-gray-500 text-sm whitespace-nowrap">
                  {formatTime(activity.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
