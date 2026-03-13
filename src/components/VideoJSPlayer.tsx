"use client";

import { useEffect, useRef, useState } from "react";
import "video.js/dist/video-js.css";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";

interface VideoJSPlayerProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  onEnded?: () => void;
}

export default function VideoJSPlayer({ src, poster, autoplay = false, onEnded }: VideoJSPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered", "vjs-fluid");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, {
        controls: true,
        autoplay: autoplay,
        responsive: true,
        fluid: true,
        playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2],
        sources: [{
          src: src,
          type: getVideoType(src)
        }],
        poster: poster,
        html5: {
          vhs: {
            overrideNative: true
          }
        }
      }, () => {
        videojs.log("player is ready");
      }));

      player.on("ended", () => {
        if (onEnded) onEnded();
      });

      player.on("error", () => {
        setError("Failed to load video");
      });
    } else {
      const player = playerRef.current;
      player.src({ src, type: getVideoType(src) });
      if (poster) player.poster(poster);
    }
  }, [src, poster, autoplay, onEnded]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  const handleRetry = () => {
    setError(null);
    if (playerRef.current) {
      playerRef.current.load();
    }
  };

  if (error) {
    return (
      <div className="relative w-full aspect-video bg-[#0d1117] rounded-2xl flex flex-col items-center justify-center border border-gray-800">
        <div className="text-red-400 text-lg mb-4">{error}</div>
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-[#00a8e1] hover:bg-[#00b9f1] text-white rounded-lg transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div data-vjs-player className="rounded-2xl overflow-hidden">
      <div ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
}

function getVideoType(url: string): string {
  if (url.includes(".mp4")) return "video/mp4";
  if (url.includes(".webm")) return "video/webm";
  if (url.includes(".m3u8")) return "application/x-mpegURL";
  if (url.includes(".ts")) return "video/MP2T";
  return "video/mp4";
}
