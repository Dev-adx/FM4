import { ArrowRight } from "lucide-react";
import { Search, Hand, Leaf, Accessibility } from "lucide-react";

const steps = [
  {
    Icon: Search,
    title: "Identifying The Root Cause (FM-1)",
    desc: <>Identify the <span className="text-primary font-bold">real cause of your spine, neck, or knee pain</span> with cutting-edge assessment tests that go beyond basic diagnosis.</>,
  },
  {
    Icon: Hand,
    title: "Releasing Your Trigger Points (FM-2)",
    desc: <>Gently release <span className="text-primary font-bold">the knots</span> in your muscles that are causing pain, so you can feel relief without any medication</>,
  },
  {
    Icon: Leaf,
    title: "Strengthening Weaker Muscles (FM-3)",
    desc: <><span className="text-primary font-bold">Easy exercises to help you rebuild strength</span> in weak areas, so you can move safely and confidently</>,
  },
  {
    Icon: Accessibility,
    title: "Increasing Your Flexibility (FM-4)",
    desc: <>Improve how your <span className="text-primary font-bold">body bends and stretches</span>, making everyday movements like walking or reaching easier and pain-free</>,
  },
];

const StepContent = ({ step, num }: { step: (typeof steps)[0]; num: number }) => (
  <div>
    <p className="text-sm font-heading font-semibold text-foreground mb-1">Step {num}</p>
    <div className="bg-primary px-4 py-2 rounded-sm mb-2">
      <p className="text-white font-heading font-bold text-sm md:text-base">{step.title}</p>
    </div>
    <div className="border-l-4 border-primary pl-3">
      <p className="font-body text-sm">{step.desc}</p>
    </div>
  </div>
);

const WorkshopStepsSection = () => (
  <section className="bg-section-green py-14">
    <div className="container max-w-4xl">
      <h2 className="text-2xl md:text-4xl font-heading font-bold text-center mb-3">
        What will we cover in the <span className="text-primary">Workshop?</span>
      </h2>
      <p className="text-center font-heading text-sm md:text-base mb-10 max-w-2xl mx-auto">
        Learn practical solutions on how this proven <span className="font-bold">FM4 Therapy</span> can make your life Pain-Free in 30-60 days
      </p>

      {/* ── Desktop: zigzag timeline ── */}
      <div className="hidden md:block relative">
        {/* Vertical center line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-primary/30" />

        <div className="flex flex-col gap-12">
          {steps.map((s, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className="grid grid-cols-[1fr_96px_1fr] items-center">
                {/* Left cell */}
                <div className="pr-8">
                  {isLeft && <StepContent step={s} num={i + 1} />}
                </div>

                {/* Icon circle on the line */}
                <div className="flex justify-center z-10">
                  <div
                    className="w-16 h-16 rounded-full bg-section-green flex items-center justify-center"
                    style={{ border: "2px solid #22c55e" }}
                  >
                    <s.Icon className="text-primary" size={26} />
                  </div>
                </div>

                {/* Right cell */}
                <div className="pl-8">
                  {!isLeft && <StepContent step={s} num={i + 1} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile: stacked vertical ── */}
      <div className="md:hidden flex flex-col items-center gap-0">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            {/* Vertical line above icon (except first) */}
            {i > 0 && <div className="w-px h-8 bg-primary/30" />}

            {/* Icon circle */}
            <div
              className="w-16 h-16 rounded-full bg-section-green flex items-center justify-center flex-shrink-0"
              style={{ border: "2px solid #22c55e" }}
            >
              <s.Icon className="text-primary" size={26} />
            </div>

            {/* Step content */}
            <div className="w-full mt-3 mb-2">
              <p className="text-sm font-heading font-semibold text-center mb-1">Step {i + 1}</p>
              <div className="bg-primary px-4 py-2 rounded-sm mb-2">
                <p className="text-white font-heading font-bold text-sm text-center">{s.title}</p>
              </div>
              <div className="border-l-4 border-primary pl-3">
                <p className="font-body text-sm">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12">
        <a
          href="#checkout"
          onClick={() => { (window as any).fbq?.('track', 'AddToCart'); (window as any).fbq?.('track', 'Subscribe'); }}
          className="block w-full max-w-lg mx-auto bg-cta hover:bg-cta-hover text-cta-foreground rounded-full py-5 px-8 text-center font-heading font-bold text-xl md:text-2xl transition-all duration-300 shadow-cta animate-pulse-slow"
        >
          Book Your Seat For{" "}
          <span className="line-through opacity-70">₹499</span> ₹99
          <ArrowRight className="inline ml-2" size={24} />
          <span className="block text-sm font-body font-normal mt-1 opacity-80">
            100% money back guarantee
          </span>
        </a>
      </div>
    </div>
  </section>
);

export default WorkshopStepsSection;
