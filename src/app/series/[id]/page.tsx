"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Play, Star, Plus, ChevronDown, Tv } from "lucide-react";
import { IContent } from "@/models/Content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContentCard from "@/components/ContentCard";

export default function SeriesDetailsPage() {
  const params = useParams();
  const [series, setSeries] = useState<IContent | null>(null);
  const [similarSeries, setSimilarSeries] = useState<IContent[]>([]);
  const [selectedSeason, setSelectedSeason] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchSeries();
    }
  }, [params.id]);

  const fetchSeries = async () => {
    try {
      const response = await fetch(`/api/content/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setSeries(data.data);
        fetchSimilarSeries(data.data._id);
      }
    } catch (error) {
      console.error("Error fetching series:", error);
    }
  };

  const fetchSimilarSeries = async (excludeId: string) => {
    try {
      const response = await fetch("/api/content?type=series");
      const data = await response.json();
      if (data.success) {
        setSimilarSeries(
          data.data
            .filter((s: IContent) => s._id.toString() !== excludeId.toString())
            .slice(0, 8)
        );
      }
    } catch (error) {
      console.error("Error fetching similar series:", error);
    }
  };

  if (!series) {
    return (
      <main className="min-h-screen bg-[#0d1117]">
        <Navbar />
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      </main>
    );
  }

  const currentSeason = series.seasons?.[selectedSeason];
  const totalEpisodes = series.seasons?.reduce(
    (acc, season) => acc + season.episodes.length,
    0
  );

  return (
    <main className="min-h-screen bg-[#0d1117]">
      <Navbar />

      {/* Prime Video: Full Width Banner */}
      <div className="w-full h-[50vh] md:h-[60vh] relative">
        <Image
          src={series.banner || series.poster}
          alt={series.title}
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent" />
      </div>

      {/* Content Below Banner */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-10">
        {/* Title & Buttons */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {series.title}
          </h1>

          {/* Prime Video Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link href={`/series/watch/${series.slug || series._id}`}>
              <button className="flex items-center gap-2 px-6 md:px-8 py-2.5 bg-[#00a8e1] hover:bg-[#00b9f1] text-white font-semibold text-sm md:text-base rounded-sm transition-all">
                <Play className="w-5 h-5 fill-white" />
                Watch Now
              </button>
            </Link>
            <button className="flex items-center justify-center w-10 h-10 bg-[#222] hover:bg-[#333] text-white rounded-sm border border-white/20 transition-all">
              <Plus className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-[#222] hover:bg-[#333] text-white rounded-sm border border-white/20 transition-all">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-6">
          {series.year && <span>{series.year}</span>}
          {series.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white">{series.rating}</span>
            </div>
          )}
          <span className="px-2 py-0.5 border border-gray-600 rounded text-xs">{series.quality || "HD"}</span>
          <span>{series.language || "Telugu"}</span>
          <span>{series.seasons?.length || 0} Seasons</span>
          <span>{totalEpisodes} Episodes</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
          {series.description}
        </p>

        {/* Tags */}
        {series.tags && series.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {series.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-[#161f2e] text-gray-400 text-sm rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Episodes Section */}
        {currentSeason && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold text-xl">
                Season {currentSeason.seasonNumber} Episodes
              </h2>
              {series.seasons && series.seasons.length > 1 && (
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
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

            {/* Episodes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {currentSeason.episodes.map((episode) => (
                <Link
                  key={episode.episodeNumber}
                  href={`/series/watch/${series.slug || series._id}?season=${selectedSeason}&episode=${episode.episodeNumber}`}
                  className="group bg-[#161f2e] hover:bg-[#1f293a] rounded-sm overflow-hidden border border-gray-800 hover:border-gray-600 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-[#0d1117]">
                    <Image
                      src={series.poster}
                      alt={episode.episodeTitle}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 bg-[#00a8e1] rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 fill-white" />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
                      Ep {episode.episodeNumber}
                    </div>
                  </div>
                  
                  {/* Episode Info */}
                  <div className="p-3">
                    <h3 className="text-white text-sm truncate group-hover:text-[#00a8e1] transition-colors">
                      {episode.episodeTitle || `Episode ${episode.episodeNumber}`}
                    </h3>
                    {episode.quality && (
                      <p className="text-gray-500 text-xs mt-1">{episode.quality}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Details Table */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-gray-800 mb-8">
          <div>
            <p className="text-gray-500 text-xs">Genre</p>
            <p className="text-white">{series.category || series.genre || "Web Series"}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Seasons</p>
            <p className="text-white">{series.seasons?.length || 0}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Episodes</p>
            <p className="text-white">{totalEpisodes || 0}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Release Year</p>
            <p className="text-white">{series.year || "N/A"}</p>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-10">
          <h3 className="text-white font-semibold text-lg mb-4">About {series.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Cast</p>
              <p className="text-white">{series.tags?.slice(0, 5).join(", ") || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Audio</p>
              <p className="text-white">{series.language || "Telugu"}</p>
            </div>
            <div>
              <p className="text-gray-500">Subtitles</p>
              <p className="text-white">English, Hindi, Telugu</p>
            </div>
            <div>
              <p className="text-gray-500">Content Rating</p>
              <p className="text-white">TV-14</p>
            </div>
          </div>
        </div>

        {/* More Like This */}
        {similarSeries.length > 0 && (
          <section className="mb-12">
            <h2 className="text-white font-semibold text-xl mb-6">More Like This</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700">
              {similarSeries.map((item) => (
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
