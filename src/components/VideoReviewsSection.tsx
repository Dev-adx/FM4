import { useState } from "react";
import { Mic } from "lucide-react";

const videos = [
  { id: "1037391319", hash: "90c39e7abf", tag: "FM4 Therapy", name: "" },
  { id: "1037337143", hash: "cd71981f29", tag: "Neck Pain", name: "Mahesh" },
  { id: "1037337766", hash: "23bc18ac1c", tag: "Knee Pain", name: "Pallavi" },
  { id: "1036989531", hash: "bdcfbbf55e", tag: "Neck Pain", name: "Ankit Nirav" },
  { id: "1036990802", hash: "b559cf8df7", tag: "Knee Pain", name: "Aarti Bhuptani" },
  { id: "1036989280", hash: "61dd3cfc96", tag: "Knee Pain", name: "Rajiv Sawant" },
  { id: "1036989452", hash: "cfca58d257", tag: "Back Pain", name: "" },
];

const VideoCard = ({ v }: { v: (typeof videos)[0] }) => (
  <div className="relative rounded-xl overflow-hidden shadow-lg bg-[#1a2e3d]">
    {/* 16:9 iframe */}
    <div className="relative" style={{ paddingTop: "56.25%" }}>
      <iframe
        src={`https://player.vimeo.com/video/${v.id}?h=${v.hash}&title=0&byline=0&portrait=0`}
        className="absolute top-0 left-0 w-full h-full"
        style={{ border: "none" }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={v.tag}
      />
    </div>
    {/* Yellow tag */}
    <div className="absolute top-3 left-3 bg-cta text-cta-foreground text-xs font-heading font-bold px-3 py-1 rounded">
      {v.tag}
    </div>
    {/* Name + mic */}
    {v.name && (
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-gradient-to-t from-black/60 to-transparent">
        <span className="text-white text-xs font-heading font-semibold">{v.name}</span>
        <Mic className="text-white" size={14} />
      </div>
    )}
  </div>
);

const VideoReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
          <div className="overflow-hidden">
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
