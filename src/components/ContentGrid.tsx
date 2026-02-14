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
    <section className="py-8">
      <h2 className="text-xl font-bold text-text mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {content.map((item) => (
          <ContentCard key={item._id.toString()} content={item} />
        ))}
      </div>
    </section>
  );
}
