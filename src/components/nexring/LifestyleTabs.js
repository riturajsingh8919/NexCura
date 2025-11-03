"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function LifestyleTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      title: "Starting your day",
      image: "/accuracy/starting-day.jpg",
      chart1Type: "bar",
      chart1Data: [
        { time: "5 AM", sleep: 8.5 },
        { time: "6 AM", sleep: 7.5 },
        { time: "7 AM", sleep: 7.2 },
        { time: "8 AM", sleep: 6.8 },
        { time: "9 AM", sleep: 8.1 },
        { time: "10 AM", sleep: 7.9 },
        { time: "11 AM", sleep: 8.3 },
      ],
      chart1Title: "TIME ASLEEP",
      chart1Value: "7.43",
      chart1Unit: "min",
      chart1Subtitle: "Total duration 8h 32m",
      chart2Type: "radial",
      chart2Data: [
        { metric: "Sleep", value: 86 },
        { metric: "Recovery", value: 78 },
        { metric: "Readiness", value: 92 },
        { metric: "Activity", value: 65 },
        { metric: "HRV", value: 71 },
      ],
      chart2Title: "READINESS",
      chart2Value: "86",
      chart2Status: "Optimal",
      chart2Description: "A great night's sleep can boost your readiness.",
      testimonial: {
        quote:
          "NexRing has become my daily compass, keeping me on the right track.",
        author: "Jussi L., NexRing Member",
      },
    },
    {
      id: 1,
      title: "Taking a walk",
      image: "/accuracy/taking-walk.jpg",
      chart1Type: "line",
      chart1Data: [
        { time: "12 am", bpm: 65 },
        { time: "6 am", bpm: 72 },
        { time: "12 pm", bpm: 85 },
        { time: "6 pm", bpm: 78 },
        { time: "Now", bpm: 63 },
      ],
      chart1Title: "HEART RATE",
      chart1Value: "63",
      chart1Unit: "BPM",
      chart1Subtitle: "3 minutes ago",
      chart2Type: "area",
      chart2Data: [
        { day: "Mon", steps: 8200 },
        { day: "Tue", steps: 9500 },
        { day: "Wed", steps: 7800 },
        { day: "Thu", steps: 10200 },
        { day: "Fri", steps: 8900 },
        { day: "Sat", steps: 11000 },
        { day: "Sun", steps: 6500 },
      ],
      chart2Title: "ACTIVITY GOAL",
      chart2Value: "2,213",
      chart2Status: "Steps progress",
      chart2Description: "Today's activity goal is at baseline.",
      testimonial: {
        quote: "NexRing helps me stay on top of my heart health.",
        author: "Sarah M., NexRing Member",
      },
    },
    {
      id: 2,
      title: "Under the weather",
      image: "/accuracy/under-weather.jpg",
      chart1Type: "line",
      chart1Data: [
        { day: "TUE", temp: -0.5 },
        { day: "WED", temp: 0.2 },
        { day: "THU", temp: 0.8 },
        { day: "FRI", temp: 1.1 },
        { day: "SAT", temp: 0.9 },
        { day: "SUN", temp: 1.4 },
        { day: "MON", temp: 1.8 },
      ],
      chart1Title: "BODY TEMPERATURE",
      chart1Value: "+1.8",
      chart1Unit: "°C",
      chart1Subtitle: "Above baseline",
      chart2Type: "radial",
      chart2Data: [
        { metric: "Readiness", value: 44 },
        { metric: "Sleep", value: 52 },
        { metric: "Activity", value: 38 },
        { metric: "HRV", value: 41 },
        { metric: "Recovery", value: 35 },
      ],
      chart2Title: "READINESS",
      chart2Value: "44",
      chart2Status: "Pay Attention",
      chart2Description:
        "Your elevated body temperature is affecting readiness.",
      testimonial: {
        quote: "My NexRing data is my form of guided decision-making.",
        author: "Linda D., NexRing Member",
      },
    },
    {
      id: 3,
      title: "Winding down",
      image: "/accuracy/winding.jpg",
      chart1Type: "line",
      chart1Data: [
        { time: "12 am", bpm: 58 },
        { time: "6 am", bpm: 62 },
        { time: "12 pm", bpm: 75 },
        { time: "6 pm", bpm: 68 },
        { time: "Now", bpm: 61 },
      ],
      chart1Title: "BEDTIME APPROACHING",
      chart1Value: "10:30",
      chart1Unit: "PM",
      chart1Subtitle: "Optimal bedtime 10-11 PM",
      chart2Type: "line",
      chart2Data: [
        { time: "12 am", bpm: 58 },
        { time: "6 am", bpm: 62 },
        { time: "12 pm", bpm: 75 },
        { time: "6 pm", bpm: 68 },
        { time: "Now", bpm: 61 },
      ],
      chart2Title: "HEART RATE",
      chart2Value: "61",
      chart2Status: "BPM",
      chart2Description: "Your heart rate is naturally lowering.",
      testimonial: {
        quote: "NexRing was the first step in improving my sleep.",
        author: "Rhonda C., NexRing Member",
      },
    },
    {
      id: 4,
      title: "Hosting a party",
      image: "/accuracy/hosting-party.jpg",
      chart1Type: "area",
      chart1Data: [
        { time: "12 am", stress: 25 },
        { time: "6 am", stress: 30 },
        { time: "12 pm", stress: 55 },
        { time: "6 pm", stress: 70 },
        { time: "Now", stress: 82 },
      ],
      chart1Title: "DAYTIME STRESS",
      chart1Value: "Engaged",
      chart1Subtitle: "5m ago",
      chart2Type: "line",
      chart2Data: [
        { time: "12 am", bpm: 64 },
        { time: "6 am", bpm: 70 },
        { time: "12 pm", bpm: 88 },
        { time: "6 pm", bpm: 92 },
        { time: "Now", bpm: 82 },
      ],
      chart2Title: "HEART RATE",
      chart2Value: "82",
      chart2Status: "BPM",
      chart2Description: "Stress levels in a great place for productivity.",
      testimonial: {
        quote: "The stress insights help me manage my workload.",
        author: "Michael T., NexRing Member",
      },
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 backdrop-blur-md border border-blue-400/40 rounded-lg px-3 py-2 shadow-xl">
          <p className="text-white text-xs font-bold">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const renderChart = (tab, isFirst) => {
    const data = isFirst ? tab.chart1Data : tab.chart2Data;
    const type = isFirst ? tab.chart1Type : tab.chart2Type;

    if (type === "bar") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#6b7280" fontSize={10} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="sleep"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (type === "line") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey={data[0].day ? "day" : "time"}
              stroke="#6b7280"
              fontSize={10}
            />
            <YAxis stroke="#6b7280" fontSize={10} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={data[0].bpm ? "bpm" : "temp"}
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (type === "area") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id={`${isFirst ? "area1" : "area2"}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={data[0].stress ? "#ec4899" : "#10b981"}
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor={data[0].stress ? "#ec4899" : "#10b981"}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey={data[0].day ? "day" : "time"}
              stroke="#6b7280"
              fontSize={10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={data[0].stress ? "stress" : "steps"}
              stroke={data[0].stress ? "#ec4899" : "#10b981"}
              strokeWidth={3}
              fill={`url(#${isFirst ? "area1" : "area2"})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    } else if (type === "radial") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="metric" stroke="#6b7280" fontSize={10} />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              stroke="#374151"
              fontSize={9}
            />
            <Radar
              dataKey="value"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.6}
              strokeWidth={2}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-black via-[#001233] to-black py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px] animate-pulse animation-delay-2000" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight">
            Built for accuracy, designed for your every day
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Comfortably wear NexRing all day and night to collect deeply
            personal health metrics and insights. Your finger provides the most
            accurate reading of over 20 biometrics that directly impact how you
            feel.
          </p>
        </motion.div>

        {/* Premium Tabs - Cleaner Mobile UI */}
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row gap-3 md:gap-2 p-3 md:p-2 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 w-full md:w-auto">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`relative px-4 py-3 md:px-6 lg:px-8 md:py-3 text-xs md:text-sm lg:text-base font-bold rounded-2xl md:rounded-full transition-all duration-300 text-center cursor-pointer ${
                  activeTab === index
                    ? "text-white bg-gradient-to-r from-[#5646a3] to-[#5646a3] shadow-lg shadow-[#5646a3]/50"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="block md:whitespace-nowrap leading-tight">
                  {tab.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Image Card - NO BORDER LINES */}
            <motion.div
              className="relative h-[350px] md:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden group"
              style={{
                background:
                  "linear-gradient(135deg, rgba(30, 58, 138, 0.2) 0%, rgba(17, 24, 39, 0.6) 100%)",
                boxShadow:
                  "0 20px 60px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              <Image
                src={tabs[activeTab].image}
                alt={tabs[activeTab].title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>

            {/* Charts Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chart 1 - Premium Glass Card */}
              <motion.div
                className="relative rounded-3xl p-6 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(30, 58, 138, 0.2) 0%, rgba(17, 24, 39, 0.8) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  border: "2px solid rgba(59, 130, 246, 0.3)",
                }}
              >
                <div className="absolute inset-0 rounded-3xl border-t-2 border-l-2 border-blue-400/30 pointer-events-none" />
                <div className="absolute inset-0 rounded-3xl border-b-2 border-r-2 border-black/40 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

                <h3 className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-3">
                  {tabs[activeTab].chart1Title}
                </h3>

                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-black text-white">
                    {tabs[activeTab].chart1Value}
                  </span>
                  {tabs[activeTab].chart1Unit && (
                    <span className="text-xl text-gray-400 ml-2">
                      {tabs[activeTab].chart1Unit}
                    </span>
                  )}
                  {tabs[activeTab].chart1Subtitle && (
                    <p className="text-xs text-gray-500 mt-1">
                      {tabs[activeTab].chart1Subtitle}
                    </p>
                  )}
                </div>

                <div className="h-36">{renderChart(tabs[activeTab], true)}</div>
              </motion.div>

              {/* Chart 2 - Premium Glass Card */}
              <motion.div
                className="relative rounded-3xl p-6 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(30, 58, 138, 0.2) 0%, rgba(17, 24, 39, 0.8) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  border: "2px solid rgba(59, 130, 246, 0.3)",
                }}
              >
                <div className="absolute inset-0 rounded-3xl border-t-2 border-l-2 border-blue-400/30 pointer-events-none" />
                <div className="absolute inset-0 rounded-3xl border-b-2 border-r-2 border-black/40 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[10px] text-gray-400 uppercase tracking-widest font-black">
                    {tabs[activeTab].chart2Title}
                  </h3>
                  <span className="px-3 py-1.5 rounded-full text-[10px] font-black bg-blue-500/20 border border-blue-400/40 text-blue-300 shadow-lg">
                    {tabs[activeTab].chart2Status}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-black text-white">
                    {tabs[activeTab].chart2Value}
                  </span>
                </div>

                <div className="h-36 mb-3">
                  {renderChart(tabs[activeTab], false)}
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {tabs[activeTab].chart2Description}
                </p>
              </motion.div>

              {/* Testimonial - Premium Glass Card */}
              <motion.div
                className="md:col-span-2 relative rounded-3xl p-6 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(17, 24, 39, 0.6) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  border: "2px solid rgba(59, 130, 246, 0.2)",
                }}
              >
                <div className="absolute inset-0 rounded-3xl border-t-2 border-l-2 border-blue-400/20 pointer-events-none" />
                <div className="absolute inset-0 rounded-3xl border-b-2 border-r-2 border-black/40 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

                <svg
                  className="w-8 h-8 text-blue-500/40 mb-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <p className="text-white text-base md:text-lg font-serif italic leading-relaxed mb-3">
                  {tabs[activeTab].testimonial.quote}
                </p>

                <p className="text-gray-500 text-sm font-semibold">
                  {tabs[activeTab].testimonial.author}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
