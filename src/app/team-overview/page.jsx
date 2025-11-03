import HealthcareHero from "@/aboutcomponents/HealthcareHero";
import TeamMosaic from "@/aboutcomponents/TeamMosaic";
import LayoutWrapper from "@/components/LayoutWrapper";

import React from "react";

export const metadata = {
  title:
    "Meet Our Team | GenAI Health Leaders Driving Innovation in AI & Healthcare",
  description:
    "Meet the leaders at GenAI Health driving innovation in AI and healthcare. Learn about our experts and their mission to transform care."
};

function page() {
  return (
    <>
     <LayoutWrapper>
      <HealthcareHero
        title={"Shaping Leaders to Drive Change"}
        description={
          "Leadership is about creating impact, empowering others, and driving change. Our commitment is to nurture leaders who rise to challenges and deliver outstanding results with integrity and purpose."
        }
        image={"/about/team.png"}
        imgheight={"xl:h-full"}
        imgwidth={"xl:w-auto"}
        innerPadding={"lg:pt-4 lg:pb-0"}
      />
      <link rel="canonical" href="https://www.genaihealth.care/team-overview"/>
      <TeamMosaic />
      </LayoutWrapper>
    </>
  );
}

export default page;
