"use client";

import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setContent } from "@/redux/slices/contentSlice";
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
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  // Filter content based on search, type filter and category
  const filteredContent = displayContent.filter((item) => {
    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesType =
      typeFilter === "all" || item.type === typeFilter;

    const matchesCategory =
      selectedCategory === "All" ||
      item.category?.toLowerCase() === selectedCategory.toLowerCase() ||
      item.genre?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesType && matchesCategory;
  });

  const categories = ["All", "Trending", "Latest", "Telugu", "Hindi", "Tamil", "English", "Web Series", "Action", "Comedy", "Drama", "Thriller"];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      {featuredContent && !search && typeFilter === "all" && (
        <HeroBanner content={featuredContent} />
      )}

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Mobile Category Filter */}
        <div className="mb-4 overflow-x-auto flex gap-2 pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-sm flex-shrink-0 ${
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-card text-muted hover:text-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div>
          {allContent.length > 0 ? (
            <>
              <h2 className="text-lg sm:text-xl font-bold text-text mb-4">
                {selectedCategory === "All" ? "All Content" : selectedCategory}
                <span className="text-muted text-sm font-normal ml-2">({filteredContent.length} items)</span>
              </h2>
              <ContentGrid title="" content={filteredContent} />
            </>
          ) : null}
        </div>
      </div>

      <Footer />
    </main>
  );
}
