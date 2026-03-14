"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Star } from "lucide-react";
import { IContent } from "@/models/Content";
import VideoPlayer from "@/components/VideoPlayer";
import MobileBackFix from "@/components/MobileBackFix";

interface PlayerPageClientProps {
  id: string;
}

export default function PlayerPageClient({ id }: PlayerPageClientProps) {
  const [content, setContent] = useState<IContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchContent();
    }
  }, [id]);

  useEffect(() => {
    if (content?.title) {
      document.title = `${content.title} - TeluguDB`;
    }
  }, [content]);

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/content/${id}`);
      const data = await response.json();
      if (data.success) {
        setContent(data.data);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black"></main>
    );
  }

  if (!content) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center">
        <p className="text-white text-lg mb-4">Content not found</p>
        <Link href="/" className="text-primary hover:underline">
          Go Home
        </Link>
      </main>
    );
  }

  const isSeries = content.type === "series";

  return (
    <main className="min-h-screen bg-black">
      <MobileBackFix />
      
      {/* Minimal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d1117] border-b border-gray-800">
        <Link
          href={isSeries ? `/series/${content.slug || content._id}` : `/movie/${content.slug || content._id}`}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        
        <div className="flex items-center gap-3">
          {content.downloadLink && (
            <a
              href={content.downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <Download className="w-3 h-3" />
              Download
            </a>
          )}
        </div>
      </div>

      {/* Video Player - Full Width */}
      <div className="w-full">
        <VideoPlayer
          src={content.watchLink || ""}
          downloadLink={content.downloadLink}
          title={content.title}
        />
      </div>

      {/* Content Info */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-2 py-0.5 bg-[#00a8e1] text-white text-xs font-semibold uppercase rounded-sm">
                {isSeries ? "Series" : "Movie"}
              </span>
              {content.quality && (
                <span className="px-2 py-0.5 bg-black/50 text-white text-xs border border-white/30 rounded-sm">
                  {content.quality}
                </span>
              )}
              {content.language && (
                <span className="px-2 py-0.5 bg-black/50 text-white text-xs border border-white/30 rounded-sm">
                  {content.language}
                </span>
              )}
            </div>
            
            <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
              {content.title}
            </h1>
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
              {content.year && <span>{content.year}</span>}
              {content.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white">{content.rating}</span>
                </div>
              )}
              {content.audioLanguages && content.audioLanguages.length > 0 && (
                <span className="text-gray-500">
                  {content.audioLanguages.join(", ")}
                </span>
              )}
            </div>
          </div>
        </div>

        {content.description && (
          <p className="text-gray-400 mt-3 text-sm leading-relaxed">
            {content.description}
          </p>
        )}
      </div>
    </main>
  );
}
