"use client";

import Image from "next/image";
import { Edit2, Trash2, Film, Tv } from "lucide-react";
import { IContent } from "@/models/Content";

interface AdminContentTableProps {
  content: IContent[];
  onEdit: (item: IContent) => void;
  onDelete: (item: IContent) => void;
}

export default function AdminContentTable({
  content,
  onEdit,
  onDelete,
}: AdminContentTableProps) {
  if (content.length === 0) {
    return (
      <div className="text-center py-12 bg-[#161f2e] rounded-lg border border-gray-800">
        <p className="text-gray-400">No content found</p>
      </div>
    );
  }

  return (
    <div className="bg-[#161f2e] rounded-lg overflow-hidden border border-gray-800">
      {/* Desktop Table */}
      <div className="hidden md:overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#0d1117] border-b border-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Poster
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Language
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Created
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {content.map((item) => (
              <tr
                key={item._id.toString()}
                className="hover:bg-[#1f293a] transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="relative w-12 h-16 rounded overflow-hidden">
                    <Image
                      src={item.poster}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-white font-medium line-clamp-1">
                      {item.title}
                    </p>
                    {item.year && (
                      <p className="text-gray-500 text-sm">{item.year}</p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.type === "movie" 
                      ? "bg-[#00a8e1] text-white" 
                      : "bg-[#e50914] text-white"
                  }`}>
                    {item.type === "movie" ? "Movie" : "Series"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-300 text-sm">
                  {item.language || "-"}
                </td>
                <td className="px-4 py-3 text-gray-300 text-sm">
                  {item.category || "-"}
                </td>
                <td className="px-4 py-3 text-gray-500 text-sm">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 bg-[#222] hover:bg-[#333] text-white rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded transition-colors"
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

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3 p-4">
        {content.map((item) => (
          <div
            key={item._id.toString()}
            className="flex gap-4 p-3 bg-[#0d1117] rounded-lg border border-gray-800"
          >
            <div className="relative w-20 h-28 rounded overflow-hidden flex-shrink-0">
              <Image
                src={item.poster}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium truncate">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.year}</p>
              <div className="flex gap-2 mt-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  item.type === "movie" 
                    ? "bg-[#00a8e1] text-white" 
                    : "bg-[#e50914] text-white"
                }`}>
                  {item.type === "movie" ? "Movie" : "Series"}
                </span>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 bg-[#222] hover:bg-[#333] text-white rounded"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
