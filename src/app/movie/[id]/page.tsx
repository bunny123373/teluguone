"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Play, Download, Star, Calendar, Globe, ArrowLeft, Clock } from "lucide-react";
import { IContent } from "@/models/Content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
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

  const fetchMovie = async () => {
    try {
      const response = await fetch(`/api/content/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setMovie(data.data);
        fetchSimilarMovies(data.data.language, data.data._id);
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
            .slice(0, 6)
        );
      }
    } catch (error) {
      console.error("Error fetching similar movies:", error);
    }
  };

  if (!movie) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="py-20 text-center">
          <p className="text-muted text-lg">Movie not found</p>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            Go back home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background smooth-scroll">
      <Navbar />

      {/* Banner Background */}
      <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] bg-card">
        <Image
          src={movie.banner || movie.poster}
          alt={movie.title}
          fill
          className="object-cover transition-opacity duration-500"
          priority
          quality={75}
          sizes="100vw"
          style={{ opacity: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 sm:-mt-40 md:-mt-48 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {/* Poster */}
          <div className="lg:col-span-1">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-border max-w-sm mx-auto lg:max-w-none bg-card">
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover transition-opacity duration-300"
                priority
                quality={80}
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
                onLoadingComplete={() => {
                  // Image loaded successfully
                }}
                style={{ opacity: 1 }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm sm:text-base text-muted hover:text-text smooth-link smooth-touch touch-friendly"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              Back to Home
            </Link>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <div className="touch-target smooth-touch"><Badge variant="primary">Movie</Badge></div>
              {movie.quality && <div className="touch-target smooth-touch"><Badge variant="accent">{movie.quality}</Badge></div>}
              {movie.language && <div className="touch-target smooth-touch"><Badge variant="secondary">{movie.language}</Badge></div>}
              {movie.category && <div className="touch-target smooth-touch"><Badge variant="default">{movie.category}</Badge></div>}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text leading-tight">
              {movie.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted">
              {movie.year && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{movie.year}</span>
                </div>
              )}
              {movie.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                  <span>{movie.rating}/10</span>
                </div>
              )}
              {movie.language && (
                <div className="flex items-center gap-1">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{movie.language}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {movie.description && (
              <p className="text-sm sm:text-base text-muted leading-relaxed">{movie.description}</p>
            )}

            {/* Tags */}
            {movie.tags && movie.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {movie.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 sm:px-3 py-1 rounded-full bg-card border border-border text-xs sm:text-sm text-muted touch-target smooth-touch cursor-pointer hover:border-primary hover:text-primary transition-all duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Link href={`/watch/${movie._id}`} className="block enhanced-button ripple haptic-touch">
                <Button size="lg" className="gap-2 w-full sm:w-auto justify-center touch-friendly">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  Watch Now
                </Button>
              </Link>
              {movie.downloadLink && (
                <a
                  href={movie.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block enhanced-button ripple haptic-touch"
                >
                  <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto justify-center touch-friendly">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    Download
                  </Button>
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <section className="py-8 md:py-12 mt-6 md:mt-10">
            <div className="flex items-center justify-between mb-4 md:mb-6 px-2">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-text">Similar Movies</h2>
            </div>
            {/* Horizontal scroll on mobile, grid on larger screens */}
            <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-4 px-2">
              {similarMovies.map((item, index) => (
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
