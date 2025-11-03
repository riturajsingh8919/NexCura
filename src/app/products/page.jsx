// "use client";
import SmartRingPage from "@/components/smartRingPage";
import React from "react";

export const metadata = {
  title:
    "GenAI Health Smart Ring | Continuous Vitals, AI Insights & Wellness Tracking",
  description:
    "Monitor your health 24/7 with GenAI Health Smart Ring. Get AI-powered insights on vitals, sleep, and wellness effortlessly.",
};

function SmartRing() {
  return (
    <>
      <link rel="canonical" href="https://www.genaihealth.care/smart-ring" />
      <SmartRingPage />
    </>
  );
}

export default SmartRing;
