"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Eye, Zap, Heart } from "lucide-react";
import Image from "next/image";

const MissionVision = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const yMission = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [0, -50]
  );
  const yVision = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [0, 50]
  );
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [0, -30]
  );

  return (
    <div
      ref={containerRef}
      className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pt-18 pb-26 overflow-hidden flex items-center"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), 
                                radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Floating Decorative Elements - Hidden on mobile */}
        <motion.div
          className="hidden lg:block absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="hidden lg:block absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-40"
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Mission Section */}
          <motion.div
            className="lg:col-span-5 relative z-10"
            style={{ y: yMission }}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative group">
              {/* Mission Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-transparent to-transparent rounded-3xl" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header with Icon */}
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <Target
                        className="w-7 h-7 text-blue-600"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
                      Our Mission
                    </h2>
                  </div>

                  <p className="text-base xl:text-lg text-gray-700 leading-relaxed font-medium mb-6">
                    At GenAI Healthcare, we're on a mission to empower
                    individuals with AI-driven healthcare solutions. Our
                    approach is tailored to meet each person's unique health
                    needs, ensuring that everyone has access to personalized,
                    effective care.
                  </p>

                  {/* Accent Elements */}
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "4rem" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                    <Heart
                      className="w-5 h-5 text-blue-500"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Central Image Section */}
          <motion.div
            className="lg:col-span-2 relative z-20 flex justify-center my-8 lg:my-0"
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/70 group">
                <Image
                  src="/about/ai-innovation.webp"
                  alt="Medical Technology and AI Innovation"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-teal-500/10" />
                {/* Floating Icon */}
                <motion.div
                  className="absolute bottom-0 right-0 w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/60"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  <Zap
                    className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600"
                    fill="currentColor"
                  />
                </motion.div>
              </div>

              {/* Connection Lines - Hidden on mobile */}
              <div className="hidden lg:block absolute top-1/2 -left-12 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-transparent"></div>
              <div className="hidden lg:block absolute top-1/2 -right-12 w-8 h-0.5 bg-gradient-to-l from-purple-300 to-transparent"></div>
            </div>
          </motion.div>

          {/* Vision Section */}
          <motion.div
            className="lg:col-span-5 relative z-10"
            style={{ y: yVision }}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative group">
              {/* Vision Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-transparent to-transparent rounded-3xl" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header with Icon */}
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <Eye
                        className="w-7 h-7 text-purple-600"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
                      Our Vision
                    </h2>
                  </div>

                  <p className="text-base xl:text-lg text-gray-700 leading-relaxed font-medium mb-6">
                    We envision a world where personalized, AI-driven healthcare
                    enables healthier, longer lives. By bridging the gap between
                    technology and wellness, we strive to redefine healthcare
                    with solutions that are intuitive, accessible, and
                    transformative. Our ultimate goal is to empower individuals
                    and organizations to make informed, proactive health
                    decisions every day.
                  </p>

                  {/* Accent Elements */}
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="h-1 bg-gradient-to-r from-purple-400 to-teal-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "5rem" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                    />
                    <Zap
                      className="w-5 h-5 text-purple-500"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
