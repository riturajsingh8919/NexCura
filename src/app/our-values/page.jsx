import CoreValuesConstellation from "@/aboutcomponents/CoreValuesConstellation";
import HealthcareHero from "@/aboutcomponents/HealthcareHero";
import MissionVision from "@/aboutcomponents/MissionVision";
import LayoutWrapper from "@/components/LayoutWrapper";

import React from "react";

export const metadata = {
  title:
    "Our Values | GenAI Health’s Commitment to Innovation, Compassion & Excellence",
  description:
    "Discover GenAI Health’s core values: innovation, compassion, and excellence driving smarter AI-powered healthcare solutions."
};

function page() {
  return (
    <>
    <LayoutWrapper>
      <HealthcareHero
        title={"Core Values That Define Us"}
        description={
          "We're pioneering a new standard in health guidance, using individual health data to craft highly personalized health plans. Our AI-driven approach means each recommendation is uniquely suited to your personal health profile."
        }
        image={"/banners/values.webp"}
        imgheight={"xl:h-full"}
        imgwidth={"xl:w-auto"}
        innerPadding={"lg:pt-4 lg:pb-0"}
      />
      <link rel="canonical" href="https://www.genaihealth.care/our-values"/>
      <MissionVision />
      <CoreValuesConstellation />
      </LayoutWrapper>
    </>
  );
}

export default page;
