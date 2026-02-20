"use client";

import { useState, useEffect } from "react";
import { Search, X, Film, Tv, Star } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  searchTMDB,
  getMovieDetails,
  getTvDetails,
  getPosterUrl,
  getBackdropUrl,
  getYearFromDate,
  mapGenreToApp,
  inferCategory,
  TMDBSearchResult,
  TMDBMovieDetails,
  TMDBTvDetails,
} from "@/lib/tmdb";

interface TMDBResult {
  title: string;
  poster: string;
  backdrop: string;
  description: string;
  year: string;
  rating: number;
  genres: string[];
  category: string;
  type: "movie" | "tv";
}

interface TMDBFetchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFetch: (result: TMDBResult) => void;
  mediaType: "movie" | "tv";
}

export default function TMDBFetchModal({
  isOpen,
  onClose,
  onFetch,
  mediaType,
}: TMDBFetchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TMDBSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [fetchingDetails, setFetchingDetails] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    try {
      const data = await searchTMDB(query, mediaType);
      setResults(data.results.slice(0, 10));
    } catch (error) {
      console.error("TMDB search error:", error);
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      setSearching(true);
      searchTMDB(query, mediaType)
        .then((data) => {
          setResults(data.results.slice(0, 10));
        })
        .catch((err) => {
          console.error("TMDB search error:", err);
          setResults([]);
        })
        .finally(() => {
          setSearching(false);
        });
    }, 1000);
    return () => clearTimeout(timer);
  }, [query, mediaType]);

  const handleSelect = async (result: TMDBSearchResult) => {
    setSelectedId(result.id);
    setFetchingDetails(true);
    try {
      let details: TMDBMovieDetails | TMDBTvDetails;
      if (result.media_type === "movie" || mediaType === "movie") {
        details = await getMovieDetails(result.id);
      } else {
        details = await getTvDetails(result.id);
      }

      const year =
        "release_date" in details
          ? getYearFromDate(details.release_date)
          : getYearFromDate(details.first_air_date);

      const genres = details.genres.map((g) => mapGenreToApp(g.name));
      const countryCode = details.production_countries?.[0]?.iso_3166_1;
      const category = inferCategory(mediaType, genres, countryCode);

      const tmdbResult: TMDBResult = {
        title: "title" in details ? details.title : details.name,
        poster: getPosterUrl(details.poster_path, "w500") || "",
        backdrop: getBackdropUrl(details.backdrop_path, "w780") || "",
        description: details.overview,
        year,
        rating: details.vote_average,
        genres,
        category,
        type: mediaType,
      };

      onFetch(tmdbResult);
      onClose();
    } catch (error) {
      console.error("TMDB details error:", error);
    } finally {
      setFetchingDetails(false);
      setSelectedId(null);
    }
  };

  const handleClose = () => {
    setQuery("");
    setResults([]);
    setSelectedId(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Search TMDB">
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder={`Search ${mediaType === "movie" ? "movies" : "TV series"}...`}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button type="button" onClick={handleSearch} variant="outline" size="sm">
            Search
          </Button>
        </div>

        {searching && (
          <div className="text-center py-4 text-muted">Searching...</div>
        )}

        <div className="max-h-96 overflow-y-auto space-y-2">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleSelect(result)}
              disabled={fetchingDetails}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors text-left disabled:opacity-50"
            >
              {result.poster_path ? (
                <img
                  src={getPosterUrl(result.poster_path)}
                  alt={result.title || result.name}
                  className="w-12 h-16 object-cover rounded-lg"
                />
              ) : (
                <div className="w-12 h-16 bg-muted rounded-lg flex items-center justify-center">
                  {result.media_type === "movie" ? (
                    <Film className="w-6 h-6 text-muted-foreground" />
                  ) : (
                    <Tv className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text truncate">
                  {result.title || result.name}
                </h4>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <span>
                    {result.release_date?.split("-")[0] ||
                      result.first_air_date?.split("-")[0] ||
                      "N/A"}
                  </span>
                  {result.vote_average > 0 && (
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      {result.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>
                {result.overview && (
                  <p className="text-xs text-muted truncate mt-1">
                    {result.overview}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {results.length === 0 && query.length >= 2 && !searching && (
          <div className="text-center py-4 text-muted">
            No results found. Try a different search term.
          </div>
        )}

        {query.length < 2 && !searching && (
          <div className="text-center py-4 text-muted">
            Enter at least 2 characters to search
          </div>
        )}
      </div>
    </Modal>
  );
}
