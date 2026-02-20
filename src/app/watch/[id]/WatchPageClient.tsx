"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Star, Calendar } from "lucide-react";
import { IContent } from "@/models/Content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import ContentCard from "@/components/ContentCard";

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
            .slice(0, 8)
        );
      }
    } catch (error) {
      console.error("Error fetching related movies:", error);
    }
  };

  if (!movie) {
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

  return (
    <main className="min-h-screen bg-[#0d1117]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Back Button */}
        <div className="mb-4">
          <Link
            href={`/movie/${movie.slug || movie._id}`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Movie Details
          </Link>
        </div>

        {/* Video Player */}
        <div className="mb-6">
          <VideoPlayer
            src={movie.watchLink || ""}
            downloadLink={movie.downloadLink}
            title={movie.title}
          />
        </div>

        {/* Movie Info - Prime Video Style */}
        <div className="bg-[#161f2e] rounded-sm p-6 mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-[#00a8e1] text-white text-xs font-semibold uppercase rounded-sm">Movie</span>
                {movie.quality && (
                  <span className="px-3 py-1 bg-black/50 text-white text-xs border border-white/30 rounded-sm">{movie.quality}</span>
                )}
                {movie.language && (
                  <span className="px-3 py-1 bg-black/50 text-white text-xs border border-white/30 rounded-sm">{movie.language}</span>
                )}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {movie.title}
              </h1>
              
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                {movie.year && (
                  <span>{movie.year}</span>
                )}
                {movie.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white">{movie.rating}</span>
                  </div>
                )}
              </div>
            </div>
            
            {movie.downloadLink && (
              <a
                href={movie.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#222] hover:bg-[#333] text-white rounded-sm border border-white/20 transition-all"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            )}
          </div>

          {movie.description && (
            <p className="text-gray-300 mt-4 leading-relaxed text-sm md:text-base">
              {movie.description}
            </p>
          )}
        </div>

        {/* Related Movies - Horizontal Scroll */}
        {relatedMovies.length > 0 && (
          <section className="mb-12">
            <h2 className="text-white font-semibold text-xl mb-6">Related Movies</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700">
              {relatedMovies.map((item) => (
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
