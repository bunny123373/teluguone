"use client";

import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setContent } from "@/redux/slices/contentSlice";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ContentRow from "@/components/ContentRow";
import Footer from "@/components/Footer";
import { IContent } from "@/models/Content";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const dispatch = useAppDispatch();
  const { list: content } = useAppSelector((state) => state.content);
  const { search } = useAppSelector((state) => state.ui);
  const [featuredContent, setFeaturedContent] = useState<IContent | null>(null);
  const [allContent, setAllContent] = useState<IContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const getContentByCategory = (filter: (item: IContent) => boolean) => {
    return allContent.filter(filter).slice(0, 20);
  };

  const categorySections = [
    { title: "Latest Movies", key: "latest", filter: (item: IContent) => item.type === "movie" },
    { title: "Trending Now", key: "trending", filter: (item: IContent) => item.type === "movie" && item.rating != null && parseFloat(String(item.rating)) >= 7 },
    { title: "Telugu Hits", key: "telugu", filter: (item: IContent) => item.language?.toLowerCase() === "telugu" },
    { title: "Hindi Movies", key: "hindi", filter: (item: IContent) => item.language?.toLowerCase() === "hindi" },
    { title: "Tamil Movies", key: "tamil", filter: (item: IContent) => item.language?.toLowerCase() === "tamil" },
    { title: "English Movies", key: "english", filter: (item: IContent) => item.language?.toLowerCase() === "english" },
    { title: "Web Series", key: "webseries", filter: (item: IContent) => item.type === "series" || item.category?.toLowerCase() === "web series" },
    { title: "Action Pack", key: "action", filter: (item: IContent) => item.genre?.toLowerCase() === "action" },
    { title: "Drama Movies", key: "drama", filter: (item: IContent) => item.genre?.toLowerCase() === "drama" },
    { title: "Comedy Movies", key: "comedy", filter: (item: IContent) => item.genre?.toLowerCase() === "comedy" },
  ];

  const searchResults = search 
    ? allContent.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase()) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
      )
    : [];

  return (
    <main className="min-h-screen pv-bg">
      <Navbar />

      {loading ? (
        <div className="pv-hero-skeleton">
          <div className="pv-skeleton-logo">
            <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="120" height="40" rx="4" fill="currentColor" className="skeleton-shimmer"/>
            </svg>
          </div>
          <div className="pv-skeleton-hero-content">
            <div className="pv-skeleton-hero-title" />
            <div className="pv-skeleton-hero-meta">
              <div className="pv-skeleton-meta-item" />
              <div className="pv-skeleton-meta-item" />
              <div className="pv-skeleton-meta-item" />
            </div>
            <div className="pv-skeleton-hero-desc">
              <div className="pv-skeleton-desc-line" />
              <div className="pv-skeleton-desc-line" />
              <div className="pv-skeleton-desc-line short" />
            </div>
            <div className="pv-skeleton-hero-buttons">
              <div className="pv-skeleton-btn" />
              <div className="pv-skeleton-btn outline" />
            </div>
          </div>
        </div>
      ) : featuredContent && !search ? (
        <HeroBanner content={featuredContent} />
      ) : null}

      <div className="pv-content">
        {loading ? (
          <div className="pv-rows-container">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="pv-row-skeleton">
                <div className="pv-skeleton-title" />
                <div className="pv-skeleton-cards">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j} className="pv-skeleton-card" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : search ? (
          <div className="pv-search-section">
            <h2 className="pv-section-title">
              Search Results ({searchResults.length})
            </h2>
            {searchResults.length > 0 ? (
              <ContentRow content={searchResults} />
            ) : (
              <p className="pv-no-results">No results found for "{search}"</p>
            )}
          </div>
        ) : (
          <div className="pv-rows-container">
            {categorySections.map((section) => {
              const sectionContent = getContentByCategory(section.filter);
              if (sectionContent.length === 0) return null;
              return (
                <ContentRow 
                  key={section.key} 
                  title={section.title} 
                  content={sectionContent} 
                />
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
