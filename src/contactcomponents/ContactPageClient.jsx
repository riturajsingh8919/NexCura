"use client";

import { useSearchParams } from "next/navigation";
import ContactPage from "@/contactcomponents/ContactMainPageNew";
import FAQSection from "@/faqcomponents/FaqPage";

export default function ContactPageClient() {
  const searchParams = useSearchParams();
  const isInApp = searchParams.get("inApp") === "true";

  return (
    <>
      <ContactPage />
      {!isInApp && <FAQSection />}
    </>
  );
}
