import { useState } from "react";
import { Star } from "lucide-react";
import googleLogo from "@/assets/google.webp";

const reviews = [
  { name: "Sunil Vaidya", rating: 5, text: "Sunil Vaidya, 64, from the food business, attended saurabh sir's workshop for knee pain. the process was excellent, and the suggested exercises brought 100% relief. highly recommend!" },
  { name: "Rajiv M.", rating: 5, text: "After 3 years of knee pain and multiple doctor visits, FM4 therapy completely changed my life. Pain-free in just 45 days!" },
  { name: "Pallavi S.", rating: 5, text: "I was skeptical at first, but the workshop opened my eyes. My neck pain that I had for 5 years is almost gone now." },
  { name: "Mahesh K.", rating: 5, text: "Avoided surgery that 3 doctors recommended. FM4 therapy saved me lakhs and gave me my life back." },
  { name: "Sunita D.", rating: 4, text: "As a working mom, the back pain was unbearable. This workshop taught me simple techniques I can do at home. Highly recommend!" },
  { name: "Amit P.", rating: 5, text: "The personalized assessment was eye-opening. Finally understood the root cause of my 10-year spine problem." },
];

const ReviewCard = ({ review }: { review: (typeof reviews)[0] }) => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center relative">
    {/* Google logo top-left */}
    <div className="absolute top-4 left-4">
      <img src={googleLogo} alt="Google" className="h-7 w-auto object-contain" />
    </div>

    {/* Avatar */}
    <div className="w-16 h-16 rounded-full bg-[#9e7c6b] flex items-center justify-center mb-3 mt-2">
      <span className="text-white font-heading font-bold text-2xl">
        {review.name.charAt(0)}
      </span>
    </div>

    <p className="font-heading font-bold text-base mb-1">{review.name}</p>

    {/* Stars */}
    <div className="flex justify-center gap-0.5 mb-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={20}
          className={i <= review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}
        />
      ))}
    </div>

    <p className="font-body text-sm text-muted-foreground leading-relaxed">{review.text}</p>
  </div>
);

const ReviewsSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-section-white py-14">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-1">
            <p className="font-heading font-bold text-xl md:text-2xl">
              Rated <span className="text-yellow-400">4.6</span>
            </p>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} size={22} className="fill-yellow-400 text-yellow-400" />
              ))}
              <Star size={22} className="fill-yellow-400/50 text-yellow-400/50" />
            </div>
          </div>
          <p className="font-heading font-bold text-xl md:text-2xl">
            1000+ Review On <span className="text-primary">Google Reviews</span>
          </p>
        </div>

        {/* Desktop: 3-column static grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>

        {/* Mobile: single card carousel */}
        <div className="md:hidden px-4">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {reviews.map((r, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <ReviewCard review={r} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? "bg-primary w-6" : "bg-gray-300 w-2.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
