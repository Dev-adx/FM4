import { Play, Mic } from "lucide-react";

const row1 = [
  { tag: "Knee Pain", name: "Pallavi" },
  { tag: "FM4 Therapy", name: "" },
  { tag: "Neck Pain", name: "Mahesh" },
];

const row2 = [
  { tag: "Neck Pain", name: "Ankit Nirav" },
  { tag: "Knee Pain", name: "Aarti Bhuptani" },
  { tag: "Knee Pain", name: "Rajiv Sawant" },
];

const VideoCard = ({ tag, name }: { tag: string; name: string }) => (
  <div className="relative rounded-xl overflow-hidden bg-[#2d3f50] aspect-video flex items-center justify-center flex-shrink-0 w-full">
    {/* Yellow tag */}
    <div className="absolute top-3 left-3 bg-cta text-cta-foreground text-xs font-heading font-bold px-3 py-1 rounded">
      {tag}
    </div>

    {/* Play button */}
    <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white flex items-center justify-center">
      <Play className="text-white fill-white ml-1" size={22} />
    </div>

    {/* Bottom bar */}
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-black/30">
      <span className="text-white text-xs font-heading font-medium">{name}</span>
      <Mic className="text-white" size={14} />
    </div>
  </div>
);

const DotsRow = ({ count, active }: { count: number; active: number }) => (
  <div className="flex justify-center gap-2 mt-3">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className={`w-2.5 h-2.5 rounded-full ${i === active ? "bg-primary" : "bg-gray-300"}`}
      />
    ))}
  </div>
);

const VideoReviewsSection = () => (
  <section className="bg-section-white py-14">
    <div className="container max-w-4xl">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-8">
        Healthy &amp; Happy Client{" "}
        <span className="text-primary">Success Reviews</span>
      </h2>

      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-4">
        {row1.map((v, i) => (
          <VideoCard key={i} {...v} />
        ))}
      </div>
      <DotsRow count={3} active={1} />

      {/* Row 2 */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {row2.map((v, i) => (
          <VideoCard key={i} {...v} />
        ))}
      </div>
      <DotsRow count={3} active={2} />
    </div>
  </section>
);

export default VideoReviewsSection;
