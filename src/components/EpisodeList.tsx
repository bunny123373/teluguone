"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Download, ChevronDown } from "lucide-react";
import { ISeason, IEpisode } from "@/models/Content";
import Badge from "./ui/Badge";

interface EpisodeListProps {
  seasons: ISeason[];
  currentEpisodeId?: number;
  onEpisodeSelect: (episode: IEpisode) => void;
}

export default function EpisodeList({
  seasons,
  currentEpisodeId,
  onEpisodeSelect,
}: EpisodeListProps) {
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentSeason = seasons[selectedSeason];

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Season Selector */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-background rounded-xl border border-border hover:border-primary/50 transition-colors"
          >
            <span className="text-text font-medium">
              Season {currentSeason?.seasonNumber}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-muted transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-10"
              >
                {seasons.map((season, index) => (
                  <button
                    key={season.seasonNumber}
                    onClick={() => {
                      setSelectedSeason(index);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-background transition-colors first:rounded-t-xl last:rounded-b-xl ${
                      selectedSeason === index ? "bg-background text-primary" : "text-text"
                    }`}
                  >
                    Season {season.seasonNumber}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Episode List */}
      <div className="max-h-[400px] overflow-y-auto">
        {currentSeason?.episodes.map((episode, index) => (
          <motion.div
            key={episode.episodeNumber}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onEpisodeSelect(episode)}
            className={`p-4 border-b border-border last:border-b-0 cursor-pointer hover:bg-background/50 transition-colors ${
              currentEpisodeId === episode.episodeNumber
                ? "bg-primary/10 border-l-4 border-l-primary"
                : ""
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Episode Number */}
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
                <span className="text-text font-semibold">
                  {episode.episodeNumber}
                </span>
              </div>

              {/* Episode Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-text font-medium truncate">
                  {episode.episodeTitle}
                </h4>
                {episode.quality && (
                  <Badge variant="accent" className="mt-1">
                    {episode.quality}
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEpisodeSelect(episode);
                  }}
                  className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Play className="w-4 h-4 text-primary hover:text-white" />
                </button>
                {episode.downloadLink && (
                  <a
                    href={episode.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"
                  >
                    <Download className="w-4 h-4 text-secondary hover:text-white" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
