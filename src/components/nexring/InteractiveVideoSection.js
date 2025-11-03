"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function InteractiveVideoSection() {
  const [activeTab, setActiveTab] = useState("case-open");

  // Create refs for all videos
  const videoRefs = useRef({
    "case-open": null,
    "short-press": null,
    "long-press": null,
  });

  const features = [
    {
      id: "case-open",
      title: "Case Open",
      description: "Welcome light on",
      videoSrc: "/how/case-open.mp4",
    },
    {
      id: "short-press",
      title: "Short Press",
      description: "Check battery level",
      videoSrc: "/how/short-press.mp4",
    },
    {
      id: "long-press",
      title: "Long Press (3 sec.)",
      description: "Start pairing mode",
      videoSrc: "/how/long-press.mp4",
    },
  ];

  // Play active video when tab changes
  useEffect(() => {
    const activeVideo = videoRefs.current[activeTab];
    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.play().catch((err) => console.log("Video play error:", err));
    }
  }, [activeTab]); // Only activeTab as dependency

  return (
    <section className="relative min-h-screen bg-black pt-16 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#5646a3] rounded-full mix-blend-screen filter blur-[180px] opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#5646a3] rounded-full mix-blend-screen filter blur-[180px] opacity-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center max-w-7xl mx-auto">
          {/* Left Column - Fixed Video Container */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            {/* Fixed Video Container */}
            <div className="relative aspect-square max-w-[600px] mx-auto">
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-black">
                {/* All Videos Stacked */}
                {features.map((feature) => (
                  <video
                    key={feature.id}
                    ref={(el) => (videoRefs.current[feature.id] = el)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                      activeTab === feature.id ? "opacity-100" : "opacity-0"
                    }`}
                    muted
                    playsInline
                  >
                    <source src={feature.videoSrc} type="video/mp4" />
                  </video>
                ))}
              </div>

              {/* Play Button Overlay */}
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                <button
                  onClick={() => {
                    const video = videoRefs.current[activeTab];
                    if (video) video.play();
                  }}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7 text-white ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              {/* Subtle Border Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#5646a3] via-[#7c6ab8] to-[#5646a3] rounded-3xl blur-xl opacity-20" />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-12 order-1 lg:order-2"
          >
            {/* Heading Section */}
            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl font-black leading-tight"
              >
                <span className="block bg-gradient-to-r from-white via-[#fbf5ea] to-white bg-clip-text text-transparent">
                  Modern design
                </span>
                <span className="block bg-gradient-to-r from-white via-[#fbf5ea] to-white bg-clip-text text-transparent">
                  that shines
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-gray-400 text-base md:text-lg leading-relaxed"
              >
                With its clear cover, the charging cradle is the place to get
                your NexRing ready to take on your week. LED lights help you
                know how far along NexRing is in its charging cycle.
              </motion.p>
            </div>

            {/* Interactive Feature Tabs */}
            <div className="space-y-8">
              {/* Tab Buttons */}
              <div className="grid grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <motion.button
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => setActiveTab(feature.id)}
                    className="relative group"
                  >
                    {/* Subtle Glow Effect */}
                    {activeTab === feature.id && (
                      <motion.div
                        layoutId="tabGlow"
                        className="absolute -inset-1.5 bg-gradient-to-br from-[#5646a3] to-[#7c6ab8] rounded-3xl blur-lg opacity-30"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}

                    {/* Icon Container */}
                    <div
                      className={`relative rounded-2xl p-6 transition-all duration-300 ${
                        activeTab === feature.id
                          ? "bg-gradient-to-br from-[#5646a3] to-[#7c6ab8] scale-105"
                          : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
                      }`}
                    >
                      {/* Icon SVG */}
                      <div className="w-12 h-12 mx-auto mb-3">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          {feature.id === "case-open" && (
                            <circle
                              cx="50"
                              cy="50"
                              r="35"
                              fill="none"
                              stroke={
                                activeTab === feature.id ? "#fff" : "#888"
                              }
                              strokeWidth="4"
                            />
                          )}
                          {feature.id === "short-press" && (
                            <>
                              <circle
                                cx="50"
                                cy="50"
                                r="35"
                                fill="none"
                                stroke={
                                  activeTab === feature.id ? "#fff" : "#888"
                                }
                                strokeWidth="4"
                                strokeDasharray="8 4"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="20"
                                fill={
                                  activeTab === feature.id ? "#fff" : "#888"
                                }
                              />
                            </>
                          )}
                          {feature.id === "long-press" && (
                            <>
                              <circle
                                cx="50"
                                cy="50"
                                r="35"
                                fill="none"
                                stroke={
                                  activeTab === feature.id ? "#fff" : "#888"
                                }
                                strokeWidth="4"
                                strokeDasharray="4 3"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="20"
                                fill={
                                  activeTab === feature.id ? "#fff" : "#888"
                                }
                              />
                            </>
                          )}
                        </svg>
                      </div>

                      {/* Text */}
                      <div className="text-center">
                        <h3
                          className={`text-sm font-bold mb-1 transition-colors duration-300 ${
                            activeTab === feature.id
                              ? "text-white"
                              : "text-gray-500"
                          }`}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className={`text-xs transition-colors duration-300 ${
                            activeTab === feature.id
                              ? "text-white/80"
                              : "text-gray-600"
                          }`}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#5646a3] via-[#7c6ab8] to-[#5646a3] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{
                    width:
                      activeTab === "case-open"
                        ? "33.33%"
                        : activeTab === "short-press"
                        ? "66.66%"
                        : "100%",
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* Feature Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#5646a3] to-[#7c6ab8] rounded-2xl opacity-0 group-hover:opacity-50 blur transition-opacity duration-500" />
                <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-5 border border-white/10 group-hover:border-[#5646a3]/50 transition-all duration-300">
                  <p className="text-3xl md:text-4xl font-black text-white mb-2">
                    8
                  </p>
                  <p className="text-xs text-gray-500">Days Battery</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#5646a3] to-[#7c6ab8] rounded-2xl opacity-0 group-hover:opacity-50 blur transition-opacity duration-500" />
                <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-5 border border-white/10 group-hover:border-[#5646a3]/50 transition-all duration-300">
                  <p className="text-3xl md:text-4xl font-black text-white mb-2">
                    LED
                  </p>
                  <p className="text-xs text-gray-500">Indicators</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#5646a3] to-[#7c6ab8] rounded-2xl opacity-0 group-hover:opacity-50 blur transition-opacity duration-500" />
                <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-5 border border-white/10 group-hover:border-[#5646a3]/50 transition-all duration-300">
                  <p className="text-3xl md:text-4xl font-black text-white mb-2">
                    Fast
                  </p>
                  <p className="text-xs text-gray-500">Charging</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
