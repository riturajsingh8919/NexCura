import React from "react";
import LegalPageHero from "@/aboutcomponents/LegalPageHero";
import LayoutWrapper from "@/components/LayoutWrapper";
function DisclaimerPage() {
  return (
    <>
     <LayoutWrapper>
      <LegalPageHero
        title={"Disclaimer"}
        description={
          ""
        }
        image={"/legal_image.png"}
      />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">
          The information provided on this website is for general informational
          and educational purposes only. It is not intended to constitute
          medical advice, diagnosis, treatment, or recommendation for any
          disease or medical condition. This site and its content do not
          establish a doctor-patient relationship with any site visitor.
        </p>

        <p className="text-gray-600 mb-6">
          You should NOT rely on any information on this website to replace
          consultations with qualified healthcare professionals to meet your
          individual needs. Consult a medical professional before beginning any
          new treatment, medication, fitness plan, diet, or health regimen.
          Reliance on any information provided by this site is solely at your
          own risk.
        </p>

        <p className="text-gray-600 mb-6">
          GenAI Healthcare, Inc. makes no warranties or representations about
          the accuracy, completeness, timeliness, efficacy, or suitability of
          any of the information provided through this website. GenAI
          Healthcare, Inc. disclaims any liability arising out any use of this
          website or the information contained therein. Your use of this website
          indicates your agreement to this disclaimer. If you do not agree to
          this disclaimer, please do not access, or use this website.
        </p>

        <p className="text-gray-600 mb-6">
          This disclaimer is subject to change without notice. You acknowledge
          and agree that it is your responsibility to review this site and this
          disclaimer periodically.
        </p>
        </div>
      </div>
      </LayoutWrapper>
    </>
  );
}

export default DisclaimerPage;
