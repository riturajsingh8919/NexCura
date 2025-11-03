import React from "react";
import LegalPageHero from "@/aboutcomponents/LegalPageHero";
import LayoutWrapper from "@/components/LayoutWrapper";

function TermsAndConditionPage() {
  return (
    <>
    <LayoutWrapper>

      <LegalPageHero
        title={"Terms and Conditions"}
        description={
          ""
        }
        image={"/legal_image.png"}
      />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
        <p className="text-gray-600 mb-6">
          These terms and conditions ("Terms") govern your access to and use of the website located at www.genaihealth.care (the "Site") and any related services provided on or in connection with the Site (collectively, the "Services"), operated by GenAI Healthcare Inc. ("Company", "we", "our" and "us").
        </p>
        <p className="text-gray-600 mb-6">
          Please read these Terms carefully before using the Site or Services. By accessing or using the Site or Services, you signify your agreement to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Site or Services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Services Provided</h2>
        <p className="text-gray-600 mb-6">
          We provide artificial intelligence and machine learning tools, applications, algorithms, insights, predictions, consultations, and other services to support healthcare, medical diagnosis, treatment guidance, predictive analytics, risk identification, care optimization and other healthcare-related purposes (collectively, "AI Services")
        </p>
        <p className="text-gray-600 mb-6">
          The specific AI Services offered by us may change from time to time at our sole discretion. We make no guarantees, representations or warranties of any kind regarding the accuracy, completeness, timeliness, efficacy, correctness or suitability of any AI Services. Use of the AI Services does not constitute medical or healthcare advice. You should consult a qualified medical professional before making any medical diagnosis, seeking treatment, or otherwise making any healthcare-related decisions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Eligibility to Use the Services</h2>
        <p className="text-gray-600 mb-6">
          You must be at least 18 years old and have the requisite power and authority to enter into these Terms in order to access or use the Site or Services. By accessing or using the Site or Services, you represent and warrant that you have the right, authority, and capacity to enter into these Terms and that you will abide by these Terms.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Accounts and Registration</h2>
        <p className="text-gray-600 mb-6">
          In order to access certain Services, you may be required to register for an account. When you register for an account, you agree to: (a) provide true, current, complete, and accurate information about yourself, and (b) maintain and promptly update any account information provided to keep it true, current, complete, and accurate
        </p>
        <p className="text-gray-600 mb-6">
          You are solely responsible for the activity that occurs under your account, including any unauthorized access or use. You may not transfer your account or any account rights to any third party without our express written permission.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Acceptable Use</h2>
        <p className="text-gray-600 mb-6">
          You agree not to misuse the Site or Services or assist anyone else in doing so. For example, you will not, and will not assist others to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Violate any applicable national or international laws, regulations, or ethical standards for healthcare or medical care established by recognized professional bodies.</li>
          <li>Use the Site or Services for any unlawful, invasive, infringing, defamatory or fraudulent purpose.</li>
          <li>Impersonate any person or entity or otherwise misrepresent your affiliation with a person or entity.</li>
          <li>Interfere with or attempt to interrupt the proper operation of the Site or Services through the use of any virus, device, information collection or transmission mechanism, system failure, trap door, back door, timer, counter, software lock, drop dead device, Trojan-horse routine, worm, bot or other malicious item or program.</li>
          <li>Attempt to access or search the Site, Services or Company systems or networks without authorization.</li>
          <li>Attempt to probe, scan or test the vulnerability of a system or network or to breach security or authentication measures without proper authorization.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Privacy Policy</h2>
        <p className="text-gray-600 mb-6">
          Please refer to our Privacy Policy for information about how we collect, use and disclose information about you.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Intellectual Property Rights</h2>
        <p className="text-gray-600 mb-6">
          The Site, Services, and all content and materials contained therein are the property of Company and its licensors. You acknowledge and agree that you acquire no ownership rights by accessing or using the Site or Services.
        </p>
        <p className="text-gray-600 mb-6">
          The Company name, logo, and all related product and service names, design marks, slogans, and logos are the trademarks and/or registered trademarks of Company. You may not use any trademark or service mark belonging to Company without the prior written consent of Company.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Termination</h2>
        <p className="text-gray-600 mb-6">
          We reserve the right, without notice and at our sole discretion, to terminate your right to access or use the Site or Services. We may terminate these Terms with respect to you if you breach any of the Terms. Upon any such termination, your right to access and use the Site and Services will immediately cease.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Disclaimers and Limitation of Liability</h2>
        <p className="text-gray-600 mb-6">
          Please refer to Sections 10 and 11 below for disclaimers, exclusions and limitations of liability governing the Site and Services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Disclaimer of Warranties</h2>
        <p className="text-gray-600 mb-6 font-medium">
          THE SITE AND SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTY OR CONDITION OF ANY KIND, EITHER EXPRESS OR IMPLIED. THE COMPANY SPECIFICALLY DISCLAIMS ANY AND ALL WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Limitation of Liability</h2>
        <p className="text-gray-600 mb-6 font-medium">
          COMPANY WILL NOT BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES ARISING OUT OF OR RELATING TO THE ACCESS OR USE OF, OR THE INABILITY TO ACCESS OR USE, THE SITE OR SERVICES. YOUR SOLE AND EXCLUSIVE REMEDY FOR DISSATISFACTION WITH THE SITE AND/OR SERVICES IS TO STOP USING THE SITE AND/OR SERVICES.
        </p>
        <p className="text-gray-600 mb-6 font-medium">
          IN NO EVENT WILL THE COMPANY'S TOTAL CUMULATIVE LIABILITY ARISING OUT OF OR RELATED TO THE SITE OR SERVICES EXCEED THE AMOUNTS PAID BY YOU TO COMPANY FOR USE OF THE SERVICES IN THE PRECEDING TWELVE (12) MONTH PERIOD (IF ANY). Because some jurisdictions do not allow limitations of liability, this limitation may not apply to you.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Indemnification</h2>
        <p className="text-gray-600 mb-6">
          You agree to defend, indemnify and hold harmless the Company, its officers, directors, employees, consultants, affiliates, subsidiaries and agents from and against any and all claims, liabilities, damages, losses and expenses, including reasonable attorneys' fees and costs, arising out of or in any way connected with: (a) your access to, use of, or alleged use of, the Site or Services; (b) your violation of these Terms or any representation, warranty, or agreements referenced herein, or any applicable law or regulation; (c) your violation of any third-party right, including without limitation any intellectual property right, publicity, confidentiality, property or privacy right; or (d) any disputes or issues between you and any third party. We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you (without limiting your indemnification obligations with respect thereto), and in such case, you agree to cooperate with our defense of such claim.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Changes to these Terms</h2>
        <p className="text-gray-600 mb-6">
          We reserve the right to revise these Terms at any time by posting an updated version on the Site. Unless explicitly stated otherwise, any new features or services that augment or enhance the current Service will be subject to these Terms. Continued use of the Site or Services after any such changes constitutes your consent to be bound by the revised Terms.
        </p>
        <p className="text-gray-600 mb-6">
          You can review the most current version of these Terms at any time at: [URL to Terms]. The revised Terms will be effective as of the time of posting, or such later date as may be specified in the updated Terms, and will apply to your use of the Site and Services from that point forward.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. General Provisions</h2>
        <p className="text-gray-600 mb-4"><strong>Governing Law.</strong> These Terms will be governed by the laws of the State of Delaware without regard to conflict of law principles. Any dispute arising out of or related to your use of the Site or Services must be brought exclusively in the state or federal courts located in Delaware, and you consent to personal jurisdiction and waive any objection as to inconvenient forum.</p>
        
        <p className="text-gray-600 mb-4"><strong>No Class Actions:</strong> You may only resolve disputes with us on an individual basis and may not bring a claim as a plaintiff or a class member in a class, consolidated, or representative action.</p>
        
        <p className="text-gray-600 mb-4"><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and Company regarding their subject matter and supersede any prior agreements</p>
        
        <p className="text-gray-600 mb-6"><strong>Non-Assignment:</strong> You may not assign, delegate or transfer these Terms or your rights or obligations hereunder without our prior written consent. We may freely assign our rights and obligations under these Terms.</p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-8">
          <p className="text-blue-800 font-medium">
            Please contact us at contact.us@genaihealth.care if you have any questions about these Terms.
          </p>
        </div>
        </div>
      </div>
    </LayoutWrapper>

    </>
  );
}

export default TermsAndConditionPage;
