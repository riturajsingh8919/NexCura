"use client";

import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {
  const searchParams = useSearchParams();
  const isInApp = searchParams.get("inApp") === "true";

  return (
    <>
      {!isInApp && <Header />}
      <main>{children}</main>
      {!isInApp && <Footer />}
    </>
  );
}
