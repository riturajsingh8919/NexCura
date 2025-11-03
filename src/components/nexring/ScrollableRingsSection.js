"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ScrollableRingsSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rings = [
    {
      id: 1,
      name: "Smart Silver",
      title: "Skin Temperature Sensor",
      description:
        "Get regular readings on skin temperature changes while you sleep.",
      src: "/1.png",
      color: "#c0c0c0",
    },
    {
      id: 2,
      name: "Bronze",
      title: "PPG Heart Rate Sensor",
      description:
        "Track your heart rate variability and cardiovascular health 24/7.",
      src: "/2.png",
      color: "#cd7f32",
    },
    {
      id: 3,
      name: "Gold",
      title: "Sleep Tracking",
      description:
        "Monitor your sleep stages and get personalized insights every morning.",
      src: "/3.png",
      color: "#d4af37",
    },
    {
      id: 4,
      name: "Normal Silver",
      title: "Activity Monitoring",
      description:
        "Track steps, calories, and daily movement with precision sensors.",
      src: "/4.png",
      color: "#808080",
    },
  ];

  // Update active index based on scroll
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const newIndex = Math.floor(latest * rings.length);
      const clampedIndex = Math.min(newIndex, rings.length - 1);
      setActiveIndex(clampedIndex);
    });
  }, [scrollYProgress, rings.length]);

  // Ring transforms
  const ring0Start = 0 / rings.length;
  const ring0End = 1 / rings.length;
  const ring0Opacity = useTransform(
    scrollYProgress,
    [ring0Start, ring0Start + 0.1, ring0End - 0.1, ring0End],
    [0, 1, 1, 0]
  );
  const ring0Scale = useTransform(
    scrollYProgress,
    [ring0Start, ring0Start + 0.2, ring0End - 0.1, ring0End],
    [0.7, 1, 1, 0.7]
  );

  const ring1Start = 1 / rings.length;
  const ring1End = 2 / rings.length;
  const ring1Opacity = useTransform(
    scrollYProgress,
    [ring1Start, ring1Start + 0.1, ring1End - 0.1, ring1End],
    [0, 1, 1, 0]
  );
  const ring1Scale = useTransform(
    scrollYProgress,
    [ring1Start, ring1Start + 0.2, ring1End - 0.1, ring1End],
    [0.7, 1, 1, 0.7]
  );

  const ring2Start = 2 / rings.length;
  const ring2End = 3 / rings.length;
  const ring2Opacity = useTransform(
    scrollYProgress,
    [ring2Start, ring2Start + 0.1, ring2End - 0.1, ring2End],
    [0, 1, 1, 0]
  );
  const ring2Scale = useTransform(
    scrollYProgress,
    [ring2Start, ring2Start + 0.2, ring2End - 0.1, ring2End],
    [0.7, 1, 1, 0.7]
  );

  const ring3Start = 3 / rings.length;
  const ring3End = 4 / rings.length;
  const ring3Opacity = useTransform(
    scrollYProgress,
    [ring3Start, ring3Start + 0.1, ring3End - 0.1, ring3End],
    [0, 1, 1, 0]
  );
  const ring3Scale = useTransform(
    scrollYProgress,
    [ring3Start, ring3Start + 0.2, ring3End - 0.1, ring3End],
    [0.7, 1, 1, 0.7]
  );

  const ringTransforms = [
    { opacity: ring0Opacity, scale: ring0Scale },
    { opacity: ring1Opacity, scale: ring1Scale },
    { opacity: ring2Opacity, scale: ring2Scale },
    { opacity: ring3Opacity, scale: ring3Scale },
  ];

  // Progress dots
  const progress0 = useTransform(
    scrollYProgress,
    [ring0Start, ring0Start + 0.1, ring0End - 0.1, ring0End],
    [0.3, 1, 1, 0.3]
  );
  const progress1 = useTransform(
    scrollYProgress,
    [ring1Start, ring1Start + 0.1, ring1End - 0.1, ring1End],
    [0.3, 1, 1, 0.3]
  );
  const progress2 = useTransform(
    scrollYProgress,
    [ring2Start, ring2Start + 0.1, ring2End - 0.1, ring2End],
    [0.3, 1, 1, 0.3]
  );
  const progress3 = useTransform(
    scrollYProgress,
    [ring3Start, ring3Start + 0.1, ring3End - 0.1, ring3End],
    [0.3, 1, 1, 0.3]
  );
  const progressTransforms = [progress0, progress1, progress2, progress3];

  const activeRing = rings[activeIndex];

  return (
    <div
      ref={containerRef}
      className="relative bg-black pb-16"
      style={{ height: `${rings.length * 120}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-full py-8 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 items-center max-w-7xl mx-auto h-full">
            {/* Left - Text Content */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 lg:space-y-6 max-w-xl order-2 lg:order-1"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.95]">
                {activeRing.title}
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 leading-relaxed">
                {activeRing.description}
              </p>

              {/* Sensor Indicator */}
              <div className="flex items-center gap-3 pt-2 lg:pt-4">
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full shadow-lg"
                  style={{ backgroundColor: activeRing.color }}
                />
                <span className="text-xs lg:text-sm text-gray-500 uppercase tracking-widest font-bold">
                  ACTIVE SENSOR
                </span>
              </div>
            </motion.div>

            {/* Right - Ring Image */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-full flex flex-col items-center justify-center order-1 lg:order-2">
              {/* Ring Images */}
              <div className="relative flex-1 w-full flex items-center justify-center mb-20 lg:mb-0">
                {rings.map((ring, ringIndex) => {
                  const transforms = ringTransforms[ringIndex];

                  return (
                    <motion.div
                      key={ring.id}
                      style={{
                        opacity: transforms.opacity,
                        scale: transforms.scale,
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="relative w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] lg:w-[550px] lg:h-[550px] max-w-[85vw]">
                        {/* Glow Effect */}
                        <motion.div
                          style={{
                            opacity: transforms.opacity,
                            backgroundColor: ring.color,
                          }}
                          className="absolute inset-0 rounded-full blur-[130px] opacity-25"
                        />

                        {/* Ring Image */}
                        <div className="relative w-full h-full">
                          <Image
                            src={ring.src}
                            alt={ring.name}
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority={ringIndex === 0}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Color Name Label */}
              <motion.div
                key={`label-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-12 lg:bottom-6 lg:relative"
              >
                <div className="px-5 py-2.5 lg:px-8 lg:py-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 lg:w-4 lg:h-4 rounded-full ring-2 ring-white/40 shadow-lg flex-shrink-0"
                      style={{ backgroundColor: activeRing.color }}
                    />
                    <span className="text-white font-bold text-sm lg:text-lg tracking-wide whitespace-nowrap">
                      {activeRing.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="absolute bottom-4 lg:bottom-16 left-1/2 -translate-x-1/2 flex gap-2.5 lg:gap-4 z-50">
            {rings.map((ring, index) => (
              <motion.div
                key={index}
                style={{
                  opacity: progressTransforms[index],
                  backgroundColor: ring.color,
                }}
                className="w-2 h-2 lg:w-3 lg:h-3 rounded-full shadow-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
