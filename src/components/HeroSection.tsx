import { Calendar, Clock, Video, Globe } from "lucide-react";
import googleReviews from "@/assets/google.webp";

import { useWorkshopConfig } from "@/hooks/useWorkshopConfig";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import { formatDayOnly, formatTime } from "@/utils/dateHelpers";
import { parseISO, format } from "date-fns";


const CTAButton = ({ text = "Secure Your Seat @ ₹499 ₹99" }: { text?: string }) => {
  const { trackEventAllPixels } = useFacebookPixel();
  
  return (
    <a
      href="#checkout"
      onClick={() => {
        trackEventAllPixels({ eventName: "Subscribe", eventParams: { value: 99, currency: "INR" } });
      }}
className="block w-full max-w-lg mx-auto bg-cta hover:bg-cta-hover text-cta-foreground rounded-full py-5 px-8 text-center font-heading font-bold text-xl md:text-2xl transition-all duration-300 shadow-cta hover:scale-105 hover:shadow-xl animate-cta-bounce group"
    >
      Secure Your Seat @ <span className="line-through opacity-70">₹499</span> ₹99
    </a>
  );
};

const HeroSection = () => {

  const { config } = useWorkshopConfig();

  const details = [
    { icon: Calendar, label: "Date", value: `${formatDayOnly(config.day1_datetime)}, ${formatDayOnly(config.day2_datetime)} ${format(parseISO(config.day1_datetime || new Date().toISOString()), "MMM")}` },
    { icon: Clock, label: "Time", value: `${formatDayOnly(config.day1_datetime)} - ${formatTime(config.day1_datetime)}\n${formatDayOnly(config.day2_datetime)} - ${formatTime(config.day2_datetime)}` },
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
            <a href="#workshop" className="hover:text-primary transition-colors">
              Without any Medicines, Surgeries, Physio, Chiro, or Oil Massages
            </a>
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
              <iframe 
                    src="https://www.youtube.com/embed/9VoVN6gfhxg?autoplay=1&mute=1&si=kZ9eWJRdu5st253L"
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                    allowFullScreen
                    loading="lazy"
                    title="Wellness Workshop Video - Autoplay"
                  ></iframe>
            </div>
          </div>

          {/* Details + CTA */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {details.map((d) => (
                <div key={d.label} className="bg-card rounded-2xl shadow-sm border flex items-start gap-3 p-3">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <d.icon className="text-white" size={20} />
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
              🔥 Last <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-xl">43</span> Seats Left — Booking Closes Once Full!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
export { CTAButton };
