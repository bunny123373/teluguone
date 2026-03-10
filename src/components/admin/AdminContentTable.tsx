"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Edit2, Trash2, Search, Filter } from "lucide-react";
import { IContent } from "@/models/Content";

interface AdminContentTableProps {
  content: IContent[];
  onEdit: (item: IContent) => void;
  onDelete: (item: IContent) => void;
  onBulkDelete?: (ids: string[]) => void;
}

export default function AdminContentTable({
  content,
  onEdit,
  onDelete,
  onBulkDelete,
}: AdminContentTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [languageFilter, setLanguageFilter] = useState<string>("all");

  const filteredContent = useMemo(() => {
    return content.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description?.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesLanguage = languageFilter === "all" || item.language === languageFilter;
      return matchesSearch && matchesType && matchesLanguage;
    });
  }, [content, searchQuery, typeFilter, languageFilter]);

  const languages = useMemo(() => {
    const langs = new Set(content.map((item) => item.language).filter(Boolean));
    return Array.from(langs);
  }, [content]);

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredContent.map((item) => item._id.toString())));
    }
    setSelectAll(!selectAll);
  };

  const handleBulkDelete = () => {
    if (selectedIds.size > 0 && onBulkDelete) {
      onBulkDelete(Array.from(selectedIds));
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (content.length === 0) {
    return (
      <div className="text-center py-12 bg-[#161f2e] rounded-lg border border-gray-800">
        <p className="text-gray-400">No content found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0d1117] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00a8e1]"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2.5 rounded-lg bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:border-[#00a8e1]"
          >
            <option value="all">All Types</option>
            <option value="movie">Movies</option>
            <option value="series">Series</option>
          </select>
          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="px-3 py-2.5 rounded-lg bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:border-[#00a8e1]"
          >
            <option value="all">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      {searchQuery && (
        <p className="text-gray-400 text-sm">
          Found {filteredContent.length} of {content.length} items
        </p>
      )}

      {selectedIds.size > 0 && (
        <div className="flex items-center gap-4 p-3 bg-[#161f2e] rounded-lg border border-[#00a8e1]">
          <span className="text-white text-sm">
            {selectedIds.size} item{selectedIds.size > 1 ? "s" : ""} selected
          </span>
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Delete Selected
          </button>
          <button
            onClick={() => {
              setSelectedIds(new Set());
              setSelectAll(false);
            }}
            className="text-gray-400 hover:text-white text-sm"
          >
            Clear Selection
          </button>
        </div>
      )}

      <div className="bg-[#161f2e] rounded-lg overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0d1117] border-b border-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400 w-10">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-600 text-[#00a8e1] focus:ring-[#00a8e1]"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Poster</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Language</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Created</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredContent.map((item) => (
                <tr
                  key={item._id.toString()}
                  className={`hover:bg-[#1f293a] transition-colors ${selectedIds.has(item._id.toString()) ? "bg-[#1f293a]" : ""}`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(item._id.toString())}
                      onChange={() => toggleSelect(item._id.toString())}
                      className="w-4 h-4 rounded border-gray-600 text-[#00a8e1] focus:ring-[#00a8e1]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative w-12 h-16 rounded overflow-hidden">
                      <Image src={item.poster} alt={item.title} fill className="object-cover" unoptimized />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-white font-medium line-clamp-1">{item.title}</p>
                    {item.year && <p className="text-gray-500 text-sm">{item.year}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${item.type === "movie" ? "bg-[#00a8e1] text-white" : "bg-[#e50914] text-white"}`}>
                      {item.type === "movie" ? "Movie" : "Series"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{item.language || "N/A"}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{item.category || "N/A"}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{formatDate(item.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 bg-[#00a8e1]/20 hover:bg-[#00a8e1]/40 text-[#00a8e1] rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(item)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
