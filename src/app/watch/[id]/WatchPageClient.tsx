"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Film, Star, Calendar } from "lucide-react";
import { IContent } from "@/models/Content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import ContentCard from "@/components/ContentCard";
import Badge from "@/components/ui/Badge";

interface WatchPageClientProps {
  id: string;
}

export default function WatchPageClient({ id }: WatchPageClientProps) {
  const [movie, setMovie] = useState<IContent | null>(null);
  const [relatedMovies, setRelatedMovies] = useState<IContent[]>([]);

  useEffect(() => {
    if (id) {
      fetchMovie();
    }
  }, [id]);

  useEffect(() => {
    if (movie?.title) {
      document.title = `Watch ${movie.title} - TeluguDB`;
    }
  }, [movie]);

  const fetchMovie = async () => {
    try {
      const response = await fetch(`/api/content/${id}`);
      const data = await response.json();
      if (data.success) {
        setMovie(data.data);
        fetchRelatedMovies(data.data._id);
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const fetchRelatedMovies = async (excludeId: string) => {
    try {
      const response = await fetch("/api/content?type=movie");
      const data = await response.json();
      if (data.success) {
        setRelatedMovies(
          data.data
            .filter((m: IContent) => m._id.toString() !== excludeId.toString())
            .slice(0, 6)
        );
      }
    } catch (error) {
      console.error("Error fetching related movies:", error);
    }
  };

  if (!movie) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="py-20 text-center">
          <p className="text-muted text-lg">Loading...</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href={`/movie/${movie.slug || movie._id}`}
            className="inline-flex items-center gap-2 text-muted hover:text-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Movie Details
          </Link>
        </div>

        {/* Video Player */}
        <div className="mb-8">
          <VideoPlayer
            src={movie.watchLink || ""}
            downloadLink={movie.downloadLink}
            title={movie.title}
          />
        </div>

        {/* Movie Info */}
        <div
          className="bg-card border border-border rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="primary">Movie</Badge>
                {movie.quality && <Badge variant="accent">{movie.quality}</Badge>}
                {movie.language && <Badge variant="secondary">{movie.language}</Badge>}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-text mb-2">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                {movie.year && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{movie.year}</span>
                  </div>
                )}
                {movie.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{movie.rating}/10</span>
                  </div>
                )}
              </div>
            </div>
            {movie.downloadLink && (
              <a
                href={movie.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download
              </a>
            )}
          </div>

          {movie.description && (
            <p className="text-muted mt-4 leading-relaxed">{movie.description}</p>
          )}
        </div>

        {/* Related Movies */}
        {relatedMovies.length > 0 && (
          <section className="py-8 md:py-10 mt-6">
            <div className="flex items-center justify-between mb-4 md:mb-6 px-2">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-text">Related Movies</h2>
            </div>
            <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-4 px-2">
              {relatedMovies.map((item) => (
                <div
                  key={item._id.toString()}
                  className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-auto snap-start"
                >
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
