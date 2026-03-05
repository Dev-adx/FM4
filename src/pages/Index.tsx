import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import WorkshopSection from "@/components/Workshop";
import BigQuestionSection from "@/components/BigQuestionSection";
import VideoReviewsSection from "@/components/VideoReviewsSection";
import WorkshopStepsSection from "@/components/WorkshopStepsSection";
import AudienceSection from "@/components/AudienceSection";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import CheckoutSection from "@/components/CheckoutSection";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <WorkshopSection />
      <VideoReviewsSection />
      <BigQuestionSection />
      <WorkshopStepsSection />
      <AudienceSection />
      <AboutSection />
      <ReviewsSection />
      <CheckoutSection />
      <FAQSection />

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 p-3 bg-card/95 backdrop-blur border-t">
        <a href="#checkout" className="block bg-cta text-cta-foreground text-center font-heading font-bold py-3 rounded-xl shadow-cta">
          Book Now – Get 81% OFF →
        </a>
      </div>
    </main>
  );
};

export default Index;
