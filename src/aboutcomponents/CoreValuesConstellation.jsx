"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Users,
  Award,
  Sprout,
  FlaskConical,
  Heart,
  Sparkles,
  Target,
} from "lucide-react";

const CoreValuesConstellation = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);

  const coreValues = [
    {
      id: "integrity",
      name: "Integrity",
      description:
        "We uphold the highest standards of transparency, ethics, and accountability in everything we do.",
      icon: Shield,
      color: "from-blue-500 to-blue-700",
    },
    {
      id: "collaboration",
      name: "Collaboration",
      description:
        "We believe in the power of teamwork and partnerships to drive meaningful change.",
      icon: Users,
      color: "from-green-500 to-green-700",
    },
    {
      id: "excellence",
      name: "Excellence",
      description:
        "We are committed to delivering exceptional quality in our products, services, and relationships.",
      icon: Award,
      color: "from-yellow-500 to-yellow-700",
    },
    {
      id: "sustainability",
      name: "Sustainability",
      description:
        "We focus on creating long term value that benefits communities, organizations, and the planet.",
      icon: Sprout,
      color: "from-emerald-500 to-emerald-700",
    },
    {
      id: "innovation",
      name: "Innovation",
      description:
        "We push the boundaries of AI and healthcare technology to deliver transformative solutions.",
      icon: FlaskConical,
      color: "from-purple-500 to-purple-700",
    },
    {
      id: "empathy",
      name: "Empathy",
      description:
        "Our solutions are designed with a deep understanding of the needs of individuals and organizations.",
      icon: Heart,
      color: "from-pink-500 to-pink-700",
    },
    {
      id: "empowerment",
      name: "Empowerment",
      description:
        "We equip our employees, partners, and users with tools to succeed and thrive.",
      icon: Sparkles,
      color: "from-indigo-500 to-indigo-700",
    },
  ];

  const radius = 280;
  const centerX = 350;
  const centerY = 350;

  const getValuePosition = (index, total) => {
    const angle = (360 / total) * index - 90; // Start from top
    const angleRad = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleRad),
      y: centerY + radius * Math.sin(angleRad),
      angle: angle,
    };
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-4 overflow-hidden">
      <div className="container">
        {/* Title and Description */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            <span className="relative">Our</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-gray-800">
              Core Values
            </span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-base md:text-xl text-gray-700 leading-relaxed font-medium">
              Core values define our foundation, driving integrity, innovation,
              teamwork, customer focus, and excellence to achieve sustainable
              success and growth.
            </p>
          </div>
        </motion.div>

        {/* Desktop Constellation View */}
        <div className="hidden lg:block">
          <div className="relative w-[700px] h-[700px] mx-auto">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-8 top-1/4 w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-40 blur-2xl"></div>
              <div className="absolute right-8 top-1/3 w-32 h-32 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute left-12 bottom-1/4 w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute right-16 bottom-1/3 w-28 h-28 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full opacity-35 blur-3xl"></div>
            </div>

            {/* SVG for connecting lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 700 700"
            >
              {coreValues.map((value, index) => {
                const position = getValuePosition(index, coreValues.length);
                return (
                  <motion.line
                    key={`line-${value.id}`}
                    x1={centerX}
                    y1={centerY}
                    x2={position.x}
                    y2={position.y}
                    stroke="rgba(75, 85, 99, 0.3)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.4 + index * 0.1,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
            </svg>

            {/* Central Core Icon */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-2xl border-4 border-white z-10"
              style={{
                left: centerX - 64,
                top: centerY - 64,
              }}
            >
              <Target className="w-12 h-12 text-white" />
            </motion.div>

            {/* Central Popup Display Area */}
            <AnimatePresence mode="wait">
              {hoveredValue && (
                <motion.div
                  key={hoveredValue}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute z-50 w-96 p-6 bg-white rounded-2xl shadow-2xl border-2 border-gray-200"
                  style={{
                    left: centerX - 192, // Center the 384px (w-96) card
                    top: centerY - 100,
                  }}
                >
                  {(() => {
                    const value = coreValues.find((v) => v.id === hoveredValue);
                    if (!value) return null;
                    const IconComponent = value.icon;
                    return (
                      <>
                        <div className="flex items-center mb-4">
                          <div
                            className={`w-12 h-12 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center mr-4 shadow-lg`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-gray-900 font-bold text-2xl">
                            {value.name}
                          </h3>
                        </div>
                        <p className="text-gray-700 text-base leading-relaxed">
                          {value.description}
                        </p>
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Value Nodes */}
            {coreValues.map((value, index) => {
              const position = getValuePosition(index, coreValues.length);
              const IconComponent = value.icon;

              return (
                <motion.div
                  key={value.id}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + index * 0.1,
                    ease: "backOut",
                  }}
                  whileHover={{ scale: 1.1 }}
                  className="absolute cursor-pointer group"
                  style={{
                    left: position.x - 60,
                    top: position.y - 60,
                  }}
                  onMouseEnter={() => setHoveredValue(value.id)}
                  onMouseLeave={() => setHoveredValue(null)}
                  onClick={() =>
                    setSelectedValue(
                      selectedValue === value.id ? null : value.id
                    )
                  }
                >
                  <div className="w-28 h-28 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-gray-200 group-hover:border-gray-300 group-hover:shadow-2xl transition-all duration-300">
                    <IconComponent className="w-10 h-10 text-gray-800" />
                  </div>

                  {/* Value name */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span className="text-gray-800 text-sm font-bold px-4 py-2 bg-white rounded-full shadow-lg border border-gray-200">
                      {value.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet Accordion View */}
        <div className="lg:hidden space-y-4">
          {/* Central Core - Mobile */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gray-800 to-gray-900 hidden lg:flex items-center justify-center shadow-xl border-4 border-white mb-12"
          >
            <Target className="w-8 h-8 text-white" />
          </motion.div>

          {/* Values Stack */}
          {coreValues.map((value, index) => {
            const IconComponent = value.icon;
            const isSelected = selectedValue === value.id;

            return (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <button
                  onClick={() => setSelectedValue(isSelected ? null : value.id)}
                  className="w-full p-6 flex items-center space-x-4 cursor-pointer text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg`}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-bold text-xl">
                      {value.name}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isSelected ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isSelected ? "auto" : 0,
                    opacity: isSelected ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-6 border-t-2 border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesConstellation;
