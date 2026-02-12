"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { IContent, ISeason } from "@/models/Content";
import { LANGUAGES, CATEGORIES, QUALITIES } from "@/utils/constants";
import SeasonEpisodeBuilder from "./SeasonEpisodeBuilder";

interface EditContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: IContent | null;
  onSave: (data: any) => void;
  isLoading?: boolean;
}

export default function EditContentModal({
  isOpen,
  onClose,
  content,
  onSave,
  isLoading,
}: EditContentModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (content) {
      setFormData({
        ...content,
        rating: content.rating?.toString() || "",
      });
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData((prev: any) => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev: any) => ({
      ...prev,
      tags: prev.tags?.filter((t: string) => t !== tag) || [],
    }));
  };

  const handleSeasonsChange = (seasons: ISeason[]) => {
    setFormData((prev: any) => ({ ...prev, seasons }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { _id, createdAt, updatedAt, __v, ...updateData } = formData;
    onSave({
      ...updateData,
      rating: formData.rating ? parseFloat(formData.rating) : undefined,
    });
  };

  if (!content) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Content" className="max-w-3xl max-h-[90vh]">
      <form onSubmit={handleSubmit} className="space-y-6 overflow-auto max-h-[70vh] pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Title *"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
          <Input
            label="Year"
            name="year"
            value={formData.year || ""}
            onChange={handleChange}
          />
          <Input
            label="Poster URL *"
            name="poster"
            value={formData.poster || ""}
            onChange={handleChange}
            required
          />
          <Input
            label="Banner URL"
            name="banner"
            value={formData.banner || ""}
            onChange={handleChange}
          />

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Language</label>
            <select
              name="language"
              value={formData.language || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select Language</option>
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Category</label>
            <select
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Quality</label>
            <select
              name="quality"
              value={formData.quality || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select Quality</option>
              {QUALITIES.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Rating (0-10)"
            name="rating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={formData.rating || ""}
            onChange={handleChange}
          />

          {formData.type === "movie" && (
            <>
              <Input
                label="Watch Link"
                name="watchLink"
                value={formData.watchLink || ""}
                onChange={handleChange}
              />
              <Input
                label="Download Link"
                name="downloadLink"
                value={formData.downloadLink || ""}
                onChange={handleChange}
              />
            </>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Tags</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              placeholder="Add a tag"
              className="flex-1 px-4 py-2 rounded-xl bg-background border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button type="button" onClick={handleAddTag} variant="outline" size="sm">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags?.map((tag: string) => (
              <Badge key={tag} variant="primary" className="flex items-center gap-1">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {formData.type === "series" && (
          <SeasonEpisodeBuilder
            seasons={formData.seasons || []}
            onChange={handleSeasonsChange}
          />
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
