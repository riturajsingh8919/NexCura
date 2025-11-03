"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const slides = [
    {
      id: 1,
      video: "/videos/01.mov",
      title: "No limits. Not even water.",
      subtitle: "Active Lifestyle",
      description:
        "You're maintaining an active lifestyle. Keep up the great work and aim to challenge yourself further.",
      position: "left",
      productUrl: "/products/waterproof-watch",
    },
    {
      id: 2,
      video: "/videos/02.mov",
      title: "Track every heartbeat. Even while you sleep.",
      subtitle: "Sleep Tracking",
      description:
        "You're getting good sleep. Keep it up to feel more energized tomorrow.",
      position: "right",
      productUrl: "/products/sleep-tracker",
    },
    {
      id: 3,
      video: "/videos/03.mov",
      title: "Move better. Live stronger.",
      subtitle: "Fitness Goals",
      description:
        "Push your boundaries and keep your rhythm aligned with your goals.",
      position: "left",
      productUrl: "/products/fitness-watch",
    },
    {
      id: 4,
      video: "/videos/04.mov",
      title: "Every breath counts.",
      subtitle: "Wellness Monitor",
      description: "Monitor your wellness and find balance every day.",
      position: "right",
      productUrl: "/products/wellness-tracker",
    },
    {
      id: 5,
      video: "/videos/05.mov",
      title: "Your journey. Perfected.",
      subtitle: "Stay Connected",
      description: "Stay consistent. Stay connected. Keep evolving.",
      position: "left",
      productUrl: "/products/smartwatch-pro",
    },
  ];

  // Fixed particle positions
  const particlePositions = [
    { left: 15.2, top: 20.5 },
    { left: 85.3, top: 15.8 },
    { left: 25.6, top: 75.2 },
    { left: 70.4, top: 85.1 },
    { left: 45.8, top: 10.3 },
    { left: 90.2, top: 55.7 },
    { left: 10.5, top: 65.4 },
    { left: 55.3, top: 40.2 },
    { left: 35.7, top: 90.6 },
    { left: 78.9, top: 25.3 },
    { left: 20.1, top: 50.8 },
    { left: 95.4, top: 70.2 },
    { left: 50.2, top: 5.9 },
    { left: 65.8, top: 95.1 },
    { left: 5.3, top: 35.7 },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleBuyNow = (productUrl) => {
    window.location.href = productUrl;
  };

  const getPositionClasses = (position) => {
    if (position === "left") {
      return "justify-start";
    } else {
      return "justify-end";
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      opacity: 0,
      scale: 1.15,
      rotateY: direction === "left" ? -15 : 15,
      z: -100,
    }),
    center: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0,
      transition: {
        duration: 1.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: (direction) => ({
      opacity: 0,
      scale: 0.9,
      rotateY: direction === "left" ? 12 : -12,
      z: -80,
      transition: {
        duration: 0.9,
        ease: [0.55, 0.085, 0.68, 0.53],
      },
    }),
  };

  const cardVariants = {
    enter: (position) => ({
      opacity: 0,
      x: position === "left" ? -100 : 100,
      y: 50,
      scale: 0.85,
      rotateX: 20,
    }),
    center: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        delay: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
    exit: (position) => ({
      opacity: 0,
      x: position === "left" ? -60 : 60,
      y: -40,
      scale: 0.9,
      rotateX: -15,
      transition: {
        duration: 0.6,
        ease: [0.55, 0.085, 0.68, 0.53],
      },
    }),
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#000d24]">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000d24] via-[#5646a3]/20 to-[#000d24] opacity-60 z-[1] pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          custom={slides[currentSlide].position}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
          style={{
            perspective: "2000px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <video
              className="w-full h-full object-cover scale-105"
              autoPlay
              loop
              muted
              playsInline
              key={slides[currentSlide].video}
            >
              <source src={slides[currentSlide].video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#000d24]/80 via-transparent to-[#000d24]/40" />
            <div className="absolute inset-0 bg-[#5646a3]/10" />
          </div>

          {/* Floating particles */}
          {isMounted && (
            <div className="absolute inset-0 z-[2] pointer-events-none">
              {particlePositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#fbf5ea] rounded-full opacity-30"
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          )}

          {/* Content Container - using Tailwind container with header spacing */}
          <div className="relative z-10 h-full pt-20 md:pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div
                className={`flex items-center h-full ${getPositionClasses(
                  slides[currentSlide].position
                )}`}
              >
                <motion.div
                  custom={slides[currentSlide].position}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full max-w-sm sm:max-w-md md:max-w-lg"
                  style={{
                    perspective: "1500px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Outer glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5646a3]/30 to-[#000d24]/30 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl transform scale-105 pointer-events-none" />

                  {/* Glass card */}
                  <div
                    className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0, 13, 36, 0.7) 0%, rgba(86, 70, 163, 0.4) 100%)",
                      backdropFilter: "blur(24px) saturate(180%)",
                      WebkitBackdropFilter: "blur(24px) saturate(180%)",
                      border: "1px solid rgba(251, 245, 234, 0.2)",
                      boxShadow:
                        "0 8px 32px 0 rgba(86, 70, 163, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {/* Shimmer effect */}
                    {isMounted && (
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fbf5ea]/10 to-transparent"
                          animate={{
                            x: ["-200%", "200%"],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 2,
                          }}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="relative p-6 sm:p-8 md:p-10">
                      {/* Corner accents */}
                      <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#5646a3]/20 to-transparent rounded-bl-full pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-[#5646a3]/20 to-transparent rounded-tr-full pointer-events-none" />

                      {/* Subtitle */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="relative inline-block mb-2 sm:mb-3 select-text"
                      >
                        <div className="absolute inset-0 bg-[#5646a3]/80 blur-lg rounded-full pointer-events-none" />
                        <p className="relative text-[#fbf5ea] text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/80 select-text">
                          {slides[currentSlide].subtitle}
                        </p>
                      </motion.div>

                      {/* Title - max 4xl */}
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 leading-tight select-text"
                        style={{
                          background:
                            "linear-gradient(135deg, #fbf5ea 0%, #aeacaf 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          textShadow: "0 2px 20px rgba(251, 245, 234, 0.3)",
                        }}
                      >
                        {slides[currentSlide].title}
                      </motion.h2>

                      {/* Divider */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="h-0.5 sm:h-1 w-16 sm:w-20 bg-gradient-to-r from-[#5646a3] to-[#fbf5ea]/50 rounded-full mb-3 sm:mb-4 pointer-events-none"
                      />

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="text-[#aeacaf] text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-6 font-normal select-text"
                      >
                        {slides[currentSlide].description}
                      </motion.p>

                      {/* Button */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        whileHover={{
                          scale: 1.08,
                          boxShadow: "0 0 40px rgba(86, 70, 163, 0.8)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          handleBuyNow(slides[currentSlide].productUrl)
                        }
                        className="relative group overflow-hidden px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base text-[#fbf5ea] shadow-2xl transition-all duration-300 cursor-pointer"
                        style={{
                          background:
                            "linear-gradient(135deg, #5646a3 0%, #7d6bc7 100%)",
                          boxShadow:
                            "0 10px 30px rgba(86, 70, 163, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        {isMounted && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                            animate={{
                              x: ["-200%", "200%"],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1,
                            }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                          Buy Now
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20 pointer-events-none">
        {slides.map((_, index) => (
          <motion.div key={index} className="relative">
            {index === currentSlide && isMounted && (
              <motion.div
                className="absolute inset-0 bg-[#5646a3] rounded-full blur-md"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <div
              className={`relative h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "w-8 sm:w-10 bg-gradient-to-r from-[#5646a3] to-[#7d6bc7]"
                  : "w-1.5 sm:w-2 bg-[#aeacaf]/40"
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Slide counter */}
      <div className="container relative">
        <div className="absolute top-24 md:top-28 right-10 z-20 pointer-events-none">
          <div
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[#fbf5ea] font-bold text-xs sm:text-sm select-none"
            style={{
              background: "rgba(0, 13, 36, 0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(251, 245, 234, 0.2)",
            }}
          >
            {String(currentSlide + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </div>
        </div>
      </div>
    </section>
  );
}
