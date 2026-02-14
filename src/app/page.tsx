"use client";

import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setContent, setLoading } from "@/redux/slices/contentSlice";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ContentGrid from "@/components/ContentGrid";
import ContentCard from "@/components/ContentCard";
import Footer from "@/components/Footer";
import { IContent } from "@/models/Content";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const dispatch = useAppDispatch();
  const { list: content } = useAppSelector((state) => state.content);
  const { search, typeFilter } = useAppSelector((state) => state.ui);
  const [featuredContent, setFeaturedContent] = useState<IContent | null>(null);
  const [allContent, setAllContent] = useState<IContent[]>([]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content");
      const data = await response.json();
      if (data.success) {
        const contentList = data.data;
        dispatch(setContent(contentList));
        setAllContent(contentList);
        if (contentList.length > 0) {
          setFeaturedContent(contentList[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const displayContent = allContent.length > 0 ? allContent : content;

  // Filter content based on search and type filter
  const filteredContent = displayContent.filter((item) => {
    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesType =
      typeFilter === "all" || item.type === typeFilter;

    return matchesSearch && matchesType;
  });

  // Get content by category
  const getContentByCategory = (category: string) =>
    filteredContent.filter(
      (item) => item.category?.toLowerCase() === category.toLowerCase()
    );

  const getContentByLanguage = (language: string) =>
    filteredContent.filter((item) => item.language === language);

  const trendingContent = getContentByCategory("Trending");
  const latestContent = getContentByCategory("Latest");
  const teluguMovies = getContentByLanguage("Telugu");
  const hindiDubbed = getContentByLanguage("Hindi");
  const webSeries = filteredContent.filter((item) => item.type === "series");

  const scrollContainer = (section: string, direction: "left" | "right") => {
    const container = document.getElementById(`scroll-${section}`);
    if (container) {
      const scrollAmount = container.offsetWidth * 0.8;
      const newScrollLeft =
        direction === "left"
          ? Math.max(0, container.scrollLeft - scrollAmount)
          : Math.min(container.scrollWidth - container.offsetWidth, container.scrollLeft + scrollAmount);
      container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  const HorizontalScrollSection = ({
    title,
    items,
    sectionId,
  }: {
    title: string;
    items: IContent[];
    sectionId: string;
  }) => {
    if (items.length === 0) return null;

    const containerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
      const container = containerRef.current;
      if (container) {
        const scrollAmount = container.offsetWidth * 0.8;
        const newLeft = direction === "left" 
          ? Math.max(0, container.scrollLeft - scrollAmount)
          : Math.min(container.scrollWidth - container.offsetWidth, container.scrollLeft + scrollAmount);
        container.scrollTo({ left: newLeft, behavior: "smooth" });
      }
    };

    return (
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text">{title}</h2>
          <div className="flex gap-2">
            <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div ref={containerRef} className="flex gap-4 overflow-x-auto pb-4">
          {items.map((item) => (
            <div key={item._id.toString()} className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px]">
              <ContentCard content={item} />
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      {featuredContent && !search && typeFilter === "all" && (
        <HeroBanner content={featuredContent} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Show content if available */}
        {allContent.length > 0 ? (
          <>
            <ContentGrid title="All Content" content={displayContent} />
          </>
        ) : null}
      </div>

      <Footer />
    </main>
  );
}
