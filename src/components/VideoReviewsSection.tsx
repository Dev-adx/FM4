import React, { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import kamalImg from "@/assets/kamal.webp";
import maheshImg from "@/assets/mahesh.webp";
import pallaviImg from "@/assets/pallavi.webp";
import ankitImg from "@/assets/ankit.webp";
import arthiImg from "@/assets/arthi.webp";
import rajivImg from "@/assets/rajiv.webp";
import fm4Img from "@/assets/fm4.webp";

const videos = [
  { id: "qbaYAi_4ewQ", type: "youtube", cover: kamalImg },
  { id: "S_Zf0N5tNFM", type: "youtube", cover: maheshImg },
  { id: "Hrf9OBixQxg", type: "youtube", cover: pallaviImg },
  { id: "adULn_sS3Qk", type: "youtube", cover: ankitImg },
  { id: "xcHecw4LR7I", type: "youtube", cover: arthiImg },
  { id: "lUb8YMY-0l0", type: "youtube", cover: rajivImg },
  { id: "NzDIfxfSO3I", type: "youtube", cover: fm4Img },
];

const VideoCard = ({ v, isPlaying, onPlay, onStop }: { v: (typeof videos)[0]; isPlaying: boolean; onPlay: () => void; onStop: () => void }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const videoSrc = v.type === "drive"
    ? `https://drive.google.com/file/d/${v.id}/preview`
    : v.type === "youtube"
    ? `https://www.youtube.com/embed/${v.id}?autoplay=1&enablejsapi=1&rel=0`
    : `https://player.vimeo.com/video/${v.id}?h=${(v as any).hash}&autoplay=1&title=0&byline=0&portrait=0`;

  // Subscribe to YouTube events once the iframe loads
  const handleIframeLoad = () => {
    if (v.type !== "youtube") return;
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "listening" }),
      "https://www.youtube.com"
    );
  };

  // Detect pause (2) or end (0) from YouTube and return to cover
  useEffect(() => {
    if (!isPlaying || v.type !== "youtube") return;
    const handler = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") return;
      try {
        const data = JSON.parse(event.data as string);
        if (data.event === "onStateChange" && (data.info === 0 || data.info === 2)) {
          onStop();
        }
      } catch {}
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [isPlaying, v.type, onStop]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg bg-black">
      {/* 16:9 container */}
      <div className="relative" style={{ paddingTop: "56.25%" }}>
        {isPlaying ? (
          <div className="absolute inset-0">
            <iframe
              ref={iframeRef}
              key={v.id}
              src={videoSrc}
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: "none" }}
              allow="autoplay; fullscreen; picture-in-picture; playsinline"
              allowFullScreen
              onLoad={handleIframeLoad}
            />
            {/* Close button */}
            <button
              onClick={onStop}
              className="absolute top-2 right-2 z-10 w-8 h-8 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div
            className="absolute top-0 left-0 w-full h-full cursor-pointer group"
            onClick={onPlay}
          >
            <img
              src={v.cover}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            {/* Play button — matches hero section style */}
            <button
              aria-label="Play video"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all duration-200 pointer-events-none"
            >
              <Play className="text-primary ml-1" size={28} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const VideoReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [desktopPlayingIndex, setDesktopPlayingIndex] = useState<number | null>(null);
  const [mobilePlayingIndex, setMobilePlayingIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [overlayPointerEvents, setOverlayPointerEvents] = useState<"auto" | "none">("auto");
  const minSwipeDistance = 50;

  const handleDesktopPlay = (index: number) => {
    setDesktopPlayingIndex(index);
  };

  const handleDesktopStop = () => {
    setDesktopPlayingIndex(null);
  };

  const handleMobilePlay = (index: number) => {
    setMobilePlayingIndex(index);
    setOverlayPointerEvents("none");
  };

  const handleMobileStop = () => {
    setMobilePlayingIndex(null);
    setOverlayPointerEvents("auto");
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const passThrough = () => {
    setOverlayPointerEvents("none");
    setTimeout(() => setOverlayPointerEvents("auto"), 500);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      passThrough();
      return;
    }
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      passThrough();
    }
  };

  return (
    <section className="bg-section-white pt-5 pb-6">
      <div className="container max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-8">
          Healthy &amp; Happy Client{" "}
          <span className="text-primary">Success Reviews</span>
        </h2>

        {/* Desktop: 2-column grid, more space */}
        <div className="hidden md:block space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-6">
            {videos.slice(0, 2).map((v, i) => <VideoCard key={i} v={v} isPlaying={desktopPlayingIndex === i} onPlay={() => handleDesktopPlay(i)} onStop={handleDesktopStop} />)}
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-6">
            {videos.slice(2, 4).map((v, i) => <VideoCard key={i} v={v} isPlaying={desktopPlayingIndex === i + 2} onPlay={() => handleDesktopPlay(i + 2)} onStop={handleDesktopStop} />)}
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-6">
            {videos.slice(4, 6).map((v, i) => <VideoCard key={i} v={v} isPlaying={desktopPlayingIndex === i + 4} onPlay={() => handleDesktopPlay(i + 4)} onStop={handleDesktopStop} />)}
          </div>
          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-6">
            {videos.slice(6).map((v, i) => <VideoCard key={i} v={v} isPlaying={desktopPlayingIndex === i + 6} onPlay={() => handleDesktopPlay(i + 6)} onStop={handleDesktopStop} />)}
          </div>
        </div>

        {/* Mobile: single card carousel */}
        <div className="md:hidden">
          <div
            className="overflow-hidden relative"
            style={{ touchAction: "pan-y" }}
          >
            {/* Transparent overlay to capture swipe events over iframes */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 10,
                pointerEvents: overlayPointerEvents,
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            />
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {videos.map((v, i) => (
                <div key={i} className="w-full flex-shrink-0 px-1">
                  <VideoCard v={v} isPlaying={mobilePlayingIndex === i} onPlay={() => handleMobilePlay(i)} onStop={handleMobileStop} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1 mt-4">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to video ${i + 1}`}
                className="flex items-center justify-center p-3"
              >
                <span className={`h-2.5 rounded-full transition-all duration-300 block ${
                  i === currentIndex ? "bg-primary w-6" : "bg-gray-300 w-2.5"
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoReviewsSection;
