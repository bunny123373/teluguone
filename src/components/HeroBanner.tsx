"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Star, Plus, ChevronDown, Info } from "lucide-react";
import { IContent } from "@/models/Content";

interface HeroBannerProps {
  content: IContent;
}

export default function HeroBanner({ content }: HeroBannerProps) {
  if (!content) return null;

  return (
    <div className="w-full">
      {/* Full Width Banner Image */}
      <div className="w-full h-[50vh] md:h-[60vh] relative">
        <Image
          src={content.banner || content.poster}
          alt={content.title}
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
          unoptimized
        />
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent" />
      </div>

      {/* Content Below Banner */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-10">
        {/* Badges */}
        <div className="flex gap-2 mb-4">
          {content.type === "movie" ? (
            <span className="px-3 py-1 bg-[#00a8e1] text-white text-xs font-semibold uppercase rounded-sm">Movie</span>
          ) : (
            <span className="px-3 py-1 bg-[#e50914] text-white text-xs font-semibold uppercase rounded-sm">Series</span>
          )}
          {content.quality && (
            <span className="px-3 py-1 bg-black/60 text-white text-xs font-medium uppercase border border-white/30 rounded-sm">{content.quality}</span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          {content.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-6">
          {content.year && <span>{content.year}</span>}
          {content.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white">{content.rating}</span>
            </div>
          )}
          {content.language && <span>{content.language}</span>}
          {content.genre && <span>{content.genre}</span>}
        </div>

        {/* Description */}
        {content.description && (
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
            {content.description}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link
            href={
              content.type === "movie"
                ? `/watch/${content.slug || content._id}`
                : `/series/watch/${content.slug || content._id}`
            }
          >
            <button className="flex items-center gap-2 px-6 md:px-8 py-2.5 bg-[#00a8e1] hover:bg-[#00b9f1] text-white font-semibold text-sm md:text-base rounded-sm transition-all">
              <Play className="w-5 h-5 fill-white" />
              Watch Now
            </button>
          </Link>
          
          <button className="flex items-center justify-center w-10 h-10 bg-[#222] hover:bg-[#333] text-white rounded-sm border border-white/20 transition-all">
            <Plus className="w-4 h-4" />
          </button>
          
          <Link href={content.type === "movie" ? `/movie/${content.slug || content._id}` : `/series/${content.slug || content._id}`}>
            <button className="flex items-center justify-center w-10 h-10 bg-[#222] hover:bg-[#333] text-white rounded-sm border border-white/20 transition-all">
              <Info className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
