import { lazy, Suspense, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";

// Lazy load below-the-fold components
const WorkshopSection = lazy(() => import("@/components/Workshop"));
const BigQuestionSection = lazy(() => import("@/components/BigQuestionSection"));
const VideoReviewsSection = lazy(() => import("@/components/VideoReviewsSection"));
const WorkshopStepsSection = lazy(() => import("@/components/WorkshopStepsSection"));
const AudienceSection = lazy(() => import("@/components/AudienceSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ReviewsSection = lazy(() => import("@/components/ReviewsSection"));
const CheckoutSection = lazy(() => import("@/components/CheckoutSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <Suspense fallback={<LoadingFallback />}>
        <WorkshopSection />
        <VideoReviewsSection />
        <BigQuestionSection />
        <WorkshopStepsSection />
        <AudienceSection />
        <AboutSection />
        <ReviewsSection />
        <CheckoutSection />
        <FAQSection />
        <FooterSection />
      </Suspense>

      {/* Sticky CTA */}
      {(() => {
        const { trackEvent } = useFacebookPixel();
        return (
          <div className="fixed bottom-0 left-0 right-0 z-50 p-2 md:p-3 bg-card/95 backdrop-blur border-t">
            <a 
              href="#checkout" 
              onClick={() => { trackEvent({ eventName: "AddToCart", eventParams: { value: 99, currency: "INR" } }); }}
              className="block w-full max-w-lg mx-auto bg-cta hover:bg-cta-hover text-cta-foreground rounded-full py-3 md:py-4 px-6 md:px-8 text-center font-heading font-bold text-base md:text-xl transition-all duration-300 shadow-cta animate-pulse-slow"
            >
              Secure Your Seat @ <span className="line-through opacity-70">₹499</span> ₹99
            </a>
          </div>
        );
      })()}
    </main>
  );
};

export default Index;
