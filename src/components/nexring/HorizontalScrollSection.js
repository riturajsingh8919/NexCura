"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IoDiamondOutline } from "react-icons/io5";
import { TbActivityHeartbeat } from "react-icons/tb";
import { HiOutlineSparkles } from "react-icons/hi2";
import { RiLeafLine } from "react-icons/ri";
import { HiOutlineShoppingCart } from "react-icons/hi";

export default function HorizontalScrollSection() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);

  const slides = [
    {
      id: 1,
      video: "/ring/01.mp4",
      title: "Durable titanium frame",
      description:
        "Engineered with aerospace-grade titanium for unmatched durability. Water-resistant and scratch-proof, built to withstand your active lifestyle.",
      icon: IoDiamondOutline,
      textPosition: "left",
    },
    {
      id: 2,
      video: "/ring/02.mp4",
      title: "Health insights enhanced by NexCura AI",
      description:
        "Experience the power of AI-driven health analytics. Real-time insights, personalized recommendations, and predictive wellness guidance.",
      icon: TbActivityHeartbeat,
      textPosition: "right",
    },
    {
      id: 3,
      video: "/ring/03.mp4",
      title: "Precise monitoring with three sensors",
      description:
        "Triple sensor technology delivers medical-grade accuracy. Track heart rate, SpO2, and body temperature with unprecedented precision.",
      icon: HiOutlineSparkles,
      textPosition: "left",
    },
    {
      id: 4,
      video: "/ring/04.mp4",
      title: "Elegant, lightweight design",
      description:
        "Weighing less than 5 grams, the NexRing combines minimalist aesthetics with maximum comfort. Barely there, beautifully engineered.",
      icon: RiLeafLine,
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

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-300%"]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${slides.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Glassmorphism Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(86, 70, 163, 0.15) 0%, rgba(0, 13, 36, 0.95) 50%, rgba(86, 70, 163, 0.15) 100%)",
            backdropFilter: "blur(20px)",
          }}
        />

        <motion.div style={{ x }} className="flex h-full relative z-10">
          {slides.map((slide, index) => {
            const Icon = slide.icon;
            const isLeft = slide.textPosition === "left";

            return (
              <div
                key={slide.id}
                className="relative flex-shrink-0 w-screen h-screen flex items-center justify-center px-6 md:px-12 lg:px-20"
              >
                <div className="w-full max-w-7xl mx-auto">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
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
                        className="relative p-8 md:p-10 lg:p-12 rounded-3xl"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(251, 245, 234, 0.9) 100%)",
                          backdropFilter: "blur(20px)",
                          boxShadow:
                            "0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 1)",
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
                          className="absolute top-0 right-0 w-32 h-32 opacity-30"
                          style={{
                            background:
                              "linear-gradient(135deg, transparent 50%, rgba(86, 70, 163, 0.2) 50%)",
                            borderTopRightRadius: "1.5rem",
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
                          className="inline-flex p-4 rounded-2xl mb-6"
                          style={{
                            background:
                              "linear-gradient(135deg, #5646a3 0%, #7c6bb8 100%)",
                            boxShadow: "0 8px 24px rgba(86, 70, 163, 0.4)",
                          }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-[#000d24] leading-tight">
                          {slide.title}
                        </h2>

                        {/* Description */}
                        <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                          {slide.description}
                        </p>

                        {/* Buy Now Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300"
                          style={{
                            background:
                              "linear-gradient(135deg, #5646a3 0%, #7c6bb8 100%)",
                            boxShadow: "0 8px 24px rgba(86, 70, 163, 0.4)",
                            color: "white",
                          }}
                        >
                          <span>Buy Now</span>
                          <HiOutlineShoppingCart className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
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
                        className="relative rounded-3xl overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(251, 245, 234, 0.05) 100%)",
                          backdropFilter: "blur(10px)",
                          boxShadow:
                            "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
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
                          className="w-full h-full object-cover rounded-2xl"
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

                        {/* Slide Number Badge */}
                        <div
                          className="absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-bold"
                          style={{
                            background: "rgba(255, 255, 255, 0.95)",
                            color: "#5646a3",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          {String(index + 1).padStart(2, "0")} /{" "}
                          {String(slides.length).padStart(2, "0")}
                        </div>
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
