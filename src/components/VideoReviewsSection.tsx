import React, { useState } from "react";
import fm4Image from "@/assets/fm4.webp";
import maheshImage from "@/assets/mahesh.webp";
import pallaviImage from "@/assets/pallavi.webp";
import ankitImage from "@/assets/ankit.webp";
import arthiImage from "@/assets/arthi.webp";
import rajivImage from "@/assets/rajiv.webp";
import kamalImage from "@/assets/kamal.webp";

const videos = [
  { id: "16WYlBUUHHkZwnHRgeUpa5OxHNpg6cSJJ", type: "drive" },
  { id: "1oHTMJeo2kgn1w1ygYlX2caYDNIN3MF_L", type: "drive" },
  { id: "1fOdFeIfxdNX9SJEi_Ql9rvrqNf3toHe0", type: "drive"},
  { id: "1BF2ZmCDecx6x02oay2awLXMMJEPeuk_4", type: "drive"},
  { id: "1f1AdcCFpgmA7VnVAKK9uofPIQ5z4HwvB", type: "drive" },
  { id: "1uSX7lKwJUS_dwBr72lHkNqjIUJKwr8ZG", type: "drive"},
];

const VideoCard = ({ v }: { v: (typeof videos)[0] }) => {
  const videoSrc = v.type === "drive" 
    ? `https://drive.google.com/file/d/${v.id}/preview`
    : `https://player.vimeo.com/video/${v.id}?h=${(v as any).hash}&autoplay=1&title=0&byline=0&portrait=0`;

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg bg-[#1a2e3d]">
      {/* 16:9 container - video shown directly */}
      <div className="relative" style={{ paddingTop: "56.25%" }}>
        <iframe
          src={videoSrc}
          className="absolute top-0 left-0 w-full h-full"
          style={{ border: "none" }}
          allow="autoplay; fullscreen; picture-in-picture; playsinline"
          allowFullScreen
        />
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
