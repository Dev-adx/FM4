import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Can you guarantee complete pain relief for severe conditions?", a: "Our techniques have been shown to significantly reduce chronic pain and improve mobility in various areas of the body. We aim to address a broad range of discomforts, offering relief to those dealing with long-standing pain or limited movement." },
  { q: "What is FM4 Therapy?", a: "FM4 therapy is a proven 4-phase treatment that targets the root causes of pain in the spine, neck, and knees, providing lasting relief through non-invasive techniques. It involves identifying the cause, releasing muscle tension, strengthening weak muscles, and improving flexibility." },
  { q: "How do you deliver this therapy?", a: "We deliver this via our Centre in Bibwewadi, Pune, as well as Online on Zoom daily from Monday to Saturday." },
  { q: "Do I need any special equipment to join this Workshop?", a: "No, you don't need any special equipment. All techniques are designed for you to practice right from your desk or home." },
  { q: "How is this Workshop different from anything else in the market?", a: "FM4 therapy stands out because it's the only government-patented, 4-phase pain relief solution specifically designed to target the root causes of pain without relying on medicines, surgeries, or physiotherapy." },
  { q: "How can I join the Workshop?", a: "Once you register, you will receive a Zoom link via WhatsApp & Email. Make sure to enter the correct details on the registration form so we can remind you before the session." },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-14" style={{ backgroundColor: "#3d5a6e" }}>
      <div className="container max-w-5xl">
        <div className="grid md:grid-cols-[300px_1fr] gap-12 items-start">
          {/* Left: heading */}
          <div>
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-white/70 font-body text-sm leading-relaxed">
              Find answers to common questions and clarify any doubts to help you get the most out of our services.
            </p>
          </div>

          {/* Right: accordion */}
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-heading font-semibold text-sm md:text-base text-foreground"
                >
                  {f.q}
                  {open === i
                    ? <Minus size={20} className="flex-shrink-0 text-foreground" />
                    : <Plus size={20} className="flex-shrink-0 text-foreground" />}
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-muted-foreground text-sm">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
