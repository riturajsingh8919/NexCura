import HealthcareHero from "@/aboutcomponents/HealthcareHero";
import React from "react";
import LayoutWrapper from "@/components/LayoutWrapper";
import FAQSection from "@/faqcomponents/FaqPage";

export const metadata = {
  title: "FAQ | GenAI Healthcare",
  description:
    "Find answers to frequently asked questions about GenAI Healthcare’s AI-driven health solutions and diagnostic services.",
};

function ContactUs() {
  return (
      <LayoutWrapper>
    <div>
      {/* <HealthcareHero
        title={"Frequently Asked Questions"}
        description={
          "Ready to transform your healthcare experience? Get in touch with our team of experts and discover how Nexcura can revolutionize your healthcare journey with AI-driven solutions."
        }
        image={"/banners/contact.png"}
        imgheight={"xl:h-[60vh]"}
        imgwidth={"xl:w-auto"}
        innerPadding={"lg:pt-4 lg:pb-0"}
        isVisible={"hidden"}
      /> */}
      <link rel="canonical" href="https://www.genaihealth.care/faq"/>
      <FAQSection />
    </div>
    </LayoutWrapper>
  );
}

export default ContactUs;
