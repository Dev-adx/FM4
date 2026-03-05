import React, { useState } from "react";
import { Mic, Play } from "lucide-react";
import fm4Image from "@/assets/fm4.webp";
import maheshImage from "@/assets/mahesh.webp";
import pallaviImage from "@/assets/pallavi.webp";
import ankitImage from "@/assets/ankit.webp";
import arthiImage from "@/assets/arthi.webp";
import rajivImage from "@/assets/rajiv.webp";
import kamalImage from "@/assets/kamal.webp";

const videos = [
  { id: "1037391319", hash: "90c39e7abf", thumbnail: fm4Image },
  { id: "1037337143", hash: "cd71981f29", thumbnail: maheshImage },
  { id: "1037337766", hash: "23bc18ac1c", thumbnail: pallaviImage },
  { id: "1036989531", hash: "bdcfbbf55e", thumbnail: ankitImage },
  { id: "1036990802", hash: "b559cf8df7", thumbnail: arthiImage },
  { id: "1036989280", hash: "61dd3cfc96", thumbnail: rajivImage },
  { id: "1036989452", hash: "cfca58d257", thumbnail: kamalImage },
];

const VideoCard = ({ v }: { v: (typeof videos)[0] }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg bg-[#1a2e3d]">
      {/* 16:9 container */}
      <div className="relative" style={{ paddingTop: "56.25%" }}>
        {isPlaying ? (
          <iframe
            src={`https://player.vimeo.com/video/${v.id}?h=${v.hash}&autoplay=1&title=0&byline=0&portrait=0`}
            className="absolute top-0 left-0 w-full h-full"
            style={{ border: "none" }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* Cover Image */}
            <div className="absolute top-0 left-0 w-full h-full bg-black">
              {v.thumbnail ? (
                <img
                  src={v.thumbnail}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-[#1a2e3d]" />
              )}
              {/* Play Button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer"
              >
                <Play className="text-primary ml-0.5" size={24} />
              </button>
            </div>
          </>
        )}
      </div>
      {/* Yellow tag */}
      <div className="absolute top-3 left-3 bg-cta text-cta-foreground text-xs font-heading font-bold px-3 py-1 rounded">
      </div>
    </div>
  );
};

const VideoReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="bg-section-white py-14">
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
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
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
          <div className="flex justify-center gap-2 mt-4">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-primary w-6" : "bg-gray-300 w-2.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoReviewsSection;
