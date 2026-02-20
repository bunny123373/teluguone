"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Download, Star, Calendar, Info } from "lucide-react";
import { IContent } from "@/models/Content";

interface HeroBannerProps {
  content: IContent;
}

export default function HeroBanner({ content }: HeroBannerProps) {
  if (!content) return null;

  return (
    <div className="pv-hero">
      <div className="pv-hero-bg">
        <Image
          src={content.banner || content.poster}
          alt={content.title}
          fill
          className="pv-hero-image"
          priority
          quality={80}
          sizes="100vw"
          unoptimized
        />
        <div className="pv-hero-gradient" />
      </div>

      <div className="pv-hero-content">
        <div className="pv-hero-badges">
          {content.type === "movie" ? (
            <span className="pv-hero-badge">Movie</span>
          ) : (
            <span className="pv-hero-badge pv-hero-badge-series">Series</span>
          )}
          {content.quality && (
            <span className="pv-hero-badge pv-hero-badge-quality">{content.quality}</span>
          )}
        </div>

        <h1 className="pv-hero-title">{content.title}</h1>

        <div className="pv-hero-meta">
          {content.year && <span>{content.year}</span>}
          <span className="pv-hero-dot">•</span>
          {content.language && <span>{content.language}</span>}
          <span className="pv-hero-dot">•</span>
          {content.genre && <span>{content.genre}</span>}
          {content.rating && (
            <>
              <span className="pv-hero-dot">•</span>
              <span className="pv-hero-rating">
                <Star className="w-4 h-4 fill-rating text-rating" />
                {content.rating}
              </span>
            </>
          )}
        </div>

        {content.description && (
          <p className="pv-hero-description">
            {content.description}
          </p>
        )}

        <div className="pv-hero-buttons">
          <Link
            href={
              content.type === "movie"
                ? `/watch/${content.slug || content._id}`
                : `/series/${content.slug || content._id}`
            }
            className="pv-hero-play-btn"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>Watch Now</span>
          </Link>
          
          <button className="pv-hero-info-btn">
            <Info className="w-5 h-5" />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
