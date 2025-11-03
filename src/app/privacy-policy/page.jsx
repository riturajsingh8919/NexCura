import React from "react";
import LegalPageHero from "@/aboutcomponents/LegalPageHero";

function PrivacyPolicyPage() {
  return (
    <>
      <LegalPageHero
        title={"Privacy Policy"}
        description={
          ""
        }
        image={"/legal_image.png"}
      />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <p className="text-blue-800 font-medium">
            <strong>Effective Date:</strong> February 15, 2024
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
        <p className="text-gray-600 mb-6">
          GenAI Healthcare, Inc. ("we," "us," "our") respects your privacy. This Privacy Policy explains how we collect, use, and disclose information from the users of our website located at www.genaihealth.care (the "Site"). By using our Site, you consent to the data practices described in this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
        <p className="text-gray-600 mb-6">
          We collect the following types of information from you when you use our Site:
        </p>
        
        <h3 className="text-xl font-medium text-gray-700 mb-3">Personal Data</h3>
        <p className="text-gray-600 mb-6">
          Personal data such as your name, email address, phone number, location and other demographic information that you voluntarily provide to us through forms, surveys, registrations, and other areas of our Site where you directly provide personal information.
        </p>

        <h3 className="text-xl font-medium text-gray-700 mb-3">Usage Data</h3>
        <p className="text-gray-600 mb-6">
          We automatically collect usage information about your interaction with the Site, including the pages you visit, the features and services you use, items you "click" on, the time and duration of your visit and other information regarding your use of the Site.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Information</h2>
        <p className="text-gray-600 mb-6">
          We use the information we collect through the Site for our legitimate business interests, including:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Provide, operate, optimize, and maintain our Site.</li>
          <li>Understand our Site visitors and users, their interests, usage patterns, and preferences.</li>
          <li>Develop new products and services.</li>
          <li>Comply with applicable laws and regulations governing our services and business operations.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information Disclosure</h2>
        <p className="text-gray-600 mb-6">
          We do not disclose your personal information to third parties without your explicit consent, except in the following circumstances:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>To service providers under contract who help with parts of our business operations such as fraud prevention, bill collection, marketing, and technology services. Our contracts dictate that these service providers only use your information in connection with the services they perform for us and not for their own benefit.</li>
          <li>To comply with laws, lawful requests, and legal process, such as to respond to subpoenas or requests from government authorities.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights and Choices</h2>
        <p className="text-gray-600 mb-6">
          You may request deletion of your personal data, request copies of your personal data, or update/correct inaccuracies in your personal data by contacting us at the information provided below.
        </p>
        <p className="text-gray-600 mb-6">
          You may opt-out of receiving marketing communications from us by using the unsubscribe link in the email or by contacting us as provided below.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Retention</h2>
        <p className="text-gray-600 mb-6">
          We retain your personal data for as long as needed to provide services to you and as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-6">
          If you have any questions about our Privacy Policy or information practices, please contact us at:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-gray-700 font-medium">GenAI Healthcare, Inc.</p>
          <p className="text-gray-600">Email: contact.us@genaihealth.care</p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes</h2>
        <p className="text-gray-600 mb-6">
          We may change this Privacy Policy from time to time. If we make significant changes, we will provide prominent notice by posting a notice on our Site and/or notifying you via email or other means.
        </p>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicyPage;
