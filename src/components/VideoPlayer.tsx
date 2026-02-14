"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Download, 
  Settings,
  PictureInPicture,
  SkipBack,
  SkipForward,
  Loader2
} from "lucide-react";
import Button from "./ui/Button";

interface VideoPlayerProps {
  src?: string;
  sources?: { quality: string; url: string }[];
  downloadLink?: string;
  title?: string;
}

const QUALITIES = ["4K", "1080p", "720p", "480p"];

export default function VideoPlayer({ src, sources, downloadLink, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [currentQuality, setCurrentQuality] = useState("Auto");
  const [error, setError] = useState<string | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  const videoSources = sources && sources.length > 0 
    ? QUALITIES.filter(q => sources.some(s => s.quality === q)).map(q => ({ quality: q, url: sources.find(s => s.quality === q)!.url }))
    : src ? [{ quality: "Auto", url: src }] : [];

  const currentSrc = videoSources.find(s => s.quality === currentQuality)?.url || videoSources[0]?.url || "";

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatDuration = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setIsLoading(false);
      setError("Failed to load video. Please try again.");
    };
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setShowControls(true);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (!video) return;

      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
        case "j":
          e.preventDefault();
          skip(-10);
          break;
        case "ArrowRight":
        case "l":
          e.preventDefault();
          skip(10);
          break;
        case "ArrowUp":
          e.preventDefault();
          adjustVolume(0.1);
          break;
        case "ArrowDown":
          e.preventDefault();
          adjustVolume(-0.1);
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "i":
          e.preventDefault();
          togglePiP();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {
        setError("Unable to play video");
      });
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const adjustVolume = (delta: number) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = Math.max(0, Math.min(1, video.volume + delta));
    video.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const time = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = time;
    setProgress(parseFloat(e.target.value));
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const value = parseFloat(e.target.value);
    video.volume = value;
    video.muted = value === 0;
    setVolume(value);
    setIsMuted(value === 0);
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  const togglePiP = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch (err) {
      console.log("PiP not supported");
    }
  };

  const skipBack = () => skip(-10);
  const skipForward = () => skip(10);

  if (!src) {
    return (
      <div className="relative w-full aspect-video bg-card rounded-2xl flex flex-col items-center justify-center border border-border">
        <div className="text-muted text-lg mb-4">Watch link not available</div>
        {downloadLink && (
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" className="gap-2">
              <Download className="w-4 h-4" />
              Download Instead
            </Button>
          </a>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black rounded-2xl overflow-hidden group"
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onTouchStart={resetControlsTimeout}
    >
      {/* Video Element */}
      <div className="relative w-full aspect-video bg-black">
        <video
          ref={videoRef}
          src={currentSrc}
          className="w-full h-full"
          onClick={togglePlay}
          playsInline
          preload="metadata"
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => { setError(null); videoRef.current?.load(); }} variant="outline">
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Big Play Button Overlay */}
        {!isPlaying && !isLoading && !error && (
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
          >
            <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary transition-transform hover:scale-110 shadow-lg shadow-primary/50">
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div 
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 md:p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Progress Bar */}
        <div className="mb-3 group/progress">
          <div className="relative h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer group-hover/progress:h-2 transition-all">
            <div 
              className="absolute left-0 top-0 h-full bg-primary rounded-full"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between gap-2">
          {/* Left Controls */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Skip Back */}
            <button
              onClick={skipBack}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors hidden sm:flex"
              title="Skip 10s back (J)"
            >
              <SkipBack className="w-5 h-5 text-white" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors"
              title={isPlaying ? "Pause (K)" : "Play (K)"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>

            {/* Skip Forward */}
            <button
              onClick={skipForward}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors hidden sm:flex"
              title="Skip 10s forward (L)"
            >
              <SkipForward className="w-5 h-5 text-white" />
            </button>

            {/* Volume */}
            <div 
              className="relative flex items-center"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <button
                onClick={toggleMute}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                title={isMuted ? "Unmute (M)" : "Mute (M)"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>

              {/* Volume Slider */}
              <div 
                className={`absolute left-full ml-2 flex items-center bg-black/80 rounded-lg p-2 transition-all duration-300 ${
                  showVolumeSlider ? "opacity-100 w-24" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                />
              </div>
            </div>

            {/* Time Display */}
            <div className="text-white text-xs md:text-sm ml-2 font-medium">
              <span className="text-white/90">{formatTime(currentTime)}</span>
              <span className="text-white/50 mx-1">/</span>
              <span className="text-white/70">{formatDuration(duration)}</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Quality Selector */}
            {videoSources.length > 1 && (
              <div className="relative">
                <button
                  onClick={() => setShowQualityMenu(!showQualityMenu)}
                  className="px-2 py-1 rounded-lg hover:bg-white/10 transition-colors text-xs text-white font-medium"
                  title="Quality"
                >
                  {currentQuality}
                </button>
                {showQualityMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg py-1 min-w-[80px]">
                    {videoSources.map((source) => (
                      <button
                        key={source.quality}
                        onClick={() => {
                          setCurrentQuality(source.quality);
                          setShowQualityMenu(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-sm hover:bg-white/10 ${
                          currentQuality === source.quality ? "text-primary" : "text-white"
                        }`}
                      >
                        {source.quality}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PiP */}
            <button
              onClick={togglePiP}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors hidden md:flex"
              title="Picture in Picture (I)"
            >
              <PictureInPicture className="w-5 h-5 text-white" />
            </button>

            {/* Download */}
            {downloadLink && (
              <a
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="Download"
              >
                <Download className="w-5 h-5 text-white" />
              </a>
            )}

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Fullscreen (F)"
            >
              <Maximize className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}