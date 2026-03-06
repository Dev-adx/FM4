import { useState } from "react";
import { Calendar, Clock, Video, Globe, ArrowRight, Star, Play } from "lucide-react";
import googleReviews from "@/assets/google.webp";
import heroImage from "@/assets/Hero.webp";
import { useWorkshopConfig } from "@/hooks/useWorkshopConfig";
import { formatDateWithSuffix, formatTime } from "@/utils/dateHelpers";

const CTAButton = ({ text = "Book Now – Get 81% OFF", sub = "100% money back guarantee" }: { text?: string; sub?: string }) => (
  <a
    href="#checkout"
    onClick={() => { (window as any).fbq?.('track', 'AddToCart'); (window as any).fbq?.('track', 'Subscribe'); }}
    className="block w-full max-w-lg mx-auto bg-cta hover:bg-cta-hover text-cta-foreground rounded-full py-5 px-8 text-center font-heading font-bold text-xl md:text-2xl transition-all duration-300 shadow-cta animate-pulse-slow"
  >
    {text} <ArrowRight className="inline ml-2" size={24} />
    {sub && <span className="block text-sm font-body font-normal mt-1 opacity-80">{sub}</span>}
  </a>
);

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { config } = useWorkshopConfig();

  const details = [
    { icon: Calendar, label: "Date", value: `${formatDateWithSuffix(config.day1_datetime)} & ${formatDateWithSuffix(config.day2_datetime)}` },
    { icon: Clock, label: "Time", value: `Day 1: ${formatTime(config.day1_datetime)}\nDay 2: ${formatTime(config.day2_datetime)}` },
    { icon: Video, label: "Live Workshop", value: "2 Days" },
    { icon: Globe, label: "Language", value: "Hindi & English" },
  ];

  return (
    <section className="bg-plus-pattern">
      {/* Top banner */}
      <div className="bg-hero text-hero text-center py-3 px-4 rounded-b-lg">
        <p className="font-heading font-semibold text-sm md:text-base">
          Especially for Busy Professionals, Entrepreneurs & their Loved Ones
        </p>
      </div>

      <div className="container py-8 md:py-16">
        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-4">
          <h1 className="text-2xl md:text-5xl font-heading font-bold leading-tight mb-4">
            Learn How to Overcome & Relieve{" "}
            <span className="text-primary">Spine, Knee & Neck Pain Naturally</span>{" "}
            for Long-Term Relief
          </h1>
          <p className="text-lg md:text-xl underline font-bold">
            Without any Medicines, Surgeries, Physio, Chiro, or Oil Massages
          </p>
        </div>

        {/* Google Reviews */}
        <div className="flex items-center justify-center mb-4">
          <img src={googleReviews} alt="Google Reviews" className="h-16 md:h-20" loading="lazy" />
        </div>

        {/* Hero content */}
        <div className="grid md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
          {/* Video / Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <div className="relative" style={{ paddingTop: '56.25%' }}>
              {/* Cover Image with Play Button or Video Player */}
              <div className="absolute top-0 left-0 w-full h-full bg-black">
                {isPlaying ? (
                  <iframe 
                    src="https://player.vimeo.com/video/1109262583?h=9b74413547&autoplay=1"
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture" 
                    allowFullScreen
                    title="Wellness Workshop Video"
                  ></iframe>
                ) : (
                  <>
                    <img
                      src={heroImage}
                      alt="Wellness Workshop"
                      className="w-full h-full object-cover"
                      fetchPriority="high"
                    />
                    {/* Play Button Overlay */}
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer"
                    >
                      <Play className="text-primary ml-1" size={32} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Details + CTA */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {details.map((d) => (
                <div key={d.label} className="bg-card rounded-2xl shadow-sm border flex items-start gap-3 p-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <d.icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{d.label}</p>
                    <p className="font-heading font-bold text-xs whitespace-pre-line">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <CTAButton />

            <p className="text-center font-heading font-bold text-sm">
              🔥 Last <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-xl">155</span> Seats Left — Booking Closes Once Full!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
export { CTAButton };
