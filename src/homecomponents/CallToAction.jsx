"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Check,
  X,
} from "lucide-react";
import Link from "next/link";

function CallToAction() {
  const [formData, setFormData] = useState({
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const features = [
    "Advanced AI powered healthcare solutions",
    "HIPAA compliant and secure data management",
    "Always available dedicated support and assistance",
    "Seamless integration with existing systems",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.company) {
      setError("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_EMAIL_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: {
            name: formData.company, // Using company as name for this form
            email: formData.email,
            company: formData.company,
            message: `Interest in healthcare solutions from ${formData.company}. Submitted via Call-to-Action form.`,
            type: "cta-inquiry",
          },
          emailType: "contact"
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ email: "", company: "" });
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-50 py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Large Background Circles */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gray-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-100/30 rounded-full blur-2xl"></div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-1/4 w-4 h-4 bg-gray-300/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-1/3 w-3 h-3 bg-blue-200/40 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-gray-300/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-white/40 rounded-full animate-bounce"></div>
      </div>

      <div className="container relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-full shadow-lg mb-6">
            <Sparkles className="w-4 h-4 text-gray-600 mr-2" />
            <span className="text-gray-700 font-medium">
              Transform Healthcare Today
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            Collaboration Leads to a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-gray-700 to-gray-900">
              Healthier
            </span>{" "}
            Tomorrow
          </h2>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Join us in shaping the future of wellness. As a customer or partner,
            you will help expand innovative health solutions and drive lasting
            global impact
          </p>
        </div>

        {/* Main CTA Card */}
        <div className="relative max-w-5xl mx-auto">
          {/* Glassmorphism Card */}
          <div className="relative">
            {/* Main Glass Background */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl"></div>

            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 rounded-3xl"></div>

            {/* Border Highlight */}
            <div className="absolute inset-0 rounded-3xl border border-white/30"></div>

            {/* Content */}
            <div className="relative z-10 p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-center lg:text-left">
                  {/* Decorative Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-gray-600 rounded-2xl shadow-lg mb-8 mx-auto lg:mx-0">
                    <Star className="w-8 h-8 text-white" fill="currentColor" />
                  </div>

                  {/* Features List */}
                  <div className="space-y-6 mb-8">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 text-left"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <span className="text-gray-800 text-lg leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Form */}
                <div className="relative">
                  {/* Form Card */}
                  <div className="relative">
                    {/* Card Background */}
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-xl"></div>

                    {/* Inner Card Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-gray-50/60 rounded-3xl"></div>

                    {/* Content */}
                    <div className="relative z-10 p-8">
                      <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-gray-900 mb-3">
                          Contact Us Today
                        </h3>
                        <p className="text-gray-700 text-base">
                          Experience the future of healthcare technology
                        </p>
                      </div>

                      {/* Success Message */}
                      {showSuccess && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                          <div className="flex items-center">
                            <Check className="w-5 h-5 text-green-600 mr-2" />
                            <p className="text-green-800 font-medium">
                              Thank you! We'll be in touch soon.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Error Message */}
                      {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                          <div className="flex items-center">
                            <X className="w-5 h-5 text-red-600 mr-2" />
                            <p className="text-red-800 font-medium">{error}</p>
                          </div>
                        </div>
                      )}

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-5 mb-8">
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                            autoComplete="off"
                            disabled={isSubmitting}
                          />
                        </div>

                        <div className="relative">
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Your organization name"
                            className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                            autoComplete="off"
                            disabled={isSubmitting}
                          />
                        </div>

                        {/* CTA Buttons */}
                        <div className="space-y-4">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full group cursor-pointer relative overflow-hidden bg-gradient-to-r from-blue-600 to-gray-700 hover:from-blue-700 hover:to-gray-800 text-white font-bold py-3 px-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          >
                            <div className="relative z-10 flex items-center justify-center">
                              {isSubmitting ? "Sending..." : "Get Started Now"}
                              <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-gray-500 rounded-full shadow-lg animate-bounce"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-gray-400 to-blue-500 rounded-full shadow-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
