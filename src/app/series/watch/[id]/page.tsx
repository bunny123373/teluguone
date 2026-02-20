"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, Download, Play } from "lucide-react";
import { IContent, IEpisode } from "@/models/Content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import ContentCard from "@/components/ContentCard";

function SeriesWatchContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [series, setSeries] = useState<IContent | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<IEpisode | null>(null);
  const [relatedSeries, setRelatedSeries] = useState<IContent[]>([]);

  const seasonParam = searchParams.get("season");
  const episodeParam = searchParams.get("episode");

  useEffect(() => {
    if (params.id) {
      fetchSeries();
    }
  }, [params.id]);

  useEffect(() => {
    if (series) {
      const seasonIndex = seasonParam ? parseInt(seasonParam) : 0;
      const episodeNum = episodeParam ? parseInt(episodeParam) : 1;

      const season = series.seasons?.[seasonIndex];
      if (season) {
        const episode = season.episodes.find((e) => e.episodeNumber === episodeNum);
        if (episode) {
          setCurrentEpisode(episode);
        } else if (season.episodes.length > 0) {
          setCurrentEpisode(season.episodes[0]);
        }
      }
    }
  }, [series, seasonParam, episodeParam]);

  const fetchSeries = async () => {
    try {
      const response = await fetch(`/api/content/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setSeries(data.data);
        fetchRelatedSeries(data.data._id);
      }
    } catch (error) {
      console.error("Error fetching series:", error);
    }
  };

  const fetchRelatedSeries = async (excludeId: string) => {
    try {
      const response = await fetch("/api/content?type=series");
      const data = await response.json();
      if (data.success) {
        setRelatedSeries(
          data.data
            .filter((s: IContent) => s._id.toString() !== excludeId.toString())
            .slice(0, 8)
        );
      }
    } catch (error) {
      console.error("Error fetching related series:", error);
    }
  };

  const handleEpisodeSelect = (episode: IEpisode) => {
    setCurrentEpisode(episode);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!series) {
    return (
      <main className="min-h-screen bg-[#0d1117]">
        <Navbar />
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
        <Footer />
      </main>
    );
  }

  const currentSeasonIndex = seasonParam ? parseInt(seasonParam) : 0;
  const currentSeason = series.seasons?.[currentSeasonIndex];

  return (
    <main className="min-h-screen bg-[#0d1117]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Back Button */}
        <div className="mb-4">
          <Link
            href={`/series/${series._id}`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Series Details
          </Link>
        </div>

        {/* Video Player */}
        <div className="mb-6">
          <VideoPlayer
            src={currentEpisode?.watchLink || ""}
            downloadLink={currentEpisode?.downloadLink || series.downloadLink}
            title={currentEpisode?.episodeTitle || series.title}
          />
        </div>

        {/* Series Info - Prime Video Style */}
        <div className="bg-[#161f2e] rounded-sm p-6 mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-[#e50914] text-white text-xs font-semibold uppercase rounded-sm">Series</span>
                {currentSeason && (
                  <span className="px-3 py-1 bg-black/50 text-white text-xs border border-white/30 rounded-sm">
                    Season {currentSeason.seasonNumber}
                  </span>
                )}
                {currentEpisode?.quality && (
                  <span className="px-3 py-1 bg-black/50 text-white text-xs border border-white/30 rounded-sm">{currentEpisode.quality}</span>
                )}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {series.title}
              </h1>
              
              {currentEpisode && (
                <p className="text-gray-400 text-sm mb-3">
                  Episode {currentEpisode.episodeNumber}: {currentEpisode.episodeTitle || `Episode ${currentEpisode.episodeNumber}`}
                </p>
              )}
            </div>
            
            {currentEpisode?.downloadLink && (
              <a
                href={currentEpisode.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#222] hover:bg-[#333] text-white rounded-sm border border-white/20 transition-all"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            )}
          </div>
        </div>

        {/* Episodes List - Horizontal scroll */}
        {series.seasons && series.seasons.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Episodes</h3>
              {/* Season Selector */}
              {series.seasons.length > 1 && (
                <select
                  value={currentSeasonIndex}
                  onChange={(e) => {
                    const seasonIndex = parseInt(e.target.value);
                    const season = series.seasons?.[seasonIndex];
                    if (season && season.episodes.length > 0) {
                      setCurrentEpisode(season.episodes[0]);
                    }
                  }}
                  className="px-4 py-2 bg-[#161f2e] border border-gray-600 text-white text-sm rounded-sm focus:outline-none focus:border-[#00a8e1]"
                >
                  {series.seasons.map((season, index) => (
                    <option key={index} value={index}>
                      Season {season.seasonNumber}
                    </option>
                  ))}
                </select>
              )}
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700">
              {currentSeason?.episodes.map((episode) => (
                <button
                  key={episode.episodeNumber}
                  onClick={() => handleEpisodeSelect(episode)}
                  className={`flex-shrink-0 w-[160px] bg-[#161f2e] hover:bg-[#1f293a] rounded-sm overflow-hidden border transition-all ${
                    currentEpisode?.episodeNumber === episode.episodeNumber
                      ? "border-[#00a8e1]"
                      : "border-gray-800 hover:border-gray-600"
                  }`}
                >
                  <div className="aspect-video bg-[#0d1117] relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentEpisode?.episodeNumber === episode.episodeNumber
                          ? "bg-[#00a8e1]"
                          : "bg-black/60"
                      }`}>
                        <Play className="w-5 h-5 fill-white" />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
                      Ep {episode.episodeNumber}
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-white text-sm truncate">
                      {episode.episodeTitle || `Episode ${episode.episodeNumber}`}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Related Series - Horizontal Scroll */}
        {relatedSeries.length > 0 && (
          <section className="mb-12">
            <h2 className="text-white font-semibold text-xl mb-6">Related Series</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700">
              {relatedSeries.map((item) => (
                <div key={item._id.toString()} className="flex-shrink-0 w-[140px] sm:w-[160px]">
                  <ContentCard content={item} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}

export default function SeriesWatchPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0d1117]">
        <Navbar />
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
        <Footer />
      </main>
    }>
      <SeriesWatchContent />
    </Suspense>
  );
}
