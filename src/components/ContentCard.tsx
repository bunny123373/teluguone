"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Play } from "lucide-react";
import { IContent } from "@/models/Content";

interface ContentCardProps {
  content: IContent;
}

export default function ContentCard({ content }: ContentCardProps) {
  const href = content.type === "movie" 
    ? `/movie/${content.slug || content._id.toString()}` 
    : `/series/${content.slug || content._id.toString()}`;

  return (
    <Link href={href} className="pv-card">
      <div className="pv-card-image-container">
        <Image
          src={content.poster}
          alt={content.title}
          fill
          className="pv-card-image"
          sizes="160px"
          unoptimized
        />
        
        <div className="pv-card-overlay">
          <div className="pv-play-button">
            <Play className="w-8 h-8 fill-white" />
          </div>
        </div>

        <div className="pv-card-badges">
          {content.type === "movie" ? (
            <span className="pv-badge pv-badge-movie">Movie</span>
          ) : (
            <span className="pv-badge pv-badge-series">Series</span>
          )}
          {content.quality && (
            <span className="pv-badge pv-badge-quality">{content.quality}</span>
          )}
        </div>

        {content.rating && (
          <div className="pv-rating">
            <Star className="w-3 h-3 fill-rating text-rating" />
            <span>{content.rating}</span>
          </div>
        )}

        <div className="pv-card-meta">
          <span className="pv-card-year">{content.year}</span>
          {content.language && (
            <span className="pv-card-language">{content.language}</span>
          )}
        </div>
      </div>

      <div className="pv-card-info">
        <h3 className="pv-card-title">{content.title}</h3>
        {content.genre && (
          <p className="pv-card-genre">{content.genre}</p>
        )}
      </div>
    </Link>
  );
}
