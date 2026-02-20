"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Play, Download, Star, Plus, ChevronDown, Clock, Info } from "lucide-react";
import { IContent } from "@/models/Content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContentCard from "@/components/ContentCard";

export default function MovieDetailsPage() {
  const params = useParams();
  const [movie, setMovie] = useState<IContent | null>(null);
  const [similarMovies, setSimilarMovies] = useState<IContent[]>([]);

  useEffect(() => {
    if (params.id) {
      fetchMovie();
    }
  }, [params.id]);

  useEffect(() => {
    if (movie?.title) {
      document.title = `${movie.title} (${movie.year}) - TeluguDB`;
    }
  }, [movie]);

  const fetchMovie = async () => {
    try {
      const response = await fetch(`/api/content/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setMovie(data.data);
        fetchSimilarMovies(data.data.language, data.data._id);
      } else {
        console.error("Movie not found:", data.error);
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const fetchSimilarMovies = async (language: string, excludeId: string) => {
    try {
      const response = await fetch(`/api/content?type=movie&language=${language}`);
      const data = await response.json();
      if (data.success) {
        setSimilarMovies(
          data.data
            .filter((m: IContent) => m._id.toString() !== excludeId.toString())
            .slice(0, 8)
        );
      }
    } catch (error) {
      console.error("Error fetching similar movies:", error);
    }
  };

  if (!movie) {
    return (
      <main className="min-h-screen bg-[#0d1117]">
        <Navbar />
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d1117]">
      <Navbar />

      {/* Prime Video: Full Width Banner Image */}
      <div className="w-full h-[50vh] md:h-[60vh] relative">
        <Image
          src={movie.banner || movie.poster}
          alt={movie.title}
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
        {/* Bottom dark gradient for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent" />
      </div>

      {/* Prime Video: Content Below Banner */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-10">
        {/* Title & Buttons */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {movie.title}
          </h1>
          
          {/* Prime Video Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link href={`/watch/${movie.slug || movie._id}`}>
              <button className="flex items-center gap-2 px-6 md:px-8 py-2.5 bg-[#00a8e1] hover:bg-[#00b9f1] text-white font-semibold text-sm md:text-base rounded-sm transition-all">
                <Play className="w-5 h-5 fill-white" />
                Watch Now
              </button>
            </Link>
            {movie.downloadLink && (
              <a href={movie.downloadLink} target="_blank" rel="noopener noreferrer">
                <button className="flex items-center gap-2 px-4 md:px-6 py-2.5 bg-[#222] hover:bg-[#333] text-white font-medium text-sm rounded-sm border border-white/20 transition-all">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </a>
            )}
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
          {movie.year && <span>{movie.year}</span>}
          {movie.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white">{movie.rating}</span>
            </div>
          )}
          <span className="px-2 py-0.5 border border-gray-600 rounded text-xs">{movie.quality || "HD"}</span>
          <span>{movie.language || "Telugu"}</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
          {movie.description}
        </p>

        {/* Tags */}
        {movie.tags && movie.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {movie.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-[#161f2e] text-gray-400 text-sm rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Details Table */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-gray-800 mb-8">
          <div>
            <p className="text-gray-500 text-xs">Genre</p>
            <p className="text-white">{movie.category || movie.genre || "Movie"}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Release Year</p>
            <p className="text-white">{movie.year || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Runtime</p>
            <p className="text-white">2h 30m</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Rating</p>
            <p className="text-white">{movie.rating || "N/A"}/10</p>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-10">
          <h3 className="text-white font-semibold text-lg mb-4">About {movie.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Director</p>
              <p className="text-white">Unknown</p>
            </div>
            <div>
              <p className="text-gray-500">Cast</p>
              <p className="text-white">{movie.tags?.slice(0, 5).join(", ") || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Audio</p>
              <p className="text-white">{movie.language || "Telugu"}</p>
            </div>
            <div>
              <p className="text-gray-500">Subtitles</p>
              <p className="text-white">English, Hindi, Telugu</p>
            </div>
          </div>
        </div>

        {/* More Like This */}
        {similarMovies.length > 0 && (
          <section className="mb-12">
            <h2 className="text-white font-semibold text-xl mb-6">More Like This</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700">
              {similarMovies.map((item) => (
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
