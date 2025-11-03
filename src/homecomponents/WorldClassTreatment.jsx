"use client";

import React, { useEffect } from "react";

function WorldClassTreatment() {
  const treatments = [
    // Row 1 - Left to Right
    [
      "Preventive Care",
      "Early Detection",
      "Body Composition",
      "Vital Signs",
      "Physical Activity",
      "Predictive Risk Analysis",
      "Wellness Evaluation",
    ],
    // Row 2 - Right to Left
    [
      "Health Counseling",
      "Demographic Factors",
      "Genetic Factors",
      "Environmental Factors",
      "Menopause",
      "Nutrition",
      "Sleep",
    ],
    // Row 3 - Left to Right
    [
      "Stress",
      "Lifestyle Modifications",
      "Geographic Settings",
      "Diagnostic Tests",
      "Medication Adherence",
      "Continuous Monitoring",
      "Longevity",
    ],
    // Row 4 - Right to Left
    [
      "Cardiac Health",
      "Respiratory Health",
      "Bone Health",
      "Mental Health",
      "Hormones",
      "Gut Health",
      "Reproductive Health",
      "Autoimmune Diseases",
      "Hydration",
    ],
  ];

  useEffect(() => {
    // Add custom CSS for animations
    const style = document.createElement("style");
    style.textContent = `
      @keyframes scroll-left {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      
      @keyframes scroll-right {
        0% {
          transform: translateX(-50%);
        }
        100% {
          transform: translateX(0);
        }
      }
      
      .scroll-left {
        animation: scroll-left 30s linear infinite;
      }
      
      .scroll-right {
        animation: scroll-right 30s linear infinite;
      }
      
      .treatment-row:hover .scroll-left,
      .treatment-row:hover .scroll-right {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/worldclass-bg.webp')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            AI Driven Evaluation and Understanding
          </h2>
        </div>

        {/* Treatment Rows */}
        <div className="space-y-6">
          {treatments.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="treatment-row relative overflow-hidden py-2"
            >
              <div
                className={`flex items-center space-x-6 whitespace-nowrap ${
                  rowIndex % 2 === 0 ? "scroll-left" : "scroll-right"
                }`}
                style={{
                  width: "200%",
                }}
              >
                {/* First set of treatments */}
                {row.map((treatment, index) => (
                  <div
                    key={`${rowIndex}-${index}-1`}
                    className="inline-flex items-center px-6 py-3 rounded-full border border-white/30 
                             bg-white/10 backdrop-blur-md text-white font-medium text-sm md:text-base
                             hover:bg-white/20 transition-all duration-300 cursor-pointer
                             whitespace-nowrap"
                  >
                    {treatment}
                  </div>
                ))}

                {/* Duplicate set for seamless loop */}
                {row.map((treatment, index) => (
                  <div
                    key={`${rowIndex}-${index}-2`}
                    className="inline-flex items-center px-6 py-3 rounded-full border border-white/30 
                             bg-white/10 backdrop-blur-md text-white font-medium text-sm md:text-base
                             hover:bg-white/20 transition-all duration-300 cursor-pointer
                             whitespace-nowrap"
                  >
                    {treatment}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Spacing */}
        <div className="mt-16"></div>
      </div>
    </section>
  );
}

export default WorldClassTreatment;
