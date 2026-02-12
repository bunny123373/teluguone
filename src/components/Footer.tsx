"use client";

import Link from "next/link";
import { Film, Heart, Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TeluguDB
              </span>
            </Link>
            <p className="text-muted text-sm max-w-md mb-4">
              Your ultimate destination for Telugu movies and web series. 
              Stream and download the latest content in high quality.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-background flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-background flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-background flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-text font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted hover:text-primary transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/?type=movie"
                  className="text-muted hover:text-primary transition-colors text-sm"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/?type=series"
                  className="text-muted hover:text-primary transition-colors text-sm"
                >
                  Web Series
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-muted hover:text-primary transition-colors text-sm"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-text font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-muted text-sm">Trending</span>
              </li>
              <li>
                <span className="text-muted text-sm">Latest</span>
              </li>
              <li>
                <span className="text-muted text-sm">Dubbed</span>
              </li>
              <li>
                <span className="text-muted text-sm">Action</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            © 2024 TeluguDB. All rights reserved.
          </p>
          <p className="text-muted text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary" fill="#FF2E63" /> for movie lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
