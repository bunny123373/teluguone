"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Download, Star } from "lucide-react";
import { IContent } from "@/models/Content";
import Badge from "./ui/Badge";

interface ContentCardProps {
  content: IContent;
}

export default function ContentCard({ content }: ContentCardProps) {
  const href = content.type === "movie" ? `/movie/${content._id.toString()}` : `/series/${content._id.toString()}`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="group relative touch-card haptic-touch"
    >
      <Link href={href} className="block enhanced-button">
        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-card border border-border ripple">
          {/* Poster Image */}
          <Image
            src={content.poster}
            alt={content.title}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
            loading="lazy"
            quality={70}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
            style={{ opacity: 1 }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Play Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/50 backdrop-blur-sm">
              <Play className="w-6 h-6 text-white ml-1" fill="white" />
            </div>
          </div>

          {/* Quality Badge */}
          {content.quality && (
            <div className="absolute top-2 right-2">
              <Badge variant="accent">{content.quality}</Badge>
            </div>
          )}

          {/* Type Badge */}
          <div className="absolute top-2 left-2">
            <Badge variant={content.type === "movie" ? "primary" : "secondary"}>
              {content.type === "movie" ? "Movie" : "Series"}
            </Badge>
          </div>

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-background to-transparent">
            <h3 className="text-text font-semibold text-sm line-clamp-1 mb-1">
              {content.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted">
              {content.year && <span>{content.year}</span>}
              {content.rating && (
                <div className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>{content.rating}</span>
                </div>
              )}
              {content.type === "series" && content.seasons && (
                <span>{content.seasons.length} Season(s)</span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Title Below Card */}
      <div className="mt-2 px-1">
        <h3 className="text-text font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
          {content.title}
        </h3>
        <p className="text-muted text-xs">
          {content.language} • {content.category}
        </p>
      </div>
    </motion.div>
  );
}
