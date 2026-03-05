import { Calendar, Clock, Video, Globe, ArrowRight, Star } from "lucide-react";
import therapistHero from "@/assets/therapist-hero.jpg";
import googleReviews from "@/assets/google.webp";

const CTAButton = ({ text = "Book Now – Get 81% OFF", sub = "100% money back guarantee" }: { text?: string; sub?: string }) => (
  <a
    href="#checkout"
    className="block w-full max-w-lg mx-auto bg-cta hover:bg-cta-hover text-cta-foreground rounded-full py-5 px-8 text-center font-heading font-bold text-xl md:text-2xl transition-all duration-300 shadow-cta animate-pulse-slow"
  >
    {text} <ArrowRight className="inline ml-2" size={24} />
    {sub && <span className="block text-sm font-body font-normal mt-1 opacity-80">{sub}</span>}
  </a>
);

const HeroSection = () => {
  const details = [
    { icon: Calendar, label: "Date", value: "21st, 22nd Feb" },
    { icon: Clock, label: "Time", value: "21st - 8:00 PM\n22nd - 10:00 AM" },
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
          <img src={googleReviews} alt="Google Reviews" className="h-16 md:h-20" />
        </div>

        {/* Hero content */}
        <div className="grid md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
          {/* Video / Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img src={therapistHero} alt="Wellness therapist" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-card/90 flex items-center justify-center">
                <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-primary ml-1" 
                  style={{ borderLeftWidth: '14px' }}
                />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-accent px-4 py-2 rounded-lg font-heading font-bold text-sm">
              Struggling from<br />
              <span className="text-lg">Spine, Neck & Knee pain?</span>
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
