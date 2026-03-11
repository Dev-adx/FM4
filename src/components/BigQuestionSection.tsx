import { ArrowRight } from "lucide-react";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";

const BigQuestionSection = () => {
  const { trackEventAllPixels } = useFacebookPixel();
  
  return (
  <section className="bg-plus-pattern py-8">
    <div className="container max-w-3xl text-center">
      <h2 className="text-2xl md:text-4xl font-heading font-bold mb-3">
        The Big Question is
      </h2>
      <p className="text-primary font-heading font-bold text-xl md:text-2xl mb-8">
        What Will You Experience in This 2-Day Live Workshop?
      </p>

      <div className="text-left space-y-4 mb-10 max-w-2xl mx-auto">
        <p className="font-body text-base md:text-lg">
          1. Get a <span className="font-bold">Personalized Pain Assessment</span> — Know exactly what's the root cause of your Pain? LIVE.
        </p>
        <p className="font-body text-base md:text-lg">
          2. Experience <span className="font-bold">FM4 Therapy LIVE</span> — The same therapy that helped, 10000+ people live pain-free naturally — no medicines, no surgeries.
        </p>
      </div>

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

export default BigQuestionSection;
