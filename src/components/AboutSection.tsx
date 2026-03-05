import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import celebrity1 from "@/assets/celebrity-1.webp";
import celebrity2 from "@/assets/celebrity-2.webp";
import celebrity3 from "@/assets/celebrity-3.webp";

const images = [celebrity1, celebrity2, celebrity3];

const AboutSection = () => {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;
      const cardWidth = container.firstElementChild?.clientWidth || container.offsetWidth;
      const nextIndex = (active + 1) % images.length;
      container.scrollTo({ left: cardWidth * nextIndex, behavior: "smooth" });
      setActive(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [active]);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.firstElementChild?.clientWidth || container.offsetWidth;
    setActive(Math.round(container.scrollLeft / cardWidth));
  };

  return (
    <section className="bg-section-white py-14">
      <div className="container max-w-4xl">

        <h2 className="text-2xl md:text-4xl font-heading font-bold text-center mb-10">
          Meet <span className="text-primary">Sourobh Kulkorni</span>
        </h2>

        {/* Row 1: sliding celebs LEFT | text RIGHT */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-14">

          {/* Left: celebrity image carousel */}
          <div>
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden shadow-md min-w-full w-full snap-center flex-shrink-0"
                >
                  <img
                    src={img}
                    alt={`Celebrity ${i + 1}`}
                    className="w-full object-cover"
                    style={{ aspectRatio: "7/10" }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-3">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active === i ? "w-6 bg-primary" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: credentials text */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-lg md:text-xl">
              With 19 years of expertise in the Health &amp; Fitness industry
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sourobh Kulkarni has helped over 10,000 clients overcome chronic pain, including discomfort in the back, neck, and knees, as well as various other mobility challenges.
            </p>
          </div>

        </div>

        {/* Row 2: text LEFT | portrait video RIGHT */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">

          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg md:text-xl">
              Amazing Performer in Fitness Industry 2024
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A solution that's proven effective across a diverse range of clients—from famous celebrities and athletes to busy working professionals, stay-at-home parents, and elderly patients
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              His approach is holistic and non-invasive, offering long-lasting relief without relying on medications, surgeries, or traditional physiotherapy. Sourobh's unique therapy focuses on addressing the root causes of pain, not just masking the symptoms, which is why his methods have earned him a reputation as one of the most successful experts in the health domain.
            </p>
          </div>

          <div className="flex justify-center">
            <div style={{ width: "300px" }}>
              <div
                className="relative rounded-xl overflow-hidden shadow-lg"
                style={{ paddingTop: "177.78%" }}
              >
                <iframe
                  src="https://player.vimeo.com/video/1072068196?h=4c6578adfe&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: "none" }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="About Video"
                />
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <a
          href="#checkout"
          className="block w-full max-w-lg mx-auto bg-cta hover:bg-cta-hover text-cta-foreground rounded-full py-5 px-8 text-center font-heading font-bold text-xl md:text-2xl transition-all duration-300 shadow-cta animate-pulse-slow"
        >
          Book Your Seat For{" "}
          <span className="line-through opacity-70">₹499</span> ₹97
          <ArrowRight className="inline ml-2" size={24} />
          <span className="block text-sm font-body font-normal mt-1 opacity-80">
            100% money back guarantee
          </span>
        </a>

      </div>
    </section>
  );
};

export default AboutSection;
