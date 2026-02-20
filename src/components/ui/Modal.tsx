"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div
            className={cn(
              "fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
              "w-full h-full md:h-auto md:max-h-[90vh] md:w-full md:max-w-lg",
              "bg-card border border-border rounded-none md:rounded-2xl shadow-2xl z-50",
              "flex flex-col",
              className
            )}
          >
            <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
              {title && (
                <h3 className="text-lg font-semibold text-text">{title}</h3>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors ml-auto"
              >
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">{children}</div>
          </div>
        </>
      )}
    </>
  );
}
