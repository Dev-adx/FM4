import { CTAButton } from "./HeroSection";
import { Award } from "lucide-react";
import therapistHero from "@/assets/therapist-hero.jpg";

const AboutSection = () => (
  <section className="bg-section-green py-14">
    <div className="container max-w-5xl">
      <h2 className="text-2xl md:text-4xl font-heading font-bold text-center mb-10">
        Meet Sourobh Kulkarni
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <div className="relative">
            <img src={therapistHero} alt="Sourobh Kulkarni" className="rounded-2xl shadow-lg w-72 md:w-80 object-cover" />
            <div className="absolute -bottom-4 -right-4 bg-accent rounded-xl px-4 py-2 shadow-lg flex items-center gap-2">
              <Award size={20} />
              <span className="font-heading font-bold text-sm">Amazing Performer 2024</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading font-bold text-xl">
            With 19 years of expertise in the Health & Fitness industry
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Sourobh Kulkarni has helped over 10,000 clients overcome chronic pain, including discomfort in the back, neck, and knees, as well as various other mobility challenges.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            His approach is holistic and non-invasive, offering long-lasting relief without relying on medications, surgeries, or traditional physiotherapy. His unique therapy focuses on addressing the root causes of pain, not just masking the symptoms.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            A solution proven effective across a diverse range of clients—from celebrities and athletes to busy working professionals, stay-at-home parents, and elderly patients.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <CTAButton text="Book Your Seat For ₹499 ₹97" />
      </div>
    </div>
  </section>
);

export default AboutSection;
