"use client";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-accent/30 rounded-full animate-spin" style={{ animationDelay: "0.15s" }}></div>
        </div>
        <p className="text-muted text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}