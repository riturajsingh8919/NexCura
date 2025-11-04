import FAQSection from "@/components/nexring/FAQSection";
import Footer from "@/components/nexring/Footer";
import GoToTopButton from "@/components/nexring/GoToTopButton";
import Header from "@/components/nexring/Header";
import HorizontalScrollSection from "@/components/nexring/HorizontalScrollSection";
import SpecificationsSection from "@/components/nexring/SpecificationsSection";
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
      <SpecificationsSection />
      <FAQSection />
      <Footer />
      <GoToTopButton />
    </>
  );
}

export default page;
