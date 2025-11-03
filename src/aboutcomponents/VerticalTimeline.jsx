"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lightbulb, Users, Handshake, TrendingUp, Rocket } from "lucide-react";

const timelineSteps = [
  {
    id: 1,
    title: "Innovation at the Core",
    description:
      "We began with a simple yet powerful vision — to merge healthcare with AI and create smarter, more accessible medical solutions for everyone.",
    icon: Lightbulb,
  },
  {
    id: 2,
    title: "Empowering Individuals",
    description:
      "Our technology empowers people to take control of their health, offering meaningful insights that guide better choices and proactive care.",
    icon: Users,
  },
  {
    id: 3,
    title: "Collaboration with Experts",
    description:
      "We work alongside healthcare professionals and research institutions, ensuring that every recommendation is medically reliable and grounded in science.",
    icon: Handshake,
  },
  {
    id: 4,
    title: "Continuous Improvement",
    description:
      "AI never stops learning — and neither do we. Our solutions evolve with new data, feedback, and technological breakthroughs to serve you better every day.",
    icon: TrendingUp,
  },
  {
    id: 5,
    title: "Shaping the Future of Healthcare",
    description:
      "From personalized health plans to predictive analytics, we're driving the future of healthcare — where prevention, care, and well-being are seamlessly connected.",
    icon: Rocket,
  },
];

const VerticalTimeline = () => {
  const [activeStep, setActiveStep] = useState(1);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Transform scroll progress to timeline progress (0 to 1)
  const timelineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const observers = [];

    timelineSteps.forEach((step) => {
      const element = document.getElementById(`step-${step.id}`);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveStep(step.id);
            }
          },
          {
            root: null,
            rootMargin: "-50% 0px -50% 0px",
            threshold: 0,
          }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
            Our Journey
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Discover how we're transforming healthcare through innovation,
            collaboration, and continuous improvement
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          <div className="flex flex-col md:flex-row">
            {/* Timeline Line - Left Side (Hidden on Mobile, Shown on Desktop) */}
            <div className="hidden md:block relative w-16 lg:w-20 flex-shrink-0">
              {/* Background Line */}
              <div className="absolute left-6 lg:left-10 top-0 w-0.5 h-full bg-gray-200"></div>

              {/* Animated Progress Line */}
              <motion.div
                className="absolute left-6 lg:left-10 top-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 origin-top"
                style={{
                  scaleY: timelineProgress,
                }}
              />

              {/* Timeline Dots */}
              {timelineSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = activeStep >= step.id;

                return (
                  <motion.div
                    key={step.id}
                    className="absolute left-2 lg:left-6 flex items-center justify-center"
                    style={{
                      top: `${index * 20}%`,
                    }}
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{
                      scale: isActive ? 1.2 : 0.8,
                      opacity: isActive ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-blue-100 border-2 border-blue-400 shadow-lg shadow-blue-200"
                          : "bg-white border-2 border-gray-300"
                      }`}
                    >
                      <IconComponent
                        className={`w-4 h-4 ${
                          isActive ? "text-blue-600" : "text-gray-400"
                        }`}
                        strokeWidth={2}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Content - Right Side (Full Width on Mobile) */}
            <div className="flex-1 md:pl-6 lg:pl-8">
              {timelineSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = activeStep === step.id;

                return (
                  <motion.div
                    key={step.id}
                    id={`step-${step.id}`}
                    className="mb-16 md:mb-24 lg:mb-32 last:mb-0"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div
                      className={`bg-white rounded-xl md:rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border transition-all duration-500 ${
                        isActive
                          ? "border-blue-200 shadow-xl shadow-blue-100/50 md:scale-105"
                          : "border-gray-100 hover:border-gray-200 hover:shadow-xl"
                      }`}
                    >
                      {/* Step Number & Icon */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-200"
                              : "bg-gray-50 border-2 border-gray-200"
                          }`}
                        >
                          <IconComponent
                            className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${
                              isActive ? "text-blue-600" : "text-gray-500"
                            }`}
                            strokeWidth={1.5}
                          />
                        </div>

                        <div className="flex-1">
                          <div
                            className={`text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 ${
                              isActive ? "text-blue-600" : "text-gray-500"
                            }`}
                          >
                            Step {step.id}
                          </div>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                        {step.description}
                      </p>

                      {/* Decorative Line */}
                      <div className="mt-6 flex">
                        <div
                          className={`h-1 rounded-full transition-all duration-500 ${
                            isActive
                              ? "w-16 sm:w-20 bg-gradient-to-r from-blue-400 to-purple-400"
                              : "w-10 sm:w-12 bg-gray-200"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalTimeline;
