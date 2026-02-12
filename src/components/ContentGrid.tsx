"use client";

import { motion } from "framer-motion";
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
    return (
      <section className="py-8">
        <h2 className="text-xl font-bold text-text mb-6">{title}</h2>
        <div className="text-center py-12 text-muted">{emptyMessage}</div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-xl font-bold text-text mb-6"
      >
        {title}
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {content.map((item, index) => (
          <motion.div
            key={item._id.toString()}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="gpu-accelerated"
          >
            <ContentCard content={item} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
