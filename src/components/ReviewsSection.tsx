import { Star } from "lucide-react";

const reviews = [
  { name: "Rajiv M.", rating: 5, text: "After 3 years of knee pain and multiple doctor visits, FM4 therapy completely changed my life. Pain-free in just 45 days!" },
  { name: "Pallavi S.", rating: 5, text: "I was skeptical at first, but the workshop opened my eyes. My neck pain that I had for 5 years is almost gone now." },
  { name: "Mahesh K.", rating: 5, text: "Avoided surgery that 3 doctors recommended. FM4 therapy saved me lakhs and gave me my life back." },
  { name: "Sunita D.", rating: 4, text: "As a working mom, the back pain was unbearable. This workshop taught me simple techniques I can do at home. Highly recommend!" },
  { name: "Amit P.", rating: 5, text: "The personalized assessment was eye-opening. Finally understood the root cause of my 10-year spine problem." },
  { name: "Priya R.", rating: 5, text: "My 68-year-old mother attended the workshop and has shown remarkable improvement in her knee mobility." },
];

const ReviewsSection = () => (
  <section className="bg-section-white py-14 overflow-hidden">
    <div className="container max-w-5xl mb-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-2">
          {[1, 2, 3, 4].map((i) => (
            <Star key={i} className="fill-accent text-accent" size={24} />
          ))}
          <Star className="fill-accent/50 text-accent" size={24} />
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold">
          Rated 4.6 | 1000+ Reviews On Google
        </h2>
      </div>
    </div>

    {/* Scrolling reviews */}
    <div className="relative">
      <div className="flex gap-6 animate-scroll-left" style={{ width: "max-content" }}>
        {[...reviews, ...reviews].map((r, i) => (
          <div key={i} className="bg-card rounded-xl p-5 shadow-sm border w-80 flex-shrink-0">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} className="fill-accent text-accent" size={14} />
              ))}
            </div>
            <p className="text-muted-foreground text-sm mb-3">"{r.text}"</p>
            <p className="font-heading font-bold text-sm">{r.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
