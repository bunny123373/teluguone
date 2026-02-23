"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ContentRow from "@/components/ContentRow";
import Footer from "@/components/Footer";
import { IContent } from "@/models/Content";

interface ClientHomeProps {
  allContent: IContent[];
  featuredContent: IContent | null;
}

export default function ClientHome({ allContent, featuredContent }: ClientHomeProps) {
  const { search } = useAppSelector((state) => state.ui);
  
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

      {featuredContent && !search ? (
        <HeroBanner content={featuredContent} />
      ) : null}

      <div className="pv-content">
        {search ? (
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
