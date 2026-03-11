import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import celebrity1 from "@/assets/celebrity-1.webp";
import celebrity2 from "@/assets/celebrity-2.webp";
import celebrity3 from "@/assets/celebrity-3.webp";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";

const images = [celebrity1, celebrity2, celebrity3];

const AboutSection = () => {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { trackEventAllPixels } = useFacebookPixel();

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
    <section className="bg-section-white pt-6 pb-6">
      <div className="container max-w-4xl">

        <h2 className="text-2xl md:text-4xl font-heading font-bold text-center mb-10">
          Meet <span className="text-primary">Sourobh Kulkorni</span>
        </h2>

        {/* Row 1: sliding celebs LEFT | text RIGHT */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-6">

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
            <p className="text-lg md:text-xl leading-relaxed font-semibold">
              Sourobh Kulkorni, one of the India's leading Health &amp; Wellness professional practicing in Pune, boasting of several Fellowships and experience garnered internationally as well as in India.
            </p>
          </div>

        </div>

        {/* Row 2: text LEFT | portrait video RIGHT */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">

          <div className="space-y-5 font-semibold">
            <p className="text-lg md:text-xl leading-relaxed">
              He holds multiple degrees and certifications in fitness and wellness as well as in rehab, demonstrating his extensive expertise in the field.
            </p>
            <p className="text-lg md:text-xl leading-relaxed font-bold text-primary">
              Recognized as Amazing Performer in Fitness & Wellness Industry 2024-2025
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              With <span className="font-semibold">19+ years of experience</span>, Sourobh pioneered <span className="font-semibold">FM4 Therapy</span> — a comprehensive treatment enabling complete recovery from painful conditions without medication or surgical intervention.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              He has successfully treated over <span className="font-semibold">10,000+ patients</span> with varied musculoskeletal disorders across all age groups.
            </p>
          </div>

          <div className="flex justify-center">
            <div style={{ width: "300px" }}>
              <div
                className="relative rounded-xl overflow-hidden shadow-lg"
                style={{ paddingTop: "177.78%" }}
              >
                <iframe
                  src="https://www.youtube.com/embed/NIukesZn68Y?autoplay=1&loop=1&mute=1&playlist=NIukesZn68Y"
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
          onClick={() => {
            trackEventAllPixels({ eventName: "Subscribe", eventParams: { value: 99, currency: "INR" } });
          }}
          className="block w-full max-w-lg mx-auto bg-cta hover:bg-cta-hover text-cta-foreground rounded-full py-5 px-8 text-center font-heading font-bold text-xl md:text-2xl transition-all duration-300 shadow-cta"
        >
          Secure Your Seat @ <span className="line-through opacity-70">₹499</span> ₹99
        </a>

      </div>
    </section>
  );
};

export default AboutSection;
