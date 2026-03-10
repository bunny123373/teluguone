"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Play, ArrowLeft } from "lucide-react";
import { IContent } from "@/models/Content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function WatchPartyPage() {
  const params = useParams();
  const [content, setContent] = useState<IContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.id) {
      fetchContent();
    }
  }, [params.id]);

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/content/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setContent(data.data);
      } else {
        setError("Content not found");
      }
    } catch {
      setError("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0d1117]">
        <Navbar />
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      </main>
    );
  }

  if (error || !content) {
    return (
      <main className="min-h-screen bg-[#0d1117]">
        <Navbar />
        <div className="py-20 text-center">
          <p className="text-red-400 mb-4">{error || "Content not found"}</p>
          <Link href="/" className="text-[#00a8e1] hover:underline">
            Go back home
          </Link>
        </div>
      </main>
    );
  }

  const watchUrl = content.type === "movie" 
    ? `/watch/${content.slug || content._id}`
    : `/series/watch/${content.slug || content._id}`;

  return (
    <main className="min-h-screen bg-[#0d1117]">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-[#00a8e1] to-[#00f5d4] rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-10 h-10 text-white fill-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Watch Party</h1>
          <p className="text-gray-400">You're invited to watch together!</p>
        </div>

        <div className="bg-[#161f2e] rounded-lg overflow-hidden border border-gray-800">
          <div className="relative aspect-[2/3] md:aspect-[16/9]">
            <img
              src={content.banner || content.poster}
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Link href={watchUrl}>
                <button className="flex items-center gap-2 px-8 py-4 bg-[#00a8e1] hover:bg-[#00b9f1] text-white font-semibold rounded-full transition-all">
                  <Play className="w-6 h-6 fill-white" />
                  Start Watching
                </button>
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-2">{content.title}</h2>
            <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-4">
              {content.year && <span>{content.year}</span>}
              {content.language && <span>{content.language}</span>}
              {content.quality && (
                <span className="px-2 py-0.5 border border-gray-600 rounded text-xs">
                  {content.quality}
                </span>
              )}
            </div>
            {content.description && (
              <p className="text-gray-300 text-sm line-clamp-3">{content.description}</p>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
