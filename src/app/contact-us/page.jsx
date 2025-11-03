import LayoutWrapper from "@/components/LayoutWrapper";
import HealthcareHero from "@/aboutcomponents/HealthcareHero";
import ContactPageClient from "@/contactcomponents/ContactPageClient";
export const metadata = {
  title: "Contact Us | GenAI Healthcare",
  description: "Contact us for details, technical advice, and a free quote.",
};

export default function ContactUs() {
  return (
    <LayoutWrapper>
      <div>
        <HealthcareHero
          title="Contact Nexcura"
          description="Ready to transform your healthcare experience? Get in touch with our team of experts and discover how Nexcura can revolutionize your healthcare journey with AI-driven solutions."
          image="/banners/contact.png"
          imgheight="xl:h-[60vh]"
          imgwidth="xl:w-auto"
          innerPadding="lg:pt-4 lg:pb-0"
          isVisible="hidden"
        />

        <link
          rel="canonical"
          href="https://www.genaihealth.care/contact-us"
        />

        <ContactPageClient />
      </div>
    </LayoutWrapper>
  );
}
