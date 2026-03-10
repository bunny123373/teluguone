"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff, Check } from "lucide-react";

interface SeasonPassButtonProps {
  contentId: string;
  contentTitle: string;
  contentType: string;
}

interface SeasonPassData {
  id: string;
  title: string;
  type: string;
  addedAt: number;
  notifications: boolean;
}

export default function SeasonPassButton({ contentId, contentTitle, contentType }: SeasonPassButtonProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("seasonPass");
    if (stored) {
      const data: SeasonPassData[] = JSON.parse(stored);
      setIsFollowing(data.some(item => item.id === contentId));
    }
  }, [contentId]);

  const handleToggle = () => {
    const stored = localStorage.getItem("seasonPass");
    let data: SeasonPassData[] = stored ? JSON.parse(stored) : [];

    if (isFollowing) {
      data = data.filter(item => item.id !== contentId);
    } else {
      data.push({
        id: contentId,
        title: contentTitle,
        type: contentType,
        addedAt: Date.now(),
        notifications: true
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }

    localStorage.setItem("seasonPass", JSON.stringify(data));
    setIsFollowing(!isFollowing);
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-sm transition-all ${
        isFollowing 
          ? "bg-[#00a8e1] text-white" 
          : showSuccess
            ? "bg-green-600 text-white"
            : "bg-[#222] hover:bg-[#333] text-white border border-white/20"
      }`}
    >
      {showSuccess ? (
        <>
          <Check className="w-4 h-4" />
          Added!
        </>
      ) : isFollowing ? (
        <>
          <Bell className="w-4 h-4" />
          Season Pass
        </>
      ) : (
        <>
          <BellOff className="w-4 h-4" />
          Season Pass
        </>
      )}
    </button>
  );
}
