"use client";

import Image from "next/image";
import { Edit2, Trash2, Film, Tv } from "lucide-react";
import { IContent } from "@/models/Content";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/utils/formatDate";

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
      <div className="text-center py-12 bg-card rounded-2xl border border-border">
        <p className="text-muted">No content found</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted">
                Poster
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted">
                Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted">
                Language
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted">
                Created
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {content.map((item) => (
              <tr
                key={item._id.toString()}
                className="hover:bg-background/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="relative w-12 h-16 rounded-lg overflow-hidden">
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
                    <p className="text-text font-medium line-clamp-1">
                      {item.title}
                    </p>
                    {item.year && (
                      <p className="text-muted text-sm">{item.year}</p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {item.type === "movie" ? (
                      <>
                        <Film className="w-4 h-4 text-primary" />
                        <span className="text-text text-sm">Movie</span>
                      </>
                    ) : (
                      <>
                        <Tv className="w-4 h-4 text-secondary" />
                        <span className="text-text text-sm">Series</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-text text-sm">
                    {item.language || "-"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="default" className="text-xs">
                    {item.category || "-"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <span className="text-muted text-sm">
                    {formatDate(item.createdAt)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 rounded-lg hover:bg-primary/20 text-muted hover:text-primary transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-muted hover:text-red-500 transition-colors"
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

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-border">
        {content.map((item) => (
          <div
            key={item._id.toString()}
            className="p-4 flex gap-4"
          >
            <div className="relative w-20 h-28 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.poster}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text font-medium line-clamp-1">{item.title}</p>
              {item.year && <p className="text-muted text-sm">{item.year}</p>}
              <div className="flex items-center gap-2 mt-1">
                {item.type === "movie" ? (
                  <Film className="w-4 h-4 text-primary" />
                ) : (
                  <Tv className="w-4 h-4 text-secondary" />
                )}
                <span className="text-text text-sm capitalize">{item.type}</span>
              </div>
              <p className="text-muted text-sm mt-1">{item.language || "-"}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 rounded-lg hover:bg-primary/20 text-muted hover:text-primary transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(item)}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-muted hover:text-red-500 transition-colors"
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
