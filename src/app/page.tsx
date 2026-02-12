"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  const { list: content, loading } = useAppSelector((state) => state.content);
  const { search, typeFilter } = useAppSelector((state) => state.ui);
  const [featuredContent, setFeaturedContent] = useState<IContent | null>(null);
  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetch("/api/content");
      const data = await response.json();
      if (data.success) {
        dispatch(setContent(data.data));
        if (data.data.length > 0) {
          setFeaturedContent(data.data[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Filter content based on search and type filter
  const filteredContent = content.filter((item) => {
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
      const scrollAmount = 300;
      const newScrollLeft =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;
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

    return (
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-text"
          >
            {title}
          </motion.h2>
          <div className="flex gap-2">
            <button
              onClick={() => scrollContainer(sectionId, "left")}
              className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200 global-smooth haptic-touch touch-friendly"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollContainer(sectionId, "right")}
              className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200 global-smooth haptic-touch touch-friendly"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div
          id={`scroll-${sectionId}`}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-container smooth-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item._id.toString()}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px]"
            >
              <ContentCard content={item} />
            </motion.div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <main className="min-h-screen bg-background smooth-scroll">
      <Navbar />

      {/* Hero Banner */}
      {featuredContent && !search && typeFilter === "all" && (
        <HeroBanner content={featuredContent} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted">Loading content...</p>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredContent.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted text-lg">No content found</p>
            <p className="text-muted text-sm mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Content Sections */}
        {!loading && (
          <>
            {/* Trending - Horizontal Scroll */}
            <HorizontalScrollSection
              title="Trending Now"
              items={trendingContent}
              sectionId="trending"
            />

            {/* Latest Uploads - Grid */}
            <ContentGrid
              title="Latest Uploads"
              content={latestContent.slice(0, 12)}
            />

            {/* Telugu Movies - Horizontal Scroll */}
            <HorizontalScrollSection
              title="Telugu Movies"
              items={teluguMovies}
              sectionId="telugu"
            />

            {/* Hindi Dubbed - Horizontal Scroll */}
            <HorizontalScrollSection
              title="Hindi Dubbed"
              items={hindiDubbed}
              sectionId="hindi"
            />

            {/* Web Series - Horizontal Scroll */}
            <HorizontalScrollSection
              title="Web Series"
              items={webSeries}
              sectionId="series"
            />

            {/* All Content Grid */}
            {search && (
              <ContentGrid
                title="Search Results"
                content={filteredContent}
                emptyMessage="No results found"
              />
            )}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
