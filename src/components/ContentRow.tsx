"use client";

import { useRef } from "react";
import { IContent } from "@/models/Content";
import ContentCard from "./ContentCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ContentRowProps {
  title?: string;
  content: IContent[];
}

export default function ContentRow({ title, content }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = 300;
      rowRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  if (content.length === 0) {
    return null;
  }

  return (
    <div className="pv-row">
      {title && <h2 className="pv-row-title">{title}</h2>}
      
      <div className="pv-row-container">
        <button 
          className="pv-scroll-btn pv-scroll-left" 
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="pv-row-scroll" ref={rowRef}>
          {content.map((item) => (
            <ContentCard key={item._id.toString()} content={item} />
          ))}
        </div>
        
        <button 
          className="pv-scroll-btn pv-scroll-right" 
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
