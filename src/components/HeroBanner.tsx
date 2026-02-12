"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Download, Star, Calendar, Globe } from "lucide-react";
import { IContent } from "@/models/Content";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

interface HeroBannerProps {
  content: IContent;
}

export default function HeroBanner({ content }: HeroBannerProps) {
  if (!content) return null;

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-card">
        <Image
          src={content.banner || content.poster}
          alt={content.title}
          fill
          className="object-cover transition-opacity duration-500"
          priority
          quality={75}
          sizes="100vw"
          style={{ opacity: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="primary">{content.type === "movie" ? "Movie" : "Series"}</Badge>
            {content.quality && <Badge variant="accent">{content.quality}</Badge>}
            {content.language && <Badge variant="secondary">{content.language}</Badge>}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-text mb-4 leading-tight">
            {content.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-4">
            {content.year && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{content.year}</span>
              </div>
            )}
            {content.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{content.rating}/10</span>
              </div>
            )}
            {content.category && (
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                <span>{content.category}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {content.description && (
            <p className="text-muted text-sm md:text-base line-clamp-3 mb-6">
              {content.description}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={
                content.type === "movie"
                  ? `/watch/${content._id}`
                  : `/series/watch/${content._id}`
              }
              className="enhanced-button ripple haptic-touch"
            >
              <Button size="lg" className="gap-2 touch-friendly">
                <Play className="w-5 h-5" />
                Watch Now
              </Button>
            </Link>
            {content.downloadLink && (
              <a
                href={content.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="enhanced-button ripple haptic-touch"
              >
                <Button variant="outline" size="lg" className="gap-2 touch-friendly">
                  <Download className="w-5 h-5" />
                  Download
                </Button>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
