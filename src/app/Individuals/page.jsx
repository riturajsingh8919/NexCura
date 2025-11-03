import HealthcareHero from "@/aboutcomponents/HealthcareHero";
import NexCuraComponent from "@/nexcuracomponents/IndividualsPage";
import React from "react";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title:
    "NexCura by GenAI Health | AI-Powered Personal Wellness & Chronic Care Tracking",
  description:
    "Manage your health smarter with GenAI Health. Track wellness, get AI insights, and stay on top of fitness, nutrition, and chronic care.",
};

function page() {
  return (
    <>
    <LayoutWrapper>
      <HealthcareHero
        title={"AI That Transforms Your Health Data Into Daily Action"}
        description={
          "Our AI analyzes your sleep, movement, heart health, and more to give you a single, actionable score every day—helping you prevent issues before they arise."
        }
        image={"/banners/individuals.webp"}
        imgheight={"xl:h-[60vh]"}
        imgwidth={"xl:w-auto"}
        innerPadding={"lg:pt-4 lg:pb-0"}
      />
      <link rel="canonical" href="https://www.genaihealth.care/Individuals"/>
      <NexCuraComponent />
      </LayoutWrapper>
    </>
  );
}

export default page;
