"use client";

import React from "react";
import Image from "next/image";

function PartneringScroll() {
  // Partner logos array
  const partners = [
    { id: 1, name: "Meditab", logo: "/icons/1.svg" },
    { id: 2, name: "ModMed", logo: "/icons/2.png" },
    { id: 3, name: "Nextech", logo: "/icons/3.svg" },
    { id: 4, name: "AdvancedMD", logo: "/icons/4.png" },
    { id: 5, name: "Meditab", logo: "/icons/1.svg" },
    { id: 6, name: "ModMed", logo: "/icons/2.png" },
    { id: 7, name: "Nextech", logo: "/icons/3.svg" },
    { id: 8, name: "AdvancedMD", logo: "/icons/4.png" },
  ];

  // Duplicate partners for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="bg-gray-50 py-16 overflow-hidden">
      <div className="container">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 leading-relaxed text-center">
            Building to be Trusted By Leading Companies
          </h2>
        </div>

        {/* Scrolling Container */}
        <div className="relative">
          {/* Left Gradient Mask */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-20 lg:w-30 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none"></div>

          {/* Right Gradient Mask */}
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-20 lg:w-30 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Track */}
          <div className="overflow-hidden py-8">
            <div className="flex animate-scroll items-center">
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 mx-8"
                >
                  {/* Logo Container */}
                  <div className="flex items-center justify-center h-16 sm:h-20 lg:h-24 w-32 sm:w-40 lg:w-48 group">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={160}
                      height={80}
                      className="w-[120px] h-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                      priority={index < 7}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartneringScroll;
