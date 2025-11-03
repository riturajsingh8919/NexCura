"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  Activity,
  TrendingUp,
  Shield,
  Heart,
  Sparkles,
  Moon,
  Footprints,
  Brain,
  Zap,
  Users,
  Clock,
  Bell,
  Target,
  Award,
  Database,
  Calendar,
  Pill,
  Languages,
  Monitor,
  Lock,
  Lightbulb,
  Stethoscope,
  Search,
  FileText,
  CreditCard,
  Plane,
  Phone,
  MapPin,
  Smartphone,
  Star,
  CheckCircle,
} from "lucide-react";

// Enhanced sample data sets
const sleepData = [
  { day: "Mon", hours: 7.2, quality: 85, deep: 2.1, rem: 1.8 },
  { day: "Tue", hours: 6.8, quality: 78, deep: 1.9, rem: 1.5 },
  { day: "Wed", hours: 8.1, quality: 92, deep: 2.4, rem: 2.1 },
  { day: "Thu", hours: 7.5, quality: 88, deep: 2.2, rem: 1.9 },
  { day: "Fri", hours: 6.9, quality: 82, deep: 2.0, rem: 1.6 },
  { day: "Sat", hours: 8.3, quality: 95, deep: 2.6, rem: 2.2 },
  { day: "Sun", hours: 7.8, quality: 90, deep: 2.3, rem: 2.0 },
];

const biometricTrends = [
  {
    metric: "Heart Rate Variability",
    value: 45,
    trend: "+12%",
    color: "#EF4444",
  },
  { metric: "Resting Heart Rate", value: 58, trend: "-3%", color: "#F59E0B" },
  { metric: "Sleep Efficiency", value: 89, trend: "+8%", color: "#3B82F6" },
  { metric: "Recovery Score", value: 78, trend: "+15%", color: "#10B981" },
];

const aiInsights = [
  {
    title: "Early Warning Detected",
    insight:
      "Your HRV shows a 12% decline pattern. Consider stress management.",
    confidence: 94,
    impact: "High",
  },
  {
    title: "Optimal Training Window",
    insight: "Best workout time: 2-4 PM based on your circadian rhythm.",
    confidence: 87,
    impact: "Medium",
  },
  {
    title: "Sleep Pattern Optimization",
    insight: "Shifting bedtime 30min earlier could improve REM by 18%.",
    confidence: 91,
    impact: "High",
  },
];

const realTimeMetrics = [
  { label: "Active Users", value: 127834, change: "+2.3%" },
  { label: "Health Alerts Sent", value: 45621, change: "+18.4%" },
  { label: "Early Detections Today", value: 892, change: "+5.7%" },
  { label: "Lives Potentially Saved", value: 23, change: "+12.1%" },
];

// Enhanced data for additional sections
const appFeatures = [
  {
    title: "Health Progress Tracking",
    description: "Monitor and report on health goals with AI-powered insights.",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50/80 to-green-50/80",
    textColor: "text-emerald-700",
    stats: "98% Accuracy",
  },
  {
    title: "Smart Reminders",
    description:
      "Never miss medication or appointments with intelligent alerts.",
    icon: Bell,
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-50/80 to-cyan-50/80",
    textColor: "text-blue-700",
    stats: "24/7 Active",
  },
  {
    title: "Multi-Language Support",
    description: "Healthcare accessibility in 15+ languages worldwide.",
    icon: Languages,
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-50/80 to-violet-50/80",
    textColor: "text-purple-700",
    stats: "15+ Languages",
  },
  {
    title: "Personal Dashboard",
    description: "Real-time health insights tailored to your unique profile.",
    icon: Monitor,
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50/80 to-red-50/80",
    textColor: "text-orange-700",
    stats: "Real-time Data",
  },
  {
    title: "Secure Data Storage",
    description:
      "Military-grade encryption for your most sensitive health data.",
    icon: Lock,
    gradient: "from-indigo-500 to-purple-600",
    bgGradient: "from-indigo-50/80 to-purple-50/80",
    textColor: "text-indigo-700",
    stats: "256-bit Security",
  },
  {
    title: "AI Health Coach",
    description: "Personalized recommendations based on 10M+ health profiles.",
    icon: Lightbulb,
    gradient: "from-yellow-500 to-orange-600",
    bgGradient: "from-yellow-50/80 to-orange-50/80",
    textColor: "text-yellow-700",
    stats: "10M+ Profiles",
  },
];

const healthSections = [
  {
    title: "My Symptoms",
    description:
      "AI-powered symptom analysis with instant medical guidance and risk assessment.",
    icon: Search,
    gradient: "from-red-500 to-pink-600",
    stats: "95% Accuracy",
  },
  {
    title: "My Health",
    description:
      "Comprehensive wellness tracking with personalized fitness and nutrition plans.",
    icon: Heart,
    gradient: "from-green-500 to-teal-600",
    stats: "24/7 Monitoring",
  },
  {
    title: "My Diagnostics",
    description:
      "Advanced health analytics with predictive insights and early warning systems.",
    icon: FileText,
    gradient: "from-blue-500 to-indigo-600",
    stats: "Early Detection",
  },
];

// Floating data points animation
const FloatingDataPoint = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{
        y: [-5, 5, -5],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute"
    >
      {children}
    </motion.div>
  );
};

// Animated counter with decimal support
const AnimatedCounter = ({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  decimals = 0,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const startCount = 0;

    const animateCount = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const currentCount = progress * (end - startCount) + startCount;
      setCount(decimals > 0 ? currentCount : Math.floor(currentCount));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [end, duration, decimals]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : count;
  return (
    <span>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};

// Enhanced data stream visualization
const DataStream = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const dataPoints = [
    { left: 20, top: 10, delay: 0 },
    { left: 75, top: 25, delay: 0.3 },
    { left: 40, top: 45, delay: 0.6 },
    { left: 85, top: 60, delay: 0.9 },
    { left: 15, top: 35, delay: 1.2 },
    { left: 60, top: 15, delay: 0.2 },
    { left: 35, top: 65, delay: 0.5 },
    { left: 90, top: 40, delay: 0.8 },
    { left: 25, top: 80, delay: 1.1 },
    { left: 65, top: 5, delay: 0.1 },
  ];

  if (!isClient) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dataPoints.map((point, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
          style={{
            left: `${point.left}%`,
            top: `${point.top}%`,
          }}
          animate={{
            y: [-15, -60],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2.5,
            delay: point.delay,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};

const NexCuraComponent = () => {
  const [nexCuraScore, setNexCuraScore] = useState(0);
  const [selectedInsight, setSelectedInsight] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNexCuraScore(92);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Cycle through AI insights
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedInsight((prev) => (prev + 1) % aiInsights.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 text-gray-900 overflow-hidden relative py-18">
      {/* Enhanced background elements */}
      <DataStream />

      {/* Optimized floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingDataPoint delay={0}>
          <div
            className="w-24 h-24 bg-gradient-to-br from-blue-200/15 to-purple-200/15 rounded-full blur-2xl"
            style={{ top: "8%", left: "3%" }}
          />
        </FloatingDataPoint>
        <FloatingDataPoint delay={1}>
          <div
            className="w-32 h-32 bg-gradient-to-br from-green-200/15 to-blue-200/15 rounded-full blur-2xl"
            style={{ top: "50%", right: "5%" }}
          />
        </FloatingDataPoint>
        <FloatingDataPoint delay={2}>
          <div
            className="w-20 h-20 bg-gradient-to-br from-purple-200/15 to-pink-200/15 rounded-full blur-2xl"
            style={{ bottom: "15%", left: "10%" }}
          />
        </FloatingDataPoint>
      </div>

      <div className="relative z-10">
        <div className="container">
          {/* Compact Header */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 inline-flex flex-wrap items-center gap-6 shadow-lg border border-white/50">
              {realTimeMetrics.map((metric, index) => (
                <div key={index} className="flex items-center gap-1.5 text-xs">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-medium text-gray-700">
                    {metric.label}:
                  </span>
                  <span className="font-bold text-blue-600">
                    <AnimatedCounter end={metric.value} />
                  </span>
                  <span className="text-green-600 text-xs font-medium">
                    {metric.change}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tighter Main Dashboard */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 mb-16">
            {/* Compact AI Insights Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="xl:col-span-3"
            >
              <div className="bg-white/85 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-bold">AI Insights</h3>
                </div>

                <motion.div
                  key={selectedInsight}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-4"
                >
                  <div className="bg-gradient-to-r from-purple-50/80 to-blue-50/80 p-3 rounded-xl">
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {aiInsights[selectedInsight].title}
                      </h4>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          aiInsights[selectedInsight].impact === "High"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {aiInsights[selectedInsight].impact}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {aiInsights[selectedInsight].insight}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <motion.div
                          className="bg-purple-500 h-1.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${aiInsights[selectedInsight].confidence}%`,
                          }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-500">
                        {aiInsights[selectedInsight].confidence}%
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Compact market indicators */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-gray-50/80 p-2.5 rounded-lg">
                    <span className="text-xs font-medium">Market Growth</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">
                        $<AnimatedCounter end={477} />B
                      </div>
                      <div className="text-xs text-gray-500">by 2034</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50/80 p-2.5 rounded-lg">
                    <span className="text-xs font-medium">RPM Users</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-blue-600">
                        <AnimatedCounter end={30} />M
                      </div>
                      <div className="text-xs text-gray-500">by 2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Central Dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="xl:col-span-6"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-white/50 relative overflow-hidden">
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 pointer-events-none"></div>

                <div className="relative z-10">
                  {/* Compact Dashboard Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">NexCura Dashboard</h2>
                        <p className="text-xs text-gray-500">
                          Real-time health intelligence
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-green-100 px-2.5 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-green-700">
                        Live
                      </span>
                    </div>
                  </div>

                  {/* Compact NexCura Score */}
                  <div className="text-center mb-5">
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 1, delay: 0.5, type: "spring" }}
                      className="relative inline-block"
                    >
                      <div className="w-32 h-32 relative">
                        <svg
                          className="w-full h-full transform -rotate-90"
                          viewBox="0 0 36 36"
                        >
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="2.5"
                          />
                          <motion.path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="2.5"
                            strokeDasharray="100, 100"
                            initial={{ strokeDasharray: "0, 100" }}
                            animate={{
                              strokeDasharray: `${nexCuraScore}, 100`,
                            }}
                            transition={{ duration: 1.5, delay: 0.8 }}
                          />
                          <defs>
                            <linearGradient
                              id="gradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#3B82F6" />
                              <stop offset="100%" stopColor="#8B5CF6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-black text-gray-800">
                              <AnimatedCounter
                                end={nexCuraScore}
                                duration={1500}
                              />
                            </div>
                            <div className="text-xs text-gray-500 font-medium">
                              NEXCURA SCORE
                            </div>
                          </div>
                        </div>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 1.5 }}
                        className="absolute -top-1 -right-1 bg-green-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1"
                      >
                        <TrendingUp className="w-2.5 h-2.5" />
                        +2
                      </motion.div>
                    </motion.div>
                    <p className="text-green-600 font-medium mt-1.5 text-sm">
                      Excellent Health Trajectory
                    </p>
                  </div>

                  {/* Compact Biometric Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    {biometricTrends.map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.05 }}
                        className="bg-gradient-to-br from-gray-50/80 to-white/80 p-3 rounded-xl border border-gray-200/30 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: metric.color }}
                          ></div>
                          <span
                            className={`text-xs font-bold ${
                              metric.trend.startsWith("+")
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {metric.trend}
                          </span>
                        </div>
                        <div className="text-xl font-bold mb-0.5">
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-500 font-medium leading-tight">
                          {metric.metric}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Compact Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-blue-50/60 to-indigo-50/60 p-3 rounded-xl">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                        <Moon className="w-4 h-4 text-blue-600" />
                        Sleep Architecture
                      </h4>
                      <ResponsiveContainer width="100%" height={80}>
                        <AreaChart data={sleepData}>
                          <Area
                            type="monotone"
                            dataKey="deep"
                            stackId="1"
                            stroke="#3B82F6"
                            fill="#3B82F6"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="rem"
                            stackId="1"
                            stroke="#8B5CF6"
                            fill="#8B5CF6"
                            fillOpacity={0.6}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                      <div className="flex items-center gap-3 mt-1 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded"></div>
                          <span>Deep</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-purple-500 rounded"></div>
                          <span>REM</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50/60 to-emerald-50/60 p-3 rounded-xl">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                        <Activity className="w-4 h-4 text-green-600" />
                        Recovery Trend
                      </h4>
                      <ResponsiveContainer width="100%" height={80}>
                        <LineChart data={sleepData}>
                          <Line
                            type="monotone"
                            dataKey="quality"
                            stroke="#10B981"
                            strokeWidth={2}
                            dot={{ fill: "#10B981", strokeWidth: 1, r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                      <div className="text-xs text-gray-600 mt-1">
                        Average:{" "}
                        <span className="font-bold text-green-600">86.4%</span>
                      </div>
                    </div>
                  </div>

                  {/* Compact Smart Recommendation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="bg-gradient-to-r from-purple-100/80 to-blue-100/80 p-4 rounded-xl border border-purple-200/30"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-purple-600 rounded-lg flex-shrink-0">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-purple-900 mb-1.5 text-sm">
                          AI Recommendation
                        </h4>
                        <p className="text-purple-800 text-xs mb-2 leading-relaxed">
                          Optimal recovery detected. High-intensity training
                          recommended 2-4 PM.
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="bg-purple-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                            89% Confidence
                          </div>
                          <div className="bg-white/60 px-2 py-0.5 rounded-full text-xs font-medium text-purple-700">
                            High Impact
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Compact Social Proof Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="xl:col-span-3"
            >
              <div className="bg-white/85 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold">Live Impact</h3>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 p-3 rounded-xl border border-green-200/30">
                    <div className="text-2xl font-black text-green-700 mb-0.5">
                      <AnimatedCounter end={82} suffix="%" />
                    </div>
                    <p className="text-green-600 text-xs font-medium">
                      Feel more in control within 30 days
                    </p>
                    <div className="mt-1.5 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-2.5 h-2.5 ${
                            i < 4
                              ? "text-green-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 p-3 rounded-xl border border-blue-200/30">
                    <div className="text-2xl font-black text-blue-700 mb-0.5">
                      <AnimatedCounter end={4.7} suffix=" hrs" decimals={1} />
                    </div>
                    <p className="text-blue-600 text-xs font-medium">
                      Avg. sleep improvement per week
                    </p>
                    <div className="mt-1.5 bg-blue-200 rounded-full h-1.5">
                      <motion.div
                        className="bg-blue-500 h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "78%" }}
                        transition={{ duration: 1, delay: 1 }}
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 p-3 rounded-xl border border-purple-200/30">
                    <div className="text-2xl font-black text-purple-700 mb-0.5">
                      <AnimatedCounter end={9.2} suffix="/10" decimals={1} />
                    </div>
                    <p className="text-purple-600 text-xs font-medium">
                      Would recommend to others
                    </p>
                    <div className="mt-1.5 flex items-center gap-0.5">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < 9 ? "bg-purple-400" : "bg-gray-300"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Compact Testimonial */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="bg-gradient-to-br from-gray-50/80 to-slate-50/80 p-4 rounded-xl border border-gray-200/30"
                >
                  <div className="text-2xl text-gray-300 mb-1">"</div>
                  <p className="text-gray-700 text-xs italic mb-3 leading-relaxed">
                    NexCura's early warning system detected a cardiac risk
                    pattern, leading to immediate medical intervention. This app
                    literally saved my life.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-xs">— Verified User</p>
                      <div className="flex items-center gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-2.5 h-2.5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Impact</div>
                      <div className="text-sm font-bold text-red-600">
                        Life-Saving
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* SECTION 1: Enhanced App Features with tighter spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Advanced Health Features
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Revolutionary tools designed for comprehensive wellness
                management
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {appFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.05 }}
                  className="group bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-white/60 hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                  <div className="relative z-10">
                    <div
                      className={`p-2.5 bg-gradient-to-br ${feature.gradient} rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-gray-900">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div
                        className={`${feature.textColor} text-xs font-bold px-2.5 py-1 bg-white/70 rounded-full`}
                      >
                        {feature.stats}
                      </div>
                      <CheckCircle className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* SECTION 2: Compact Health Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
              {/* Content Side - Reduced to 3/5 */}
              <div className="lg:col-span-3 space-y-5">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Intelligent Health Management
                  </h2>
                  <p className="text-gray-600">
                    Your comprehensive health ecosystem in one powerful platform
                  </p>
                </div>

                <div className="space-y-4">
                  {healthSections.map((section, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                      className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/60 hover:shadow-xl hover:scale-102 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2.5 bg-gradient-to-br ${section.gradient} rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform`}
                        >
                          <section.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-lg font-bold text-gray-800 group-hover:text-gray-900">
                              {section.title}
                            </h4>
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                              {section.stats}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {section.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Health Dashboard Image - 2/5 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="lg:col-span-2 flex justify-center"
              >
                <div className="relative w-48 max-w-48">
                  <Image
                    src="/healthdashboard.png"
                    alt="NexCura Health Dashboard"
                    width={200}
                    height={300}
                    className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 200px, (max-width: 1200px) 300px, 300px"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* SECTION 3: Compact Digital Wellness Wallet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
              {/* Enhanced Medical Card - 2/5 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 2 }}
                className="lg:col-span-2 flex justify-center"
              >
                <div className="relative">
                  <motion.div
                    className="w-80 h-52 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl shadow-2xl p-5 text-white relative overflow-hidden"
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Enhanced Card Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-3 right-3 w-20 h-20 border border-white/30 rounded-full"></div>
                      <div className="absolute bottom-3 left-3 w-16 h-16 border border-white/30 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full"></div>
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          <span className="font-bold text-lg">NexCura</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs opacity-80">
                            Digital Wellness
                          </div>
                          <div className="font-bold text-sm">Wallet</div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-xs opacity-80">Medical ID</div>
                        <div className="font-mono text-lg tracking-wider">
                          **** **** **** 2847
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs opacity-80">Valid Thru</div>
                          <div className="font-semibold">12/28</div>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <div className="flex items-center gap-1">
                            <Plane className="w-3 h-3" />
                            <span>Global</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            <span>Secure</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Card Chip */}
                    <div className="absolute top-14 left-5 w-7 h-5 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded opacity-90"></div>
                  </motion.div>

                  {/* Enhanced Floating Icons */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 2.4 }}
                    className="absolute -top-4 -right-4 bg-white rounded-full p-2.5 shadow-lg hover:scale-110 transition-transform"
                  >
                    <Phone className="w-4 h-4 text-green-600" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 2.6 }}
                    className="absolute -bottom-4 -left-4 bg-white rounded-full p-2.5 shadow-lg hover:scale-110 transition-transform"
                  >
                    <MapPin className="w-4 h-4 text-red-600" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Content - 3/5 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 2.2 }}
                className="lg:col-span-3 space-y-4"
              >
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Digital Wellness Wallet
                  </h2>
                  <p className="text-lg text-gray-600 mb-3">
                    Your complete health profile, accessible anywhere, anytime
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/60">
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                    Carry your complete medical history, emergency contacts, and
                    vital health information securely. Perfect for travel,
                    emergencies, and seamless healthcare transitions worldwide.
                  </p>

                  {/* Compact Feature Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-r from-green-100/80 to-emerald-100/80 p-3 rounded-lg hover:scale-105 transition-transform">
                      <div className="flex items-center gap-2 mb-1">
                        <Plane className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-800 text-sm">
                          Travel Ready
                        </span>
                      </div>
                      <p className="text-xs text-green-600">Global access</p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-100/80 to-indigo-100/80 p-3 rounded-lg hover:scale-105 transition-transform">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-blue-800 text-sm">
                          Emergency
                        </span>
                      </div>
                      <p className="text-xs text-blue-600">Quick access</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-100/80 to-violet-100/80 p-3 rounded-lg hover:scale-105 transition-transform">
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="w-4 h-4 text-purple-600" />
                        <span className="font-semibold text-purple-800 text-sm">
                          Secure
                        </span>
                      </div>
                      <p className="text-xs text-purple-600">Bank-grade</p>
                    </div>

                    <div className="bg-gradient-to-r from-orange-100/80 to-red-100/80 p-3 rounded-lg hover:scale-105 transition-transform">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-orange-600" />
                        <span className="font-semibold text-orange-800 text-sm">
                          Complete
                        </span>
                      </div>
                      <p className="text-xs text-orange-600">Full records</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Compact Core Features */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10"
          >
            <div className="group bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/60 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">
                AI-Driven NexCura Score
              </h4>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Revolutionary health scoring system using advanced machine
                learning for actionable daily insights.
              </p>
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium">
                  92% Accuracy
                </div>
                <div className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full text-xs font-medium">
                  Real-time
                </div>
              </div>
            </div>

            <div className="group bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/60 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="p-2.5 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">Smart Recommendations</h4>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Personalized insights based on your unique patterns, lifestyle,
                and health goals.
              </p>
              <div className="flex items-center gap-2">
                <div className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">
                  89% Confidence
                </div>
                <div className="bg-teal-100 text-teal-700 px-2.5 py-1 rounded-full text-xs font-medium">
                  Adaptive
                </div>
              </div>
            </div>

            <div className="group bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/60 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3">Complete Privacy</h4>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Bank-grade encryption with local processing ensures your health
                data stays secure.
              </p>
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full text-xs font-medium">
                  256-bit Secure
                </div>
                <div className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-medium">
                  HIPAA Compliant
                </div>
              </div>
            </div>
          </motion.div>

          {/* Compact Technology Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.6 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 text-center"
          >
            <h3 className="text-xl lg:text-2xl font-bold mb-5 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
              Powered by Advanced Health Intelligence
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="flex flex-col items-center group hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-sm">Cardiac AI</span>
                <span className="text-xs text-gray-500">Heart analysis</span>
              </div>
              <div className="flex flex-col items-center group hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-sm">Sleep Science</span>
                <span className="text-xs text-gray-500">REM optimization</span>
              </div>
              <div className="flex flex-col items-center group hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-sm">Movement AI</span>
                <span className="text-xs text-gray-500">
                  Activity prediction
                </span>
              </div>
              <div className="flex flex-col items-center group hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-sm">Predictive AI</span>
                <span className="text-xs text-gray-500">Early warning</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NexCuraComponent;
