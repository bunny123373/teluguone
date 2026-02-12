"use client";

import { useEffect, useState } from 'react';

interface LoadingProviderProps {
  children: React.ReactNode;
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent flash of unstyled content
    const html = document.documentElement;
    const body = document.body;

    // Add loading classes immediately
    html.classList.add('loading');
    body.classList.add('font-loading');

    // Simulate minimum loading time for smooth UX
    const minimumLoadTime = 300;
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumLoadTime - elapsedTime);

      setTimeout(() => {
        // Remove loading classes
        html.classList.remove('loading');
        html.classList.add('loaded');
        body.classList.remove('font-loading');
        body.classList.add('loaded', 'font-loaded');
        
        // Add smooth transitions to all elements
        document.querySelectorAll('*').forEach(el => {
          if (el instanceof HTMLElement) {
            el.classList.add('instant-load');
          }
        });

        setIsLoading(false);
      }, remainingTime);
    };

    // Check if already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Add global smooth interactions
  useEffect(() => {
    const addSmoothClasses = () => {
      // Add smooth classes to interactive elements
      const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, select, textarea');
      interactiveElements.forEach(el => {
        el.classList.add('global-smooth', 'gpu-accelerated');
      });

      // Add smooth hover to cards
      const cards = document.querySelectorAll('[class*="card"], [class*="Card"]');
      cards.forEach(el => {
        el.classList.add('smooth-hover', 'gpu-accelerated');
      });

      // Add smooth scrollbar to scrollable elements
      const scrollableElements = document.querySelectorAll('body, [class*="overflow"]');
      scrollableElements.forEach(el => {
        el.classList.add('smooth-scrollbar');
      });
    };

    // Run after DOM is ready
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      addSmoothClasses();
    } else {
      document.addEventListener('DOMContentLoaded', addSmoothClasses);
    }

    // Add classes dynamically for new elements
    const observer = new MutationObserver(() => {
      addSmoothClasses();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center preserve-layout">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-accent/30 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <div className="text-muted text-sm animate-fade-in">Loading...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}