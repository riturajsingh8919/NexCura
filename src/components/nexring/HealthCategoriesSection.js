"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaFemale,
  FaBrain,
  FaSpa,
  FaMoon,
  FaRunning,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

export default function HealthCategoriesSection() {
  const [expandedCard, setExpandedCard] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (expandedCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [expandedCard]);

  const healthCategories = [
    {
      id: 1,
      icon: FaHeart,
      title: "Heart Health",
      tagline: "Listen to what your heart is",
      taglineItalic: "telling you",
      color: "#ef4444",
      bgImage: "/heart-health.JPG",
      description:
        "Better nights make for better days. With NexRing, wake up to in-depth heart rate analysis and deeper insight into your cardiovascular health.",
      testimonial: {
        name: "Sarah M.",
        role: "Member Spotlight",
        quote:
          "NexRing helps me stay on top of my heart health and detect patterns I never noticed before.",
      },
      chartData: [
        { day: "Mon", bpm: 65 },
        { day: "Tue", bpm: 68 },
        { day: "Wed", bpm: 62 },
        { day: "Thu", bpm: 70 },
        { day: "Fri", bpm: 67 },
        { day: "Sat", bpm: 64 },
        { day: "Sun", bpm: 66 },
      ],
      stats: {
        label: "Resting HR",
        value: "65",
        unit: "bpm",
        status: "Optimal",
      },
    },
    {
      id: 2,
      icon: FaFemale,
      title: "Women's Health",
      tagline: "Understand the ins and outs of",
      taglineItalic: "women's health",
      color: "#ec4899",
      bgImage: "/pregnant-women.jpg",
      description:
        "Track your cycle, understand your body temperature patterns, and get personalized insights for every phase of your cycle.",
      testimonial: {
        name: "Emily R.",
        role: "Member Spotlight",
        quote:
          "Tracking my cycle has never been easier. NexRing helps me understand my body better every day.",
      },
      chartData: [
        { phase: "Menstrual", temp: 36.4, label: "M" },
        { phase: "Follicular", temp: 36.3, label: "F" },
        { phase: "Ovulation", temp: 36.8, label: "O" },
        { phase: "Luteal", temp: 37.0, label: "L" },
      ],
      stats: {
        label: "Body Temp",
        value: "36.8",
        unit: "°C",
        status: "Normal",
      },
    },
    {
      id: 3,
      icon: FaBrain,
      title: "Stress",
      tagline: "Put your stress to",
      taglineItalic: "the test",
      color: "#3b82f6",
      bgImage: "/stress-test.jpg",
      description:
        "Monitor your stress levels throughout the day and get actionable insights to help you find balance and improve resilience.",
      testimonial: {
        name: "Michael T.",
        role: "Member Spotlight",
        quote:
          "The stress insights help me manage my workload and take breaks when I need them most.",
      },
      chartData: [
        { name: "Low", value: 35, fill: "#10b981" },
        { name: "Medium", value: 45, fill: "#f59e0b" },
        { name: "High", value: 20, fill: "#ef4444" },
      ],
      stats: { label: "Stress Level", value: "32", unit: "%", status: "Low" },
    },
    {
      id: 4,
      icon: FaSpa,
      title: "Wellness and Longevity",
      tagline: "Don't just live longer,",
      taglineItalic: "live healthier",
      color: "#10b981",
      bgImage: "/live-healthy.jpg",
      description:
        "Little changes add up. Focus on the health metrics that impact how you feel each day, so you feel better long term.",
      testimonial: {
        name: "Lindsay H.",
        role: "Member Spotlight",
        quote:
          "NexRing empowers me to be more proactive in my health journey to live longer, happier life.",
      },
      chartData: [
        { day: "Mon", readiness: 85 },
        { day: "Tue", readiness: 88 },
        { day: "Wed", readiness: 90 },
        { day: "Thu", readiness: 86 },
        { day: "Fri", readiness: 89 },
        { day: "Sat", readiness: 92 },
        { day: "Sun", readiness: 91 },
      ],
      stats: { label: "Readiness", value: "89", unit: "", status: "Optimal" },
    },
    {
      id: 5,
      icon: FaMoon,
      title: "Sleep and Rest",
      tagline: "Get the best sleep of",
      taglineItalic: "your life",
      color: "#6366f1",
      bgImage: "/best-sleep.jpg",
      description:
        "Better nights make for better days. Wake up to in-depth sleep analysis and deeper insight into your blood oxygen levels.",
      testimonial: {
        name: "Lisa D.",
        role: "Member Spotlight",
        quote:
          "I've learned that sleep is the most underrated recovery tool out there.",
      },
      chartData: [
        { name: "Deep", value: 1.5, fill: "#10b981", percentage: 19 },
        { name: "Light", value: 4.2, fill: "#3b82f6", percentage: 53 },
        { name: "REM", value: 1.8, fill: "#6366f1", percentage: 23 },
        { name: "Awake", value: 0.4, fill: "#ef4444", percentage: 5 },
      ],
      totalSleep: 7.9,
      stats: { label: "Sleep Score", value: "87", unit: "", status: "Good" },
    },
    {
      id: 6,
      icon: FaRunning,
      title: "Activity and Fitness",
      tagline: "Bring your fitness goals",
      taglineItalic: "into focus",
      color: "#f59e0b",
      bgImage: "/fitness-goals.jpg",
      description:
        "Track your daily activity, monitor calories burned, and stay motivated to reach your fitness goals with detailed insights.",
      testimonial: {
        name: "James K.",
        role: "Member Spotlight",
        quote:
          "The activity tracking motivates me to stay consistent with my workouts every single day.",
      },
      chartData: [
        { day: "Mon", calories: 450 },
        { day: "Tue", calories: 520 },
        { day: "Wed", calories: 380 },
        { day: "Thu", calories: 600 },
        { day: "Fri", calories: 490 },
        { day: "Sat", calories: 650 },
        { day: "Sun", calories: 420 },
      ],
      stats: {
        label: "Activity",
        value: "8,547",
        unit: "steps",
        status: "Active",
      },
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-950 backdrop-blur-md border border-[#d4af37]/30 rounded-lg px-3 py-2 shadow-lg">
          <p className="text-white text-sm font-semibold">
            {label || payload[0].name}
          </p>
          <p className="text-white text-xs">
            {payload[0].name}:{" "}
            <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = (category) => {
    if (category.id === 1) {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={category.chartData}>
            <defs>
              <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={category.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={category.color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              stroke="#333"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#333" }}
            />
            <YAxis
              stroke="#333"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#333" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="bpm"
              stroke={category.color}
              strokeWidth={3}
              fill="url(#heartGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    } else if (category.id === 2) {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={category.chartData}>
            <defs>
              <linearGradient id="womenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={category.color} stopOpacity={1} />
                <stop
                  offset="100%"
                  stopColor={category.color}
                  stopOpacity={0.6}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              stroke="#333"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#333" }}
            />
            <YAxis
              stroke="#333"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#333" }}
              domain={[36, 37.2]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="temp"
              fill="url(#womenGradient)"
              radius={[10, 10, 0, 0]}
              animationDuration={1500}
            >
              <LabelList
                dataKey="temp"
                position="top"
                style={{ fill: "#fff", fontSize: "12px", fontWeight: "bold" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (category.id === 3) {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="90%"
            data={category.chartData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              minAngle={15}
              background={{ fill: "rgba(0,0,0,0.05)" }}
              clockWise
              dataKey="value"
              cornerRadius={10}
              animationDuration={1500}
            >
              <LabelList
                dataKey="value"
                position="insideStart"
                fill="#333"
                fontSize={14}
                fontWeight="bold"
                formatter={(value) => `${value}%`}
              />
            </RadialBar>
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ fontSize: "12px", color: "#333" }}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadialBarChart>
        </ResponsiveContainer>
      );
    } else if (category.id === 4) {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={category.chartData}>
            <defs>
              <linearGradient id="wellnessGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={category.color}
                  stopOpacity={0.8}
                />
                <stop offset="95%" stopColor={category.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              stroke="#333"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#333" }}
            />
            <YAxis
              stroke="#333"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#333" }}
              domain={[80, 95]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="readiness"
              stroke={category.color}
              strokeWidth={3}
              fill="url(#wellnessGradient)"
              dot={{ fill: category.color, r: 5 }}
              animationDuration={1500}
            >
              <LabelList
                dataKey="readiness"
                position="top"
                style={{ fill: "#333", fontSize: "11px", fontWeight: "bold" }}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      );
    } else if (category.id === 5) {
      return (
        <div className="relative">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={category.chartData}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
                animationDuration={1500}
              >
                {category.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <LabelList
                  dataKey="value"
                  position="outside"
                  style={{ fill: "#333", fontSize: "12px", fontWeight: "bold" }}
                  formatter={(value) => `${value}h`}
                />
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 gap-2 mt-4 px-2">
            {category.chartData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: entry.fill }}
                />
                <span className="text-xs text-gray-700 font-medium">
                  {entry.name} {entry.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (category.id === 6) {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={category.chartData}>
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={category.color} stopOpacity={1} />
                <stop
                  offset="100%"
                  stopColor={category.color}
                  stopOpacity={0.6}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              stroke="#333"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#333" }}
            />
            <YAxis
              stroke="#333"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#333" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="calories"
              fill="url(#activityGradient)"
              radius={[10, 10, 0, 0]}
              animationDuration={1500}
            >
              <LabelList
                dataKey="calories"
                position="top"
                style={{ fill: "#333", fontSize: "11px", fontWeight: "bold" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };

  const expandedCategory = healthCategories.find(
    (cat) => cat.id === expandedCard
  );

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#001233] via-black to-black overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Section Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center text-white leading-tight mb-12 md:mb-20"
        >
          NexRing gives your body a voice
        </motion.h2>
      </div>

      {/* Cards Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {healthCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                onClick={() => setExpandedCard(category.id)}
                className="group cursor-pointer"
              >
                <div
                  className="relative rounded-2xl md:rounded-3xl overflow-hidden h-[380px] sm:h-[420px] md:h-[460px] transform transition-all duration-500 group-hover:-translate-y-2"
                  style={{
                    boxShadow:
                      "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    border: "2px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${category.bgImage})`,
                      filter: "brightness(0.7)",
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/40" />

                  {/* 3D Border Effect */}
                  <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-t-2 border-l-2 border-white/20 pointer-events-none" />
                  <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-b-2 border-r-2 border-black/40 pointer-events-none" />

                  <div className="relative h-full flex flex-col justify-between p-5 md:p-7">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 transition-all duration-300 group-hover:bg-white/20 shadow-lg">
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        <span className="text-white font-semibold text-xs md:text-sm">
                          {category.title}
                        </span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.15, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 text-gray-900"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 4v16m8-8H4" />
                        </svg>
                      </motion.button>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
                        {category.tagline}
                      </h3>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white italic leading-tight drop-shadow-lg">
                        {category.taglineItalic}
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {expandedCard && expandedCategory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setExpandedCard(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />

            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-6 lg:p-8 pointer-events-none">
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                className="relative w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden pointer-events-auto shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(251, 245, 234, 0.98) 50%, rgba(212, 175, 55, 0.1) 100%)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  boxShadow:
                    "0 20px 60px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                }}
              >
                <button
                  onClick={() => setExpandedCard(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/50 backdrop-blur-md border border-[#d4af37]/30 flex items-center justify-center hover:bg-white/70 transition-all duration-300 group shadow-lg cursor-pointer"
                >
                  <IoClose className="w-6 h-6 md:w-7 md:h-7 text-gray-900 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                <div className="relative h-full max-h-[90vh] overflow-y-auto custom-scrollbar-light">
                  <div className="p-6 md:p-8 lg:p-12">
                    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-[#d4af37]/30 w-fit mb-6 shadow-sm">
                      <expandedCategory.icon className="w-5 h-5 text-gray-900" />
                      <span className="text-gray-900 font-semibold text-sm">
                        {expandedCategory.title}
                      </span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
                      <div className="space-y-5">
                        <div>
                          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-2">
                            {expandedCategory.tagline}
                          </h2>
                          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 italic leading-tight">
                            {expandedCategory.taglineItalic}
                          </h2>
                        </div>

                        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                          {expandedCategory.description}
                        </p>

                        <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-5 border border-[#d4af37]/20 shadow-sm">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#fbf5ea]/30 flex items-center justify-center flex-shrink-0 border border-[#d4af37]/20">
                              <expandedCategory.icon className="w-6 h-6 text-gray-900" />
                            </div>
                            <div>
                              <h4 className="text-gray-900 font-bold text-base">
                                {expandedCategory.testimonial.name}
                              </h4>
                              <p className="text-gray-600 text-xs">
                                {expandedCategory.testimonial.role}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-700 italic text-sm leading-relaxed">
                            {expandedCategory.testimonial.quote}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-5 border border-[#d4af37]/20 shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600 text-sm font-medium">
                              {expandedCategory.stats.label}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-bold text-gray-900 bg-[#d4af37]/20 border border-[#d4af37]/30">
                              {expandedCategory.stats.status}
                            </span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                              {expandedCategory.stats.value}
                            </span>
                            <span className="text-xl md:text-2xl text-gray-600 font-medium">
                              {expandedCategory.stats.unit}
                            </span>
                          </div>
                        </div>

                        <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl p-5 border border-[#d4af37]/20 shadow-sm">
                          {renderChart(expandedCategory)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar-light::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar-light::-webkit-scrollbar-track {
          background: rgba(212, 175, 55, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar-light::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar-light::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.6);
        }
      `}</style>
    </section>
  );
}
