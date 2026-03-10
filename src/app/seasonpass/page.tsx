"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Trash2, Play, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContentCard from "@/components/ContentCard";

interface SeasonPassData {
  id: string;
  title: string;
  type: string;
  addedAt: number;
  notifications: boolean;
}

export default function SeasonPassPage() {
  const [seasonPassList, setSeasonPassList] = useState<SeasonPassData[]>([]);
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("seasonPass");
    if (stored) {
      const data: SeasonPassData[] = JSON.parse(stored);
      setSeasonPassList(data);
      fetchContent(data);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchContent = async (data: SeasonPassData[]) => {
    try {
      const response = await fetch("/api/content");
      const result = await response.json();
      if (result.success) {
        const filtered = result.data.filter((item: any) => 
          data.some(d => d.id === String(item._id))
        );
        setContent(filtered);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromSeasonPass = (id: string) => {
    const updated = seasonPassList.filter(item => item.id !== id);
    setSeasonPassList(updated);
    localStorage.setItem("seasonPass", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen pv-bg">
      <Navbar />

      <div className="pv-content">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#00a8e1] rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Season Pass</h1>
              <p className="text-gray-400 text-sm">Track your favorite series and get notified</p>
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
            </div>
          ) : seasonPassList.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-[#161f2e] rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">No Series Followed</h2>
              <p className="text-gray-400 mb-6">Follow series to get notified when new episodes drop</p>
              <Link href="/" className="text-[#00a8e1] hover:underline">
                Browse Series
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-400">{seasonPassList.length} series followed</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {content.map((item) => {
                  const passData = seasonPassList.find(p => p.id === String(item._id));
                  return (
                    <div key={item._id} className="relative group">
                      <ContentCard content={item} />
                      <button
                        onClick={() => removeFromSeasonPass(String(item._id))}
                        className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                      {passData && (
                        <div className="absolute bottom-14 left-2 px-2 py-1 bg-[#00a8e1] text-white text-xs rounded flex items-center gap-1">
                          <Bell className="w-3 h-3" />
                          Following
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
