import React, { useState } from "react";
import kamalImg from "@/assets/kamal.webp";
import maheshImg from "@/assets/mahesh.webp";
import pallaviImg from "@/assets/pallavi.webp";
import ankitImg from "@/assets/ankit.webp";
import arthiImg from "@/assets/arthi.webp";
import rajivImg from "@/assets/rajiv.webp";
import fm4Img from "@/assets/fm4.webp";

const videos = [
  { id: "qbaYAi_4ewQ", type: "youtube", cover: kamalImg, name: "Kamal Gupta" },
  { id: "S_Zf0N5tNFM", type: "youtube", cover: maheshImg, name: "Mahesh" },
  { id: "Hrf9OBixQxg", type: "youtube", cover: pallaviImg, name: "Pallavi" },
  { id: "adULn_sS3Qk", type: "youtube", cover: ankitImg, name: "Ankit" },
  { id: "xcHecw4LR7I", type: "youtube", cover: arthiImg, name: "Aarti" },
  { id: "lUb8YMY-0l0", type: "youtube", cover: rajivImg, name: "Rajiv" },
  { id: "NzDIfxfSO3I", type: "youtube", cover: fm4Img, name: "FM4" },
];

const VideoCard = ({ v }: { v: (typeof videos)[0] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const videoSrc = v.type === "drive" 
    ? `https://drive.google.com/file/d/${v.id}/preview`
    : v.type === "youtube"
    ? `https://www.youtube.com/embed/${v.id}?autoplay=1`
    : `https://player.vimeo.com/video/${v.id}?h=${(v as any).hash}&autoplay=1&title=0&byline=0&portrait=0`;

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg bg-[#1a2e3d]">
      {/* 16:9 container - video shown directly */}
      <div className="relative" style={{ paddingTop: "56.25%" }}>
        {isPlaying ? (
          <iframe
            src={videoSrc}
            className="absolute top-0 left-0 w-full h-full"
            style={{ border: "none" }}
            allow="autoplay; fullscreen; picture-in-picture; playsinline"
            allowFullScreen
          />
        ) : (
          <div 
            className="absolute top-0 left-0 w-full h-full cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            <img 
              src={v.cover} 
              alt={v.name}
              className="w-full h-full object-cover"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[#1a2e3d] ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            {/* Name badge */}
            <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded-full">
              <span className="text-white text-sm font-medium">{v.name}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const VideoReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [overlayPointerEvents, setOverlayPointerEvents] = useState<"auto" | "none">("auto");
  const minSwipeDistance = 50;

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
            {videos.slice(0, 2).map((v, i) => <VideoCard key={i} v={v} />)}
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-6">
            {videos.slice(2, 4).map((v, i) => <VideoCard key={i} v={v} />)}
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-6">
            {videos.slice(4, 6).map((v, i) => <VideoCard key={i} v={v} />)}
          </div>
          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-6">
            {videos.slice(6).map((v, i) => <VideoCard key={i} v={v} />)}
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
                  <VideoCard v={v} />
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
