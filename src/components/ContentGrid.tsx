"use client";

import { IContent } from "@/models/Content";
import ContentCard from "./ContentCard";

interface ContentGridProps {
  title: string;
  content: IContent[];
  emptyMessage?: string;
}

export default function ContentGrid({
  title,
  content,
  emptyMessage = "No content available",
}: ContentGridProps) {
  if (content.length === 0) {
    return null;
  }

  return (
    <section>
      {title && <h2 className="text-lg sm:text-xl font-bold text-text mb-3 sm:mb-4">{title}</h2>}
      <div className="grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        {content.map((item) => (
          <ContentCard key={item._id.toString()} content={item} />
        ))}
      </div>
    </section>
  );
}
