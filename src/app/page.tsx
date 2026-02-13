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

    const cardWidth = 200;
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [containerWidth, setContainerWidth] = useState(800);

    useEffect(() => {
      const updateWidth = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
      };
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const container = e.currentTarget;
      const page = Math.round(container.scrollLeft / (container.offsetWidth - cardWidth));
      setCurrentPage(Math.max(0, page));
    };

    const goToPage = (page: number) => {
      const container = containerRef.current;
      if (container) {
        const scrollAmount = container.offsetWidth - cardWidth;
        container.scrollTo({ left: page * scrollAmount, behavior: "smooth" });
        setCurrentPage(page);
      }
    };

    const itemsPerPage = Math.floor(containerWidth / cardWidth) || 4;
    const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

    return (
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text">{title}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => goToPage(Math.max(0, currentPage - 1))}
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => goToPage(Math.min(totalPages - 1, currentPage + 1))}
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center flex-shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto pb-4"
          onScroll={handleScroll}
        >
          {items.map((item) => (
            <div
              key={item._id.toString()}
              className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px]"
            >
              <ContentCard content={item} />
            </div>
          ))}
        </div>
        {items.length > itemsPerPage && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: Math.min(totalPages, 10) }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentPage === i
                    ? "bg-primary w-8"
                    : "bg-muted/50 w-2 hover:bg-muted hover:scale-110"
                }`}
              />
            ))}
          </div>
        )}
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
        {/* Content Sections - show all if no results */}
        {(filteredContent.length === 0 && allContent.length > 0) ? (
          <ContentGrid title="All Content" content={allContent} />
        ) : filteredContent.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted text-lg">No content found</p>
            <p className="text-muted text-sm mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
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
