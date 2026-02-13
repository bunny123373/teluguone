"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, ChevronDown, ChevronUp, Play } from "lucide-react";
import Button from "@/components/ui/Button";
import { ISeason, IEpisode } from "@/models/Content";

interface SeasonEpisodeBuilderProps {
  seasons: ISeason[];
  onChange: (seasons: ISeason[]) => void;
}

export default function SeasonEpisodeBuilder({
  seasons,
  onChange,
}: SeasonEpisodeBuilderProps) {
  const [expandedSeason, setExpandedSeason] = useState<number | null>(0);

  const handleAddSeason = () => {
    const newSeason: ISeason = {
      seasonNumber: seasons.length + 1,
      episodes: [],
    };
    const newSeasons = JSON.parse(JSON.stringify(seasons)) as ISeason[];
    newSeasons.push(newSeason);
    onChange(newSeasons);
    setExpandedSeason(newSeasons.length - 1);
  };

  const handleRemoveSeason = (index: number) => {
    const newSeasons = JSON.parse(JSON.stringify(seasons)) as ISeason[];
    newSeasons.splice(index, 1);
    newSeasons.forEach((s, i) => { s.seasonNumber = i + 1; });
    onChange(newSeasons);
  };

  const handleAddEpisode = (seasonIndex: number) => {
    const newSeasons = JSON.parse(JSON.stringify(seasons)) as ISeason[];
    const newEpisode: IEpisode = {
      episodeNumber: newSeasons[seasonIndex].episodes.length + 1,
      episodeTitle: "",
      watchLink: "",
      downloadLink: "",
      quality: "720p",
    };
    newSeasons[seasonIndex].episodes.push(newEpisode);
    onChange(newSeasons);
  };

  const handleRemoveEpisode = (seasonIndex: number, episodeIndex: number) => {
    const newSeasons = JSON.parse(JSON.stringify(seasons)) as ISeason[];
    newSeasons[seasonIndex].episodes.splice(episodeIndex, 1);
    newSeasons[seasonIndex].episodes.forEach((e, i) => { e.episodeNumber = i + 1; });
    onChange(newSeasons);
  };

  const handleEpisodeChange = (
    seasonIndex: number,
    episodeIndex: number,
    field: keyof IEpisode,
    value: string
  ) => {
    const newSeasons = JSON.parse(JSON.stringify(seasons)) as ISeason[];
    newSeasons[seasonIndex].episodes[episodeIndex] = {
      ...newSeasons[seasonIndex].episodes[episodeIndex],
      [field]: value,
    };
    onChange(newSeasons);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text">Seasons & Episodes</h3>
        <Button type="button" onClick={handleAddSeason} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Season
        </Button>
      </div>

      {seasons.length === 0 && (
        <div className="text-center py-8 bg-background rounded-xl border border-dashed border-border">
          <p className="text-muted">No seasons added yet</p>
          <Button type="button" onClick={handleAddSeason} variant="outline" className="mt-2">
            Add First Season
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {seasons.map((season, seasonIndex) => (
          <div
            key={seasonIndex}
            className="bg-background rounded-xl border border-border overflow-hidden"
          >
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() =>
                setExpandedSeason(expandedSeason === seasonIndex ? null : seasonIndex)
              }
            >
              <div className="flex items-center gap-3">
                {expandedSeason === seasonIndex ? (
                  <ChevronUp className="w-5 h-5 text-muted" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted" />
                )}
                <span className="font-medium text-text">
                  Season {season.seasonNumber}
                </span>
                <span className="text-sm text-muted">
                  ({season.episodes.length} episodes)
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveSeason(seasonIndex);
                }}
                className="p-1.5 rounded-lg hover:bg-red-500/20 text-muted hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <AnimatePresence>
              {expandedSeason === seasonIndex && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border"
                >
                  <div className="p-4 space-y-4">
                    {season.episodes.length === 0 && (
                      <p className="text-muted text-sm text-center py-4">
                        No episodes in this season
                      </p>
                    )}

                    {season.episodes.map((episode, episodeIndex) => (
                      <div
                        key={episodeIndex}
                        className="bg-card rounded-xl p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                              <Play className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-medium text-text">
                              Episode {episode.episodeNumber}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveEpisode(seasonIndex, episodeIndex)
                            }
                            className="p-1.5 rounded-lg hover:bg-red-500/20 text-muted hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Episode Title"
                            value={episode.episodeTitle}
                            onChange={(e) =>
                              handleEpisodeChange(
                                seasonIndex,
                                episodeIndex,
                                "episodeTitle",
                                e.target.value
                              )
                            }
                            className="px-3 py-2 rounded-lg bg-background border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                          />
                          <select
                            value={episode.quality}
                            onChange={(e) =>
                              handleEpisodeChange(
                                seasonIndex,
                                episodeIndex,
                                "quality",
                                e.target.value
                              )
                            }
                            className="px-3 py-2 rounded-lg bg-background border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                          >
                            <option value="480p">480p</option>
                            <option value="720p">720p</option>
                            <option value="1080p">1080p</option>
                            <option value="4K">4K</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Watch Link (MP4/M3U8)"
                            value={episode.watchLink}
                            onChange={(e) =>
                              handleEpisodeChange(
                                seasonIndex,
                                episodeIndex,
                                "watchLink",
                                e.target.value
                              )
                            }
                            className="px-3 py-2 rounded-lg bg-background border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Download Link"
                            value={episode.downloadLink}
                            onChange={(e) =>
                              handleEpisodeChange(
                                seasonIndex,
                                episodeIndex,
                                "downloadLink",
                                e.target.value
                              )
                            }
                            className="px-3 py-2 rounded-lg bg-background border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      onClick={() => handleAddEpisode(seasonIndex)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Episode
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
