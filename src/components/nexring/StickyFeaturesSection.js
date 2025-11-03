"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BsBatteryCharging } from "react-icons/bs";
import Image from "next/image";
import { useRef } from "react";

export default function StickyFeaturesSection() {
  const [isMounted, setIsMounted] = useState(false);

  // Refs for each card
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Smooth scroll animations for Card 1
  const { scrollYProgress: card1Progress } = useScroll({
    target: card1Ref,
    offset: ["start end", "end start"],
  });
  const card1Scale = useTransform(
    card1Progress,
    [0, 0.25, 0.75, 1],
    [0.8, 1, 1, 0.8],
    { clamp: false }
  );
  const card1Blur = useTransform(
    card1Progress,
    [0, 0.25, 0.75, 1],
    [10, 0, 0, 10]
  );
  const card1Opacity = useTransform(
    card1Progress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );

  // Smooth scroll animations for Card 2
  const { scrollYProgress: card2Progress } = useScroll({
    target: card2Ref,
    offset: ["start end", "end start"],
  });
  const card2Scale = useTransform(
    card2Progress,
    [0, 0.25, 0.75, 1],
    [0.8, 1, 1, 0.8],
    { clamp: false }
  );
  const card2Blur = useTransform(
    card2Progress,
    [0, 0.25, 0.75, 1],
    [10, 0, 0, 10]
  );
  const card2Opacity = useTransform(
    card2Progress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );

  // Smooth scroll animations for Card 3
  const { scrollYProgress: card3Progress } = useScroll({
    target: card3Ref,
    offset: ["start end", "end start"],
  });
  const card3Scale = useTransform(
    card3Progress,
    [0, 0.25, 0.75, 1],
    [0.8, 1, 1, 0.8],
    { clamp: false }
  );
  const card3Blur = useTransform(
    card3Progress,
    [0, 0.25, 0.75, 1],
    [10, 0, 0, 10]
  );
  const card3Opacity = useTransform(
    card3Progress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );

  return (
    <section className="relative bg-gradient-to-b from-[#000d24] via-[#001233] to-[#000d24] py-20 md:py-32 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#5646a3] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />

      {/* Section Header */}
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-32 pt-8 "
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-[#fbf5ea] via-white to-[#fbf5ea] bg-clip-text text-transparent leading-tight pb-2 tracking-tight">
            Wellbeing, comfortably yours
          </h2>
          <p className="text-gray-400 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto font-light">
            Get actionable insights and implement them into your life to enhance
            your fitness and holistic well-being.
          </p>
        </motion.div>
      </div>

      {/* Cards Container */}
      <div className="relative space-y-32 md:space-y-40">
        {/* Card 1 */}
        <motion.div
          ref={card1Ref}
          style={{
            scale: card1Scale,
            filter: useTransform(card1Blur, (value) => `blur(${value}px)`),
            opacity: card1Opacity,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5646a3] to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-gray-700/50 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5646a3]/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />

              <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center p-8 md:p-12 lg:p-16 relative">
                <div className="space-y-6 order-2 md:order-1">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#5646a3]/20 to-purple-500/20 rounded-full border border-[#5646a3]/30">
                    <span className="text-5xl font-black bg-gradient-to-br from-[#5646a3] to-purple-400 bg-clip-text text-transparent">
                      01
                    </span>
                  </div>

                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
                    High Precision
                  </h3>

                  <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">
                    Proximity to pulse points ensures unparalleled reliability
                    and precision
                  </p>
                </div>

                <div className="relative order-1 md:order-2 group/image">
                  <motion.div
                    className="relative aspect-video"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="absolute inset-0 bg-gradient-radial from-[#5646a3]/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -inset-4 bg-gradient-to-br from-[#5646a3]/30 to-purple-500/30 rounded-2xl blur-2xl opacity-50 group-hover/image:opacity-75 transition-opacity duration-500" />

                    <div className="relative w-full h-full">
                      <Image
                        src="/1.png"
                        alt="High Precision"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          ref={card2Ref}
          style={{
            scale: card2Scale,
            filter: useTransform(card2Blur, (value) => `blur(${value}px)`),
            opacity: card2Opacity,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-[#5646a3] rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-gray-700/50 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-[#5646a3]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />

              <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center p-8 md:p-12 lg:p-16 relative">
                <div className="space-y-6 order-2">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-[#5646a3]/20 rounded-full border border-purple-500/30">
                    <span className="text-5xl font-black bg-gradient-to-br from-purple-400 to-[#5646a3] bg-clip-text text-transparent">
                      02
                    </span>
                  </div>

                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
                    Effortless Comfort
                  </h3>

                  <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">
                    10X lighter than your average smartwatch. Designed to be
                    worn for extended periods of time giving unmatched comfort
                  </p>
                </div>

                <div className="relative order-1 group/image">
                  <motion.div
                    className="relative aspect-video"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/30 to-[#5646a3]/30 rounded-2xl blur-2xl opacity-50 group-hover/image:opacity-75 transition-opacity duration-500" />

                    <div className="relative w-full h-full">
                      <Image
                        src="/2.png"
                        alt="Effortless Comfort"
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          ref={card3Ref}
          style={{
            scale: card3Scale,
            filter: useTransform(card3Blur, (value) => `blur(${value}px)`),
            opacity: card3Opacity,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-gray-700/50 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />

              <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center p-8 md:p-12 lg:p-16 relative">
                <div className="space-y-6 order-2 md:order-1">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full border border-emerald-500/30">
                    <span className="text-5xl font-black bg-gradient-to-br from-emerald-400 to-green-500 bg-clip-text text-transparent">
                      03
                    </span>
                  </div>

                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
                    Battery for Days
                  </h3>

                  <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">
                    Leave the charger behind. Get 8 days of tracking and unlock
                    your full potential
                  </p>
                </div>

                <div className="relative order-1 md:order-2 flex items-center justify-center">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
                      {isMounted && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-conic from-emerald-500 via-green-400 to-emerald-500 opacity-90"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      )}

                      <div className="absolute inset-3 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 shadow-[0_0_60px_rgba(16,185,129,0.6)] flex flex-col items-center justify-center border border-emerald-500/20">
                        <div className="text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-b from-white to-emerald-200 bg-clip-text text-transparent">
                          8
                        </div>

                        <span className="text-xl md:text-2xl font-semibold text-emerald-400 mt-2">
                          Days
                        </span>

                        <motion.div
                          animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="mt-4"
                        >
                          <BsBatteryCharging className="w-9 h-9 md:w-11 md:h-11 text-emerald-400" />
                        </motion.div>
                      </div>
                    </div>

                    {isMounted && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl"
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
