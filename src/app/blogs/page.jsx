import HealthcareHero from "@/aboutcomponents/HealthcareHero";
import BlogMainPage from "@/blogscomponents/BlogMain";
import LayoutWrapper from "@/components/LayoutWrapper";
import React from "react";

export const metadata = {
  title:
    "GenAI Health – Insights on AI, Healthcare Innovation & Wellness",
  description:
    "Explore GenAI Health’s blog for insights on AI, healthcare innovation, wellness tips, and the latest trends in smart healthcare solutions."
};

function Blogs() {
  return (
    <>
     <LayoutWrapper>
      <HealthcareHero
        title={"Health Blogs"}
        description={
          "Explore the latest trends in healthcare, from cutting-edge treatments to holistic wellness approaches. Stay informed, inspired, and empowered to take charge of your health journey with our informative articles and resources."
        }
        image={"/blogs/blog-header.png"}
        imgheight={"xl:h-[60vh]"}
        imgwidth={"xl:w-auto"}
        innerPadding={"lg:pt-8 lg:pb-0"}
      />
      <link rel="canonical" href="https://www.genaihealth.care/blogs"/>
      <BlogMainPage />
      </LayoutWrapper>
    </>
  );
}

export default Blogs;
