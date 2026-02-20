"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearch, setTypeFilter, clearFilters } from "@/redux/slices/uiSlice";
import { Search, Menu, X, Film, Tv, Home } from "lucide-react";
import { TYPE_FILTERS } from "@/utils/constants";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { search, typeFilter } = useAppSelector((state) => state.ui);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="pv-navbar">
      <div className="pv-nav-container">
        <div className="pv-nav-left">
          <Link href="/" className="pv-logo">
            <div className="pv-logo-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" fill="#00A8E1"/>
                <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="#fff" strokeWidth="2"/>
                <polygon points="20,18 32,24 20,30" fill="#fff"/>
              </svg>
            </div>
            <span className="pv-logo-text">prime video</span>
          </Link>

          <div className="pv-nav-links">
            <Link href="/" className="pv-nav-link">
              Home
            </Link>
            <Link href="/movie" className="pv-nav-link">
              Movies
            </Link>
            <Link href="/series" className="pv-nav-link">
              TV Shows
            </Link>
          </div>
        </div>

        <div className="pv-nav-right">
          <div className="pv-search-container">
            <Search className="pv-search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="pv-search-input"
            />
            {search && (
              <button
                onClick={() => dispatch(setSearch(""))}
                className="pv-search-clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="pv-menu-btn"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="pv-mobile-menu">
          <div className="pv-mobile-search">
            <Search className="w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="pv-mobile-search-input"
            />
          </div>
          <div className="pv-mobile-links">
            <Link href="/" className="pv-mobile-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/movie" className="pv-mobile-link" onClick={() => setIsMenuOpen(false)}>
              Movies
            </Link>
            <Link href="/series" className="pv-mobile-link" onClick={() => setIsMenuOpen(false)}>
              TV Shows
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
