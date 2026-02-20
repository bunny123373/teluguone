"use client";

import { useState } from "react";
import { Film, Upload, X, Database } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import TMDBFetchModal from "./TMDBFetchModal";
import { LANGUAGES, CATEGORIES, GENRES, QUALITIES } from "@/utils/constants";

interface UploadMovieFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function UploadMovieForm({ onSubmit, isLoading }: UploadMovieFormProps) {
  const [formData, setFormData] = useState({
    type: "movie",
    title: "",
    poster: "",
    banner: "",
    description: "",
    year: "",
    language: "",
    category: "",
    genre: "",
    quality: "",
    rating: "",
    tags: [] as string[],
    watchLink: "",
    downloadLink: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [showTMDbModal, setShowTMDbModal] = useState(false);

  const handleTMDBFetch = (result: {
    title: string;
    poster: string;
    backdrop: string;
    description: string;
    year: string;
    rating: number;
    genres: string[];
    category: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      title: result.title,
      poster: result.poster,
      banner: result.backdrop,
      description: result.description,
      year: result.year,
      rating: result.rating.toString(),
      genre: result.genres[0] || "",
      category: result.category || "",
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      rating: formData.rating ? parseFloat(formData.rating) : undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#161f2e] rounded-lg p-4 sm:p-6 space-y-6 border border-gray-800"
    >
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#00a8e1] flex items-center justify-center">
          <Film className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-white">Upload Movie</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Title */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter movie title"
            required
            className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00a8e1]"
          />
          <button
            type="button"
            onClick={() => setShowTMDbModal(true)}
            className="absolute right-0 top-0 flex items-center gap-1 text-xs text-[#00a8e1] hover:text-[#00b9f1]"
          >
            <Database className="w-3 h-3" />
            Auto-fill
          </button>
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Year</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="e.g., 2024"
            className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00a8e1]"
          />
        </div>

        {/* Poster URL */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Poster URL *</label>
          <input
            type="url"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            placeholder="https://example.com/poster.jpg"
            required
            className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00a8e1]"
          />
        </div>

        {/* Banner URL */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Banner URL</label>
          <input
            type="url"
            name="banner"
            value={formData.banner}
            onChange={handleChange}
            placeholder="https://example.com/banner.jpg"
            className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00a8e1]"
          />
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:border-[#00a8e1]"
          >
            <option value="">Select Language</option>
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:border-[#00a8e1]"
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Genre</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:border-[#00a8e1]"
          >
            <option value="">Select Genre</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Quality */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Quality</label>
          <select
            name="quality"
            value={formData.quality}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:border-[#00a8e1]"
          >
            <option value="">Select Quality</option>
            {QUALITIES.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Rating (0-10)</label>
          <input
            type="number"
            name="rating"
            min="0"
            max="10"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            placeholder="e.g., 8.5"
            className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00a8e1]"
          />
        </div>

        {/* Watch Link */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Watch Link (MP4/M3U8)</label>
          <input
            type="url"
            name="watchLink"
            value={formData.watchLink}
            onChange={handleChange}
            placeholder="https://example.com/video.mp4"
            className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00a8e1]"
          />
        </div>

        {/* Download Link */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Download Link *</label>
          <input
            type="url"
            name="downloadLink"
            value={formData.downloadLink}
            onChange={handleChange}
            placeholder="https://drive.google.com/..."
            required
            className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00a8e1]"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Enter movie description..."
          className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00a8e1] resize-none"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Tags</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
            placeholder="Add a tag and press Enter"
            className="flex-1 px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00a8e1]"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2.5 bg-[#222] hover:bg-[#333] text-white rounded-md border border-gray-700 transition-all"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-[#00a8e1] text-white text-sm rounded-md flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-red-300"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00a8e1] hover:bg-[#00b9f1] text-white font-semibold rounded-md transition-all w-full sm:w-auto disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Upload Movie
            </>
          )}
        </button>
      </div>

      <TMDBFetchModal
        isOpen={showTMDbModal}
        onClose={() => setShowTMDbModal(false)}
        onFetch={handleTMDBFetch}
        mediaType="movie"
      />
    </form>
  );
}
