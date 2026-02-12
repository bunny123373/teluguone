"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearch, setTypeFilter, clearFilters } from "@/redux/slices/uiSlice";
import { Search, Menu, X, Film, Tv, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TYPE_FILTERS } from "@/utils/constants";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { search, typeFilter } = useAppSelector((state) => state.ui);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TeluguDB
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search movies, series..."
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-card border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
              {search && (
                <button
                  onClick={() => dispatch(setSearch(""))}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted hover:text-text" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {TYPE_FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => dispatch(setTypeFilter(filter.value as any))}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  typeFilter === filter.value
                    ? "bg-primary text-white"
                    : "text-muted hover:text-text hover:bg-card"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-card transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-text" />
            ) : (
              <Menu className="w-6 h-6 text-text" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-card"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search movies, series..."
                  value={search}
                  onChange={(e) => dispatch(setSearch(e.target.value))}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Mobile Filters */}
              <div className="flex flex-wrap gap-2">
                {TYPE_FILTERS.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => {
                      dispatch(setTypeFilter(filter.value as any));
                      setIsMenuOpen(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      typeFilter === filter.value
                        ? "bg-primary text-white"
                        : "text-muted hover:text-text bg-background"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
