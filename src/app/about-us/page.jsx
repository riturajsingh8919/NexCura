import HealthcareHero from "@/aboutcomponents/HealthcareHero";
import OurPromise from "@/aboutcomponents/OurPromise";
import VerticalTimeline from "@/aboutcomponents/VerticalTimeline";
import LayoutWrapper from "@/components/LayoutWrapper";
import React from "react";

export const metadata = {
  title:
    "A mission to empower individuals with AI-driven healthcare solutions.",
  description:
    "Our vision is to establish GenAI Healthcare as the global cornerstone of personalized health management."
};

function AboutUs() {
  return (
    <>
      <LayoutWrapper>
      <HealthcareHero
        title={"Company Background"}
        description={
          "Founded by a team of passionate healthcare innovators and AI technology experts. GenAI HealthCare has evolved from a visonary idea to a leading force in AI-driven health solutions. We believe in a future where individuals have access to accurate medical data and can then create remedial solutions to help imporove quality of life."
        }
        image={"/about/executive.webp"}
        imgheight={"xl:h-full"}
        imgwidth={"xl:w-auto"}
        innerPadding={"lg:pt-4 lg:pb-0"}
      />
      <link rel="canonical" href="https://www.genaihealth.care/about-us"/>

      <OurPromise />
      <VerticalTimeline />
      </LayoutWrapper>
    </>
  );
}

export default AboutUs;
