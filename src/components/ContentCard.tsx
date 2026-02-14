"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { IContent } from "@/models/Content";
import Badge from "./ui/Badge";

interface ContentCardProps {
  content: IContent;
}

export default function ContentCard({ content }: ContentCardProps) {
  const href = content.type === "movie" ? `/movie/${content._id.toString()}` : `/series/${content._id.toString()}`;

  return (
    <div className="touch-card">
      <Link href={href} className="block enhanced-button">
        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-card border border-border">
          <Image
            src={content.poster}
            alt={content.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
            style={{ opacity: 1 }}
            unoptimized
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          {content.quality && (
            <div className="absolute top-2 right-2">
              <Badge variant="accent">{content.quality}</Badge>
            </div>
          )}

          <div className="absolute top-2 left-2">
            <Badge variant={content.type === "movie" ? "primary" : "secondary"}>
              {content.type === "movie" ? "Movie" : "Series"}
            </Badge>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background to-transparent">
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

      <div className="mt-2 px-1">
        <h3 className="text-text font-medium text-sm line-clamp-1">
          {content.title}
        </h3>
        <p className="text-muted text-xs">
          {content.language} • {content.category}
        </p>
      </div>
    </div>
  );
}
