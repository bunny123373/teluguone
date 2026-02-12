"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Tv, Star, Calendar, Download } from "lucide-react";
import { IContent, IEpisode } from "@/models/Content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import EpisodeList from "@/components/EpisodeList";
import Badge from "@/components/ui/Badge";
import ContentCard from "@/components/ContentCard";

function SeriesWatchContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [series, setSeries] = useState<IContent | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<IEpisode | null>(null);
  const [relatedSeries, setRelatedSeries] = useState<IContent[]>([]);
  const [loading, setLoading] = useState(true);

  const seasonParam = searchParams.get("season");
  const episodeParam = searchParams.get("episode");

  useEffect(() => {
    if (params.id) {
      fetchSeries();
    }
  }, [params.id]);

  useEffect(() => {
    if (series) {
      // Set initial episode based on URL params or first episode
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
    setLoading(true);
    try {
      const response = await fetch(`/api/content/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setSeries(data.data);
        fetchRelatedSeries(data.data._id);
      }
    } catch (error) {
      console.error("Error fetching series:", error);
    } finally {
      setLoading(false);
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
            .slice(0, 6)
        );
      }
    } catch (error) {
      console.error("Error fetching related series:", error);
    }
  };

  const handleEpisodeSelect = (episode: IEpisode) => {
    setCurrentEpisode(episode);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="py-20 text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </main>
    );
  }

  if (!series) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="py-20 text-center">
          <p className="text-muted text-lg">Series not found</p>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            Go back home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href={`/series/${series._id}`}
            className="inline-flex items-center gap-2 text-muted hover:text-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Series Details
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <VideoPlayer
                src={currentEpisode?.watchLink || ""}
                downloadLink={currentEpisode?.downloadLink || series.downloadLink}
                title={currentEpisode?.episodeTitle || series.title}
              />
            </motion.div>

            {/* Episode Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Web Series</Badge>
                    {currentEpisode?.quality && (
                      <Badge variant="accent">{currentEpisode.quality}</Badge>
                    )}
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold text-text mb-2">
                    {series.title}
                  </h1>
                  {currentEpisode && (
                    <p className="text-muted">
                      Episode {currentEpisode.episodeNumber}: {currentEpisode.episodeTitle}
                    </p>
                  )}
                </div>
                {currentEpisode?.downloadLink && (
                  <a
                    href={currentEpisode.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Episode List */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-text mb-4">Episodes</h3>
              {series.seasons && (
                <EpisodeList
                  seasons={series.seasons}
                  currentEpisodeId={currentEpisode?.episodeNumber}
                  onEpisodeSelect={handleEpisodeSelect}
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* Related Series */}
        {relatedSeries.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-text mb-6">Related Series</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {relatedSeries.map((item, index) => (
                <motion.div
                  key={item._id.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
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

export default function SeriesWatchPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="py-20 text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </main>
    }>
      <SeriesWatchContent />
    </Suspense>
  );
}
