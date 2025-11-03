
import AiDriven from "@/homecomponents/AiDriven";
import CallToAction from "@/homecomponents/CallToAction";
import Collaborate from "@/homecomponents/Collaborate";
import Hero from "@/homecomponents/Hero";
import HomeAbout from "@/homecomponents/HomeAbout";
import HomeIconBoxex from "@/homecomponents/HomeIconBoxex";
import Nexcura from "@/homecomponents/Nexcura";
import PartneringScroll from "@/homecomponents/PartneringScroll";
import BentoGridInfographic from "@/homecomponents/Stats2";
import WorldClassTreatment from "@/homecomponents/WorldClassTreatment";
import React from "react";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title: "GenAI Health: Advanced Healthcare Through Cutting-Edge Technology",
  description:
    "GenAI Healthcare Inc. wins Best New Startup 2024 Award for innovative AI-driven healthcare solutions, transforming patient care with technology.",
};
export default function page() {
  return (
    // <div>
    <LayoutWrapper>

      <link rel="canonical" href="https://www.genaihealth.care/"/>
      <Hero />
      <PartneringScroll />
      <HomeAbout />
      <HomeIconBoxex />
      <Collaborate />
      <AiDriven />
      <WorldClassTreatment />
      <BentoGridInfographic />
      <Nexcura />
      <CallToAction />
      </LayoutWrapper>
    // </div>
   
  );
}

// export default page;
