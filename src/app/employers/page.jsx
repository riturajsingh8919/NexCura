import HealthcareHero from "@/aboutcomponents/HealthcareHero";
import NexCuraEmployerDashboard from "@/nexcuracomponents/EmployersPage";
import React from "react";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title:
    "AI for workforce health trends, engagement, absenteeism, and ROI",
  description:
    "Use AI to uncover workforce health trends, improve engagement, and reduce absenteeism—while maintaining employee privacy and measuring ROI."
};

function Employers() {
  return (
    <>
    <LayoutWrapper>
      <HealthcareHero
        title={"AI Wellness Intelligence for a Stronger Workforce"}
        description={
          "Use AI to uncover workforce health trends, improve engagement, and reduce absenteeism—while maintaining employee privacy and measuring ROI."
        }
        image={"/banners/employers.webp"}
        imgheight={"xl:h-[60vh]"}
        imgwidth={"xl:w-auto"}
        innerPadding={"lg:pt-4 lg:pb-0"}
      />
      <link rel="canonical" href="https://www.genaihealth.care/employers"/>
      <NexCuraEmployerDashboard />
      </LayoutWrapper>
    </>
  );
}

export default Employers;
