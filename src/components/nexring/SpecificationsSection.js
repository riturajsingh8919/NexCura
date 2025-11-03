"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

export default function SpecificationsSection() {
  const [currentRing, setCurrentRing] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rings = [
    { src: "/1.png", alt: "NexRing Black", color: "#808080" },
    { src: "/2.png", alt: "NexRing Gold", color: "#d4af37" },
    { src: "/3.png", alt: "NexRing Silver", color: "#c0c0c0" },
  ];

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRing((prev) => (prev + 1) % rings.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [rings.length]);

  const specs = {
    left: [
      { label: "NAME", value: "NexRing Smart Fitness Tracker Ring" },
      {
        label: "FEATURES",
        value:
          "Real-Time Heart Rate Monitor, Blood Oxygen Level, Body Recovery, Body Temperature, Sleep, Stress, Step Counter, Calories Burnt, Activity Tracking, VO2 Max, Recovery and Strain",
      },
      { label: "SIZE", value: "6, 7, 8, 9, 10, 11, 12, 13" },
      { label: "COLOR", value: "Gunmetal Black, Sterling Gold, Frost Silver" },
      {
        label: "BATTERY",
        value: "Rechargeable 24 mAh non-replaceable LiPo battery",
      },
      { label: "MARKETED BY", value: "NexRing Technologies Private Limited" },
      { label: "BRAND", value: "NEXRING" },
    ],
    right: [
      {
        label: "WHAT'S IN THE BOX",
        value:
          "1 Unit Smart Ring, 1 Unit USB Cable, 1 Unit Charging Case, 1 Unit Instruction Manual",
      },
      {
        label: "CERTIFICATIONS",
        value: "5ATM Water Resistant, CE, EU RoHS, FCC, REACH, CP65, BIS",
      },
      { label: "CONNECTIVITY", value: "Low powered BLE" },
      { label: "WATER RESISTANT", value: "Yes (50 mtr)" },
      { label: "MATERIAL", value: "Titanium" },
      {
        label: "PACKAGED AND IMPORTED BY",
        value:
          "NexRing Technologies Pvt Ltd, 4th Floor, 411, Tech Square, Hitech City, Hyderabad, India - 500081",
      },
      { label: "COUNTRY OF ORIGIN", value: "India" },
    ],
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#000d24] via-[#001233] to-[#000d24] py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#5646a3] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-[#fbf5ea] via-white to-[#fbf5ea] bg-clip-text text-transparent leading-tight pb-2">
            At a glance
          </h2>
          <p className="text-gray-400 text-lg md:text-xl lg:text-2xl leading-relaxed">
            Specifications
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-16 items-center">
          {/* Left Column - Clean List with Borders */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-0"
          >
            {specs.left.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`py-6 ${
                  index !== specs.left.length - 1
                    ? "border-b border-gray-700/30"
                    : ""
                }`}
              >
                <h3 className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 font-bold">
                  {spec.label}
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  {spec.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Center Column - 3D Ring Slider */}
          <div className="relative flex items-center justify-center py-12">
            <motion.div
              style={{ y }}
              className="relative w-full max-w-[450px] h-[450px]"
            >
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentRing}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Glow Effect */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-full blur-[100px]"
                      style={{ backgroundColor: rings[currentRing].color }}
                    />

                    {/* Ring Image */}
                    <motion.div
                      animate={{ rotateZ: [0, 360] }}
                      transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={rings[currentRing].src}
                        alt={rings[currentRing].alt}
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Dots */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {rings.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentRing(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentRing === index
                        ? "bg-[#5646a3] w-8 h-2.5 shadow-lg shadow-[#5646a3]/50"
                        : "bg-gray-600 hover:bg-gray-500 w-2.5 h-2.5"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Clean List with Borders */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-0"
          >
            {specs.right.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`py-6 ${
                  index !== specs.right.length - 1
                    ? "border-b border-gray-700/30"
                    : ""
                }`}
              >
                <h3 className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 font-bold">
                  {spec.label}
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  {spec.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Premium Glass Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative"
          >
            {/* Button Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#5646a3] via-purple-600 to-[#5646a3] rounded-full opacity-70 group-hover:opacity-100 blur-lg transition-opacity duration-500" />

            {/* Glass Button */}
            <div
              className="relative flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(86, 70, 163, 0.9) 0%, rgba(124, 106, 184, 0.7) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow:
                  "0 8px 32px rgba(86, 70, 163, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <span className="relative z-10">Buy Now</span>
              <svg
                className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </motion.button>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
