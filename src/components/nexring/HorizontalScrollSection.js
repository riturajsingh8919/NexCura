"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IoDiamondOutline } from "react-icons/io5";
import { TbActivityHeartbeat } from "react-icons/tb";
import { HiOutlineSparkles } from "react-icons/hi2";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Link from "next/link";

export default function HorizontalScrollSection() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);

  const slides = [
    {
      id: 1,
      video: "/ring/02.mp4",
      title: "Smarter Health Starts With NexCura",
      description:
        "Experience AI-driven analytics that deliver real-time insights, personalized recommendations, and predictive wellness guidance.",
      icon: IoDiamondOutline,
      textPosition: "right",
    },
    {
      id: 2,
      video: "/ring/03.mp4",
      title: "Meet NxRing - Your Health Companion",
      description:
        "Track your vitals, activity, and sleep with precision. NxRing continuously syncs real-time data to NexCura, giving you a complete picture of your wellbeing.",
      icon: TbActivityHeartbeat,
      textPosition: "left",
    },
    {
      id: 3,
      video: "/ring/04.mp4",
      title: "Engineered For Precision. Designed For Comfort",
      description:
        "NxRing combines advanced multi-sensor technology with an ultra-light 3g titanium design for effortless, all-day wear. Water-resistant and built to perform, it delivers unmatched accuracy and reliability.",
      icon: HiOutlineSparkles,
      textPosition: "right",
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${slides.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Glassmorphism Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(86, 70, 163, 0.15) 0%, rgba(0, 13, 36, 0.95) 50%, rgba(86, 70, 163, 0.15) 100%)",
            backdropFilter: "blur(20px)",
          }}
        />

        {/* Section Title Header */}
        <div className="absolute top-0 left-0 right-0 z-30 pt-16 md:pt-20 pb-4 md:pb-6 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-black mb-2"
            style={{
              background: "linear-gradient(135deg, #fbf5ea 0%, #aeacaf 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 4px 30px rgba(251, 245, 234, 0.3)",
            }}
          >
            Predict. Prevent. Protect.
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-0.5 w-24 mx-auto bg-gradient-to-r from-[#5646a3] to-[#fbf5ea]/50 rounded-full"
          />
        </div>

        {/* Horizontal Scrolling Content */}
        <motion.div
          style={{ x }}
          className="flex h-full relative z-10 pt-28 md:pt-32 pb-8"
        >
          {slides.map((slide, index) => {
            const Icon = slide.icon;
            const isLeft = slide.textPosition === "left";

            return (
              <div
                key={slide.id}
                className="relative flex-shrink-0 w-screen h-auto flex items-center justify-center px-4 md:px-8 lg:px-12"
              >
                <div className="w-full max-w-6xl mx-auto">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center ${
                      !isLeft ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Text Card */}
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                      className={`order-2 ${
                        !isLeft ? "lg:order-1" : "lg:order-1"
                      }`}
                      style={{
                        order: isLeft ? 1 : 2,
                      }}
                    >
                      <div
                        className="relative p-6 md:p-8 lg:p-9 rounded-2xl md:rounded-3xl"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(251, 245, 234, 0.9) 100%)",
                          backdropFilter: "blur(20px)",
                          boxShadow:
                            "0 15px 45px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 1)",
                          border: "1px solid rgba(255, 255, 255, 0.5)",
                          transform: "perspective(1000px) rotateY(0deg)",
                          transition: "transform 0.6s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = isLeft
                            ? "perspective(1000px) rotateY(-5deg)"
                            : "perspective(1000px) rotateY(5deg)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform =
                            "perspective(1000px) rotateY(0deg)";
                        }}
                      >
                        {/* Decorative corner accent */}
                        <div
                          className="absolute top-0 right-0 w-24 h-24 md:w-28 md:h-28 opacity-30 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(135deg, transparent 50%, rgba(86, 70, 163, 0.2) 50%)",
                            borderTopRightRadius: "1rem",
                          }}
                        />

                        {/* Icon */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                          }}
                          viewport={{ once: true }}
                          className="inline-flex p-3 md:p-3.5 rounded-xl md:rounded-2xl mb-4"
                          style={{
                            background:
                              "linear-gradient(135deg, #5646a3 0%, #7c6bb8 100%)",
                            boxShadow: "0 6px 20px rgba(86, 70, 163, 0.4)",
                          }}
                        >
                          <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                        </motion.div>

                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 text-[#000d24] leading-tight">
                          {slide.title}
                        </h2>

                        {/* Description */}
                        <p className="text-sm md:text-base text-gray-700 mb-5 md:mb-6 leading-relaxed">
                          {slide.description}
                        </p>

                        {/* Buy Now Button */}
                        <Link href={"/products"}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 rounded-full font-bold text-sm md:text-base transition-all duration-300 cursor-pointer"
                            style={{
                              background:
                                "linear-gradient(135deg, #5646a3 0%, #7c6bb8 100%)",
                              boxShadow: "0 6px 20px rgba(86, 70, 163, 0.4)",
                              color: "white",
                            }}
                          >
                            <span>Preorder Now</span>
                            <HiOutlineShoppingCart className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>

                    {/* Video Card */}
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                      className={`order-1 ${
                        !isLeft ? "lg:order-2" : "lg:order-2"
                      }`}
                      style={{
                        order: isLeft ? 2 : 1,
                      }}
                    >
                      <div
                        className="relative rounded-2xl md:rounded-3xl overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(251, 245, 234, 0.05) 100%)",
                          backdropFilter: "blur(10px)",
                          boxShadow:
                            "0 15px 45px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          transform: "perspective(1000px) rotateY(0deg)",
                          transition: "transform 0.6s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = isLeft
                            ? "perspective(1000px) rotateY(5deg)"
                            : "perspective(1000px) rotateY(-5deg)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform =
                            "perspective(1000px) rotateY(0deg)";
                        }}
                      >
                        <video
                          className="w-full h-full object-cover rounded-xl md:rounded-2xl"
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={{
                            aspectRatio: "16/10",
                          }}
                        >
                          <source src={slide.video} type="video/mp4" />
                        </video>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
