"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Heart,
  Shield,
  Activity,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Star,
  Zap,
  Brain,
  Smartphone,
  BarChart3,
  Globe,
  Award,
  Target,
  Lightbulb,
  ArrowRight,
  Play,
  User,
} from "lucide-react";

// Sample data for charts
const sleepData = [
  { day: "Mon", sleepQuality: 85 },
  { day: "Tue", sleepQuality: 78 },
  { day: "Wed", sleepQuality: 92 },
  { day: "Thu", sleepQuality: 88 },
  { day: "Fri", sleepQuality: 76 },
  { day: "Sat", sleepQuality: 95 },
  { day: "Sun", sleepQuality: 89 },
];

const miniChartData = [
  { name: "1", value: 65 },
  { name: "2", value: 78 },
  { name: "3", value: 85 },
  { name: "4", value: 92 },
  { name: "5", value: 88 },
  { name: "6", value: 95 },
];

const sleepQualityData = [
  { day: "Mon", quality: 7.2 },
  { day: "Tue", quality: 6.8 },
  { day: "Wed", quality: 8.1 },
  { day: "Thu", quality: 7.5 },
  { day: "Fri", quality: 6.9 },
  { day: "Sat", quality: 8.3 },
  { day: "Sun", quality: 7.8 },
];

const engagementData = [
  { name: "Daily Check-ins", value: 87, color: "#3B82F6" },
  { name: "Goal Completion", value: 92, color: "#10B981" },
  { name: "App Usage", value: 78, color: "#F59E0B" },
  { name: "Health Tracking", value: 95, color: "#8B5CF6" },
];

// Floating data point component
const FloatingDataPoint = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="absolute"
  >
    {children}
  </motion.div>
);

const NexCuraCaregiverHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const healthMetrics = [
    {
      icon: Heart,
      title: "Heart Rate",
      value: "72 BPM",
      change: "+2%",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Activity,
      title: "Steps Today",
      value: "8,247",
      change: "+15%",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Brain,
      title: "Sleep Score",
      value: "89/100",
      change: "+5%",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: Zap,
      title: "Energy Level",
      value: "High",
      change: "Stable",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
  ];

  const caregiverFeatures = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive patient care coordination and monitoring",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Health Analytics",
      description: "Advanced insights and predictive health analytics",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Shield,
      title: "Secure Communication",
      description: "HIPAA-compliant messaging and data protection",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Real-time Monitoring",
      description: "24/7 patient health status and alert systems",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 overflow-hidden py-16">
      <div className="container">
        {/* NexCura Mobile App Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

            <div className="relative z-10 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Transform Healthcare with{" "}
                <span className="text-yellow-300">NexCura</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto"
              >
                Empower your caregiving with AI-driven insights, real-time
                monitoring, and comprehensive patient management tools.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Key Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Advanced Features for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                Caregivers
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed to enhance patient care and streamline
              healthcare workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {caregiverFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* NexCura Care Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mt-48"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-40 -mb-40"></div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="text-3xl md:text-4xl font-bold mb-6"
                >
                  Comprehensive Care Solutions
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto"
                >
                  Streamlined workflows and intelligent insights for exceptional
                  patient care delivery
                </motion.p>
              </div>

              {/* Service highlights */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Patient Care</h3>
                  <p className="text-emerald-100">
                    Centralized patient management with real-time health
                    monitoring
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
                  <p className="text-emerald-100">
                    AI-powered insights for informed healthcare decisions
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
                  <p className="text-emerald-100">
                    HIPAA-compliant security with encrypted data protection
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Content - Three Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 xl:gap-12 items-start mb-16">
          {/* Left Column - Market Data */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="xl:col-span-1"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 mb-8">
              <h3 className="text-lg font-semibold text-slate-700 mb-6 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <span>Market Growth</span>
              </h3>
              <div className="space-y-6">
                {healthMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                    className={`${metric.bgColor} rounded-xl p-4 border border-gray-200`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {metric.title}
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            {metric.value}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-emerald-600">
                        {metric.change}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Center Column - Health Score Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="xl:col-span-3 flex justify-center"
          >
            <div className="relative">
              {/* Health Score Image */}
              <div className="relative w-64 max-w-64">
                <Image
                  src="/healthscore.png"
                  alt="NexCura Health Score"
                  width={300}
                  height={400}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                  sizes="256px"
                  priority
                />
              </div>

              {/* Floating Decorative Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <Shield className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - User Impact Data */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="xl:col-span-1"
          >
            {/* Sleep Quality Trend */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 mb-12">
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span>Sleep Quality Trend</span>
              </h3>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sleepQualityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#64748B" }}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#F8FAFC",
                        border: "1px solid #E2E8F0",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="quality"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Engagement Metrics */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50">
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-emerald-500" />
                <span>Engagement Metrics</span>
              </h3>
              <div className="space-y-4">
                {engagementData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium text-slate-700">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1, delay: 1.5 + index * 0.2 }}
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-800">
                        {item.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Original Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Your Health Circle Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {caregiverFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Trusted by Healthcare Professionals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  10,000+
                </div>
                <div className="text-slate-300">Patients Monitored</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                <div className="text-slate-300">Healthcare Providers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  99.9%
                </div>
                <div className="text-slate-300">Uptime Reliability</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-slate-300">Support Available</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NexCuraCaregiverHero;
