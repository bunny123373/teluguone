"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Play, Star, Calendar, Globe, ArrowLeft, Tv, ChevronRight } from "lucide-react";
import { IContent, IEpisode } from "@/models/Content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
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
            .slice(0, 6)
        );
      }
    } catch (error) {
      console.error("Error fetching similar series:", error);
    }
  };

  const getFirstEpisode = (): IEpisode | null => {
    if (series?.seasons && series.seasons.length > 0) {
      const firstSeason = series.seasons[0];
      if (firstSeason.episodes.length > 0) {
        return firstSeason.episodes[0];
      }
    }
    return null;
  };

  if (!series) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="py-20 text-center">
          <p className="text-muted text-lg">Redirecting...</p>
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
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Banner Background */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src={series.banner || series.poster}
          alt={series.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-48 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Poster */}
          <div className="md:col-span-1">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-border">
              <Image
                src={series.poster}
                alt={series.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted hover:text-text transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Web Series</Badge>
              {series.language && <Badge variant="accent">{series.language}</Badge>}
              {series.category && <Badge variant="default">{series.category}</Badge>}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-text">
              {series.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              {series.year && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{series.year}</span>
                </div>
              )}
              {series.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{series.rating}/10</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Tv className="w-4 h-4" />
                <span>{series.seasons?.length || 0} Season(s)</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{totalEpisodes} Episode(s)</span>
              </div>
            </div>

            {/* Description */}
            {series.description && (
              <p className="text-muted leading-relaxed">{series.description}</p>
            )}

            {/* Tags */}
            {series.tags && series.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {series.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-card border border-border text-sm text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href={`/series/watch/${series._id}`}>
                <Button size="lg" className="gap-2">
                  <Play className="w-5 h-5" />
                  Watch Now
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Episodes Section */}
        {currentSeason && (
          <section className="py-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text">Episodes</h2>
              {/* Season Selector */}
              {series.seasons && series.seasons.length > 1 && (
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                  className="px-4 py-2 rounded-xl bg-card border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {series.seasons.map((season, index) => (
                    <option key={index} value={index}>
                      Season {season.seasonNumber}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="space-y-3">
              {currentSeason.episodes.map((episode, index) => (
                <motion.div
                  key={episode.episodeNumber}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold">
                        {episode.episodeNumber}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-text font-medium truncate">
                        {episode.episodeTitle}
                      </h3>
                      {episode.quality && (
                        <Badge variant="accent" className="mt-1 text-xs">
                          {episode.quality}
                        </Badge>
                      )}
                    </div>
                    <Link
                      href={`/series/watch/${series._id}?season=${selectedSeason}&episode=${episode.episodeNumber}`}
                    >
                      <Button size="sm" className="gap-1">
                        <Play className="w-4 h-4" />
                        Play
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Similar Series */}
        {similarSeries.length > 0 && (
          <section className="py-8 md:py-12 mt-6 md:mt-10">
            <div className="flex items-center justify-between mb-4 md:mb-6 px-2">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-text">Similar Series</h2>
            </div>
            {/* Horizontal scroll on mobile, grid on larger screens */}
            <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-4 px-2">
              {similarSeries.map((item, index) => (
                <motion.div
                  key={item._id.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-auto snap-start"
                >
                  <ContentCard content={item} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
