import BlogCarousel from "@/components/nexring/BlogCarousel";
import FAQSection from "@/components/nexring/FAQSection";
import Footer from "@/components/nexring/Footer";
import Header from "@/components/nexring/Header";
import HealthCategoriesSection from "@/components/nexring/HealthCategoriesSection";
import HorizontalScrollSection from "@/components/nexring/HorizontalScrollSection";
import InteractiveVideoSection from "@/components/nexring/InteractiveVideoSection";
import LifestyleTabs from "@/components/nexring/LifestyleTabs";
import ScrollableRingsSection from "@/components/nexring/ScrollableRingsSection";
import SpecificationsSection from "@/components/nexring/SpecificationsSection";
import StickyFeaturesSection from "@/components/nexring/StickyFeaturesSection";
import VideoCarousel from "@/components/nexring/VideoCarousel";

export const metadata = {
  title:
    "GenAI Health Smart Ring | Continuous Vitals, AI Insights & Wellness Tracking",
  description:
    "Monitor your health 24/7 with GenAI Health Smart Ring. Get AI-powered insights on vitals, sleep, and wellness effortlessly.",
};

function page() {
  return (
    <>
      <Header />
      <VideoCarousel />
      <HorizontalScrollSection />
      <StickyFeaturesSection />
      <LifestyleTabs />
      <HealthCategoriesSection />
      <InteractiveVideoSection />
      <ScrollableRingsSection />
      <SpecificationsSection />
      <BlogCarousel />
      <FAQSection />
      <Footer />
    </>
  );
}

export default page;
