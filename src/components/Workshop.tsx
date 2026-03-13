import { ArrowRight } from "lucide-react";
import painImage from "@/assets/pain.webp";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import SubscribeButton from "./SubscribeButton";

const painPoints = [
  <>Is your <span className="text-primary font-bold">chronic pain</span> affecting your <span className="text-primary font-bold">personal &amp; professional</span> life that's making you scared about your future?</>,
  <>Are you wasting your <span className="text-primary font-bold">precious time and money</span> on medicines, physio or injections, but not getting a complete solution?</>,
  <>Are you tired of the same old <span className="text-primary font-bold">yoga therapies, traditional therapies</span> and other therapies but never got <span className="text-primary font-bold">pain relief</span>?</>,
  <>Are you confused which method can actually help to completely <span className="text-primary font-bold">reverse your Pain for life</span>?</>,
];

const PainPointsSection = () => (
  <section id="workshop" className="bg-section-white pt-6 pb-6">
    <div className="container max-w-5xl">
      <h2 className="text-2xl md:text-4xl font-heading font-bold text-center mb-10">
        Are You Struggling To{" "}
        <span className="text-primary">Reverse Your Spine, Knee or Neck Pain?</span>
      </h2>

      {/* ── Desktop layout ── */}
      <div className="hidden md:flex items-center gap-0 mb-6">
        {/* Image with green ring */}
        <div className="flex-shrink-0 flex items-center justify-center" style={{ width: "300px" }}>
          <div className="w-64 h-64 rounded-full overflow-hidden shadow-xl"
            style={{ border: "8px solid #22c55e" }}>
            <img src={painImage} alt="Pain" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* Connecting lines + cards */}
        <div className="flex-1 flex flex-col gap-4">
          {painPoints.map((p, i) => (
            <div key={i} className="flex items-center">
              {/* Connector: horizontal line → dot */}
              <div className="flex items-center flex-shrink-0">
                <div className="h-px bg-gray-400" style={{ width: "60px" }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0" />
              </div>
              {/* Card with number badge */}
              <div className="relative flex-1 border border-primary rounded-2xl px-5 py-3 bg-white ml-2">
                <div
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center font-heading font-bold text-sm"
                  style={{ border: "2px solid #22c55e" }}
                >
                  {i + 1}
                </div>
                <p className="font-body text-sm ml-3">{p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="md:hidden flex flex-col items-center gap-6 mb-6">
        {/* Image with green ring */}
        <div
          className="w-44 h-44 rounded-full overflow-hidden shadow-xl"
          style={{ border: "6px solid #22c55e" }}
        >
          <img src={painImage} alt="Pain" className="w-full h-full object-cover" loading="lazy" />
        </div>

        {/* Numbered cards */}
        <div className="w-full flex flex-col gap-6">
          {painPoints.map((p, i) => (
            <div key={i} className="relative border border-primary rounded-2xl px-5 pt-6 pb-4 bg-white">
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center font-heading font-bold text-sm"
                style={{ border: "2px solid #22c55e" }}
              >
                {i + 1}
              </div>
              <p className="font-body text-sm text-center">{p}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer text */}
      <div className="text-center mb-8 space-y-1">
        <p className="font-heading font-bold text-base md:text-xl">
          If yes, then you're not alone! Many Patients faced similar challenges in their daily lives.
        </p>
        <p className="text-primary font-heading font-bold text-base md:text-xl">
          Now it's possible to effectively reverse your Pain, from the comfort of your home!
        </p>
      </div>

      {/* CTA with strikethrough price */}
      {/* {(() => {
        const { trackEventAllPixels } = useFacebookPixel();
        return (
            <a
              href="#checkout"
              onClick={() => { trackEventAllPixels({ eventName: "Subscribe", eventParams: { value: 99, currency: "INR" } }); }}
className="block w-full max-w-lg mx-auto bg-cta hover:bg-cta-hover text-cta-foreground rounded-full py-5 px-8 text-center font-heading font-bold text-xl md:text-2xl transition-all duration-300 shadow-cta hover:scale-105 hover:shadow-xl animate-cta-bounce group"
          >
            Secure Your Seat @ <span className="line-through opacity-70">₹499</span> ₹99
          </a>
        );
      })()} */}

      <SubscribeButton ctaLocation="Workshop"/>

    </div>
  </section>
);

const WorkshopSection = PainPointsSection;
export default WorkshopSection;
