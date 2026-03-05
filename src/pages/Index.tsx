import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";

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
