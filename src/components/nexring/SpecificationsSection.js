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
    { src: "/ring/silver.png", alt: "Silver", color: "#808080" },
    { src: "/ring/black.png", alt: "Black", color: "#000000" },
    { src: "/ring/gold.png", alt: "Gold", color: "#d4af37" },
    { src: "/ring/rose.png", alt: "Rose Gold", color: "#c0c0c0" },
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
      { label: "NAME", value: "Nexcura NxRing" },
      {
        label: "HEALTH MONITORING",
        value:
          "Heart Rate, Blood Oxygen, Blood Pressure, Temperature, Sleep, Stress",
      },
      {
        label: "FITNESS MONITORING",
        value: "Steps, Accelerometer, Calories Burnt",
      },
      {
        label: "COLOR",
        value: "Matte Silver, Matte Black, Rose Gold, Gold",
      },
    ],
    right: [
      { label: "BATTERY LIFE", value: "Up to 5 days" },
      {
        label: "INCLUDED WITH RING",
        value: "One year subscription to NexCura Health Platform",
      },
      { label: "CONNECTIVITY", value: "Bluetooth" },
      {
        label: "CERTIFICATES",
        value: "FCC, CE, ROHS Certified",
      },
      { label: "DESIGNED IN", value: "US" },
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
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-[#fbf5ea] via-white to-[#fbf5ea] bg-clip-text text-transparent leading-tight pb-2">
            At A Glance
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            NxRing Specifications
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-16 items-center">
          {/* Left Column */}
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
                    exit={{ opacity: 0, scale: 0.8, rotateY: 0 }}
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

          {/* Right Column */}
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
