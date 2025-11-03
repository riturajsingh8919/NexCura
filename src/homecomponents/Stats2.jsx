"use client";

import { motion } from "framer-motion";
import { Brain, Scale, Apple, Clock, Heart, Flower2 } from "lucide-react";

const healthPillars = [
  {
    id: 1,
    title: "Mental Health",
    description: "Manage stress effectively and maintain emotional well-being",
    icon: Brain,
    color: "#3B82F6",
    bgGradient: "from-blue-500 to-blue-600",
    size: "large",
  },
  {
    id: 2,
    title: "Weight Control",
    description: "Hit Your Goal",
    icon: Scale,
    color: "#10B981",
    bgGradient: "from-emerald-500 to-emerald-600",
    size: "medium",
  },
  {
    id: 3,
    title: "Nutrition",
    description: "Balanced Diet",
    icon: Apple,
    color: "#F59E0B",
    bgGradient: "from-amber-500 to-amber-600",
    size: "medium",
  },
  {
    id: 4,
    title: "Longevity",
    description: "Long Term Health",
    icon: Clock,
    color: "#8B5CF6",
    bgGradient: "from-violet-500 to-violet-600",
    size: "large",
  },
  {
    id: 5,
    title: "Medical Care",
    description: "Regular health checkups",
    icon: Heart,
    color: "#EF4444",
    bgGradient: "from-red-500 to-red-600",
    size: "medium",
  },
  {
    id: 6,
    title: "Wellness",
    description: "Holistic well-being",
    icon: Flower2,
    color: "#06B6D4",
    bgGradient: "from-cyan-500 to-cyan-600",
    size: "medium",
  },
];

const BentoCard = ({ pillar, index, className }) => {
  const IconComponent = pillar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 },
      }}
      className={`${className} bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl 
                 transition-all duration-300 relative overflow-hidden group`}
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${pillar.bgGradient} 
                     opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
      />

      {/* Number Badge */}
      {/* <div
        className={`absolute top-4 right-4 w-8 h-8 bg-gradient-to-br ${pillar.bgGradient} 
                     rounded-full flex items-center justify-center shadow-lg`}
      >
        <span className="text-white text-sm font-bold">{index + 1}</span>
      </div> */}

      {/* Content - Simple top to bottom layout */}
      <div className="relative z-10 flex flex-col items-center text-center h-full">
        {/* Icon */}
        <div
          className={`w-16 h-16 bg-gradient-to-br ${pillar.bgGradient} 
                       rounded-2xl flex items-center justify-center mb-4 shadow-lg 
                       group-hover:scale-110 transition-transform duration-300`}
        >
          <IconComponent size={28} className="text-white" />
        </div>

        {/* Title */}
        <h3
          className="text-base font-bold text-gray-900 group-hover:text-blue-600 
                       transition-colors duration-300 mb-2 leading-tight"
        >
          {pillar.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600 leading-relaxed text-center">
          {pillar.description}
        </p>
      </div>

      {/* Hover Effect Decoration */}
      <div
        className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${pillar.bgGradient} 
                     group-hover:w-full transition-all duration-500`}
      />
    </motion.div>
  );
};

export default function BentoGridInfographic() {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-18 px-4">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Healthy{" "}
            <span
              className="bg-gradient-to-r from-blue-600 to-purple-600 
                              bg-clip-text text-transparent"
            >
              Lifestyle
            </span>{" "}
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {/* Row 1 */}
          <BentoCard pillar={healthPillars[0]} index={0} className="h-full" />
          <BentoCard pillar={healthPillars[1]} index={1} className="h-full" />

          {/* Row 2 */}
          <BentoCard pillar={healthPillars[2]} index={2} className="h-full" />
          <BentoCard pillar={healthPillars[3]} index={3} className="h-full" />

          {/* Row 3 */}
          <BentoCard pillar={healthPillars[4]} index={4} className="h-full" />
          <BentoCard pillar={healthPillars[5]} index={5} className="h-full" />
        </div>
      </div>
    </section>
  );
}
