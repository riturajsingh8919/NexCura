import HealthcareHero from "@/aboutcomponents/HealthcareHero";
import NexCuraCaregiverHero from "@/nexcuracomponents/CareGiversPage";
import React from "react";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title:
    "GenAI Health Caregivers | AI Tools & Support for Compassionate, Smarter Care",
  description:
  "Empower your caregiving with GenAI Health’s AI tools, real-time insights, and support to provide smarter, compassionate care every day."
};
 export default function page() {
  return (
    <>
    <LayoutWrapper>

      <HealthcareHero
        title={"AI-Powered Health Insights for Caregivers"}
        description={
          "Get real-time AI analysis of your loved one’s key health metrics, no matter where they are, so you can act early and stay connected with confidence."
        }
        image={"/banners/caregivers.png"}
        imgheight={"xl:h-[60vh]"}
        imgwidth={"xl:w-auto"}
        innerPadding={"lg:pt-4 lg:pb-0"}
      />
      <link rel="canonical" href="https://www.genaihealth.care/caregivers"/>
      <NexCuraCaregiverHero />
      </LayoutWrapper>
    </>
  );
}

// export default page;
