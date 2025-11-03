"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,Rectangle ,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Shield,
  BarChart3,
  Users,
  DollarSign,
  Award,
  ChevronRight,
  Zap,
  Heart,
  Target,
  Activity,
  MonitorSpeaker,
  Brain,
  UserCheck,
  Calendar,
  Check,
  X,
} from "lucide-react";

// Custom hook for count-up animation
const useCountUp = (end, duration = 2000, decimals = 0) => {
  const [count, setCount] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime;
    const startCount = 0;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const currentCount = startCount + (end - startCount) * easeOutQuart;

      setCount(Number(currentCount.toFixed(decimals)));

      if (percentage < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, decimals, shouldStart]);

  return { count, start: () => setShouldStart(true) };
};

// Chart Data
const roiComparisonData = [
  { program: "Traditional", roi: 2.1, color: "#94a3b8" },
  { program: "NexCura AI", roi: 6.0, color: "#3b82f6" },
];

const costSavingsData = [
  { category: "Healthcare Costs", savings: 3.27, color: "#10b981" },
  { category: "Absenteeism Costs", savings: 2.73, color: "#8b5cf6" },
];

const companySuccessData = [
  { name: "Lower Healthcare Costs", value: 72, color: "#3b82f6" },
  { name: "No Change/Increase", value: 28, color: "#e2e8f0" },
];

const engagementTrendData = [
  { month: "Jan", engagement: 58, energy: 62, retention: 85 },
  { month: "Feb", engagement: 64, energy: 68, retention: 87 },
  { month: "Mar", engagement: 71, energy: 74, retention: 89 },
  { month: "Apr", engagement: 78, energy: 81, retention: 92 },
  { month: "May", engagement: 84, energy: 87, retention: 94 },
  { month: "Jun", engagement: 89, energy: 92, retention: 96 },
];

const absenteeismReductionData = [
  { quarter: "Q1", baseline: 8.5, withNexCura: 8.2 },
  { quarter: "Q2", baseline: 8.5, withNexCura: 7.1 },
  { quarter: "Q3", baseline: 8.5, withNexCura: 6.8 },
  { quarter: "Q4", baseline: 8.5, withNexCura: 5.95 },
];

const pilotProgramData = [
  { name: "Active Users", value: 87, color: "#10b981" },
  { name: "Inactive", value: 13, color: "#f1f5f9" },
];

// Feature comparison data - Updated to remove nexcura property
const featureComparisonData = [
  {
    feature: "Premium personalized health insights with predictive analytics",
    nexcuraEmp: true,
  },
  {
    feature: "Full access to all health tracking and management tools",
    nexcuraEmp: true,
  },
  {
    feature: "24/7 customer support and emergency health service contacts",
    nexcuraEmp: true,
  },
  {
    feature: "Add account feature to monitor Dependent account",
    nexcuraEmp: true,
  },
  {
    feature: "Add on features for Health / Medical test",
    nexcuraEmp: true,
  },
  { feature: "Employee health tracking", nexcuraEmp: true },
  { feature: "Sick leave status", nexcuraEmp: true },
  { feature: "Employee health score", nexcuraEmp: true },
  { feature: "Notifications and alerts", nexcuraEmp: true },
  { feature: "Upcoming events", nexcuraEmp: true },
  { feature: "Event calendar", nexcuraEmp: true },
  { feature: "Event scheduler", nexcuraEmp: true },
];

// Custom Chart Components
const AnimatedActiveBar = (props) => {
  const { fill, x, y, width, height } = props;
  return (
    <Rectangle
      x={x - width * 0.025}
      y={y - height * 0.025}
      width={width * 1.05}
      height={height * 1.05}
      fill={fill}
      radius={[6, 6, 0, 0]}
      style={{
        transition: "all 0.2s ease",
      }}
    />
  );
};

const ROIComparisonChart = () => (
  <ResponsiveContainer width="100%" height={140}>
    <BarChart
      data={roiComparisonData}
      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
    >
      <XAxis
        dataKey="program"
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 12, fill: "#64748b" }}
      />
      <YAxis hide />
      <Tooltip
         cursor={false}
        contentStyle={{
          backgroundColor: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          fontSize: "12px",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        }}
        formatter={(value) => [`${value}:1`, "ROI"]}
      />
      <Bar
        dataKey="roi"
        fill="#3b82f6"
        radius={[6, 6, 0, 0]}
        activeBar={<AnimatedActiveBar fill="#3b82f6" />}
      />
    </BarChart>
  </ResponsiveContainer>
);
const CostSavingsChart = () => (
  <ResponsiveContainer width="100%" height={140}>
    <BarChart
      data={costSavingsData}
      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
    >
      <XAxis
        dataKey="category"
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 11, fill: "#64748b" }}
      />
      <YAxis hide />
      <Bar dataKey="savings" fill="#10b981" radius={[6, 6, 0, 0]}  activeBar={<AnimatedActiveBar fill="#10b981" />}/>
      <Tooltip
       cursor={false}
        contentStyle={{
          backgroundColor: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          fontSize: "12px",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        }}
        formatter={(value) => [`$${value}`, "Savings per $1 spent"]}
      />
    </BarChart>
  </ResponsiveContainer>
);

const CompanySuccessChart = () => (
  <ResponsiveContainer width="100%" height={140}>
    <PieChart>
      <Pie
        data={companySuccessData}
        cx="50%"
        cy="50%"
        innerRadius={30}
        outerRadius={60}
        paddingAngle={2}
        dataKey="value"
        strokeWidth={0}
      >
        {companySuccessData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          fontSize: "12px",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        }}
        formatter={(value) => [`${value}%`, "Companies"]}
      />
    </PieChart>
  </ResponsiveContainer>
);

const EngagementTrendChart = () => (
  <ResponsiveContainer width="100%" height={140}>
    <AreaChart
      data={engagementTrendData}
      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
      <XAxis
        dataKey="month"
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 12, fill: "#64748b" }}
      />
      <YAxis hide />
      <Area
        type="monotone"
        dataKey="engagement"
        stroke="#3b82f6"
        fill="#3b82f6"
        fillOpacity={0.2}
        strokeWidth={2}
      />
      <Area
        type="monotone"
        dataKey="energy"
        stroke="#10b981"
        fill="#10b981"
        fillOpacity={0.2}
        strokeWidth={2}
      />
      <Tooltip
        contentStyle={{
          backgroundColor: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          fontSize: "12px",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        }}
        formatter={(value, name) => [
          `${value}%`,
          name === "engagement" ? "Engagement" : "Energy Levels",
        ]}
      />
    </AreaChart>
  </ResponsiveContainer>
);

const AbsenteeismChart = () => (
  <ResponsiveContainer width="100%" height={140}>
    <BarChart
      data={absenteeismReductionData}
      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
    >
      <XAxis
        dataKey="quarter"
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 12, fill: "#64748b" }}
      />
      <YAxis hide />
      <Bar dataKey="baseline" fill="#f1f5f9" radius={[4, 4, 0, 0]} />
      <Bar dataKey="withNexCura" fill="#ef4444" radius={[4, 4, 0, 0]}  activeBar={<AnimatedActiveBar fill="#ef4444" />}/>
      <Tooltip
       cursor={false}
        contentStyle={{
          backgroundColor: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          fontSize: "12px",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        }}
        formatter={(value, name) => [
          `${value}%`,
          name === "baseline" ? "Before NexCura" : "With NexCura",
        ]}
      />
    </BarChart>
  </ResponsiveContainer>
);

const PilotUsageChart = () => (
  <ResponsiveContainer width="100%" height={140}>
    <PieChart>
      <Pie
        data={pilotProgramData}
        cx="50%"
        cy="50%"
        innerRadius={30}
        outerRadius={60}
        paddingAngle={2}
        dataKey="value"
        strokeWidth={0}
      >
        {pilotProgramData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          fontSize: "12px",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        }}
        formatter={(value) => [`${value}%`, "Employee Usage"]}
      />
    </PieChart>
  </ResponsiveContainer>
);

// Animated KPI Card Component
const KPICard = ({
  icon: Icon,
  value,
  suffix = "",
  prefix = "",
  label,
  color = "blue",
  decimals = 0,
  description = "",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { count, start } = useCountUp(value, 2000, decimals);

  useEffect(() => {
    if (isInView) {
      start();
    }
  }, [isInView, start]);

  const colorClasses = {
    blue: "text-blue-600 bg-blue-50 border-blue-200",
    green: "text-green-600 bg-green-50 border-green-200",
    purple: "text-purple-600 bg-purple-50 border-purple-200",
    orange: "text-orange-600 bg-orange-50 border-orange-200",
    red: "text-red-600 bg-red-50 border-red-200",
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold text-gray-900">
            {prefix}
            {count}
            {suffix}
          </div>
          <div className="text-sm font-medium text-gray-700 mb-1">{label}</div>
          {description && (
            <div className="text-xs text-gray-500">{description}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Feature Comparison Component - Updated for 2 columns
const FeatureComparison = () => (
  <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-8">
    <div className="text-center mb-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
        Feature Comparison
      </h2>
      <p className="text-gray-600 max-w-4xl mx-auto">
        NexCura Enterprise enhances functionality with employee health
        monitoring, sick leave management, and wellness activities for
        comprehensive organizational health solutions.
      </p>
    </div>

    <div className="grid gap-4">
      {/* Header - Updated for 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div className="md:col-span-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900">Features</h3>
        </div>
        <div className="md:col-span-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 lg:text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            NexCura Enterprise
          </h3>
        </div>
      </div>

      {/* Feature Rows - Updated for 2 columns */}
      {featureComparisonData.map((feature, index) => (
        <motion.div
          key={index}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="md:col-span-3 bg-white/80 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-800">{feature.feature}</p>
          </div>

          <div className="md:col-span-2 bg-white/80 border border-gray-200 rounded-lg p-4 flex lg:justify-center">
            <div className="flex items-center gap-2">
              <Check className="text-blue-600" size={20} />
              <span className="text-sm font-medium text-blue-600">
                Included
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// Main Component
const NexCuraEmployerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="py-16">
        <div className="container">
          {/* Key Value Propositions - Updated with 4 new features */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white/70 backdrop-blur-sm border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <MonitorSpeaker className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Real-Time Health Monitoring
                </h3>
              </div>
              <p className="text-gray-600">
                Track physical, mental, and nutritional health metrics with
                seamless integration of wearables and diagnostic tools, ensuring
                holistic monitoring and smarter health decisions.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-green-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Brain className="text-green-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Predictive Analytics
                </h3>
              </div>
              <p className="text-gray-600">
                Identify health risks early with AI-driven analysis to reduce
                sick leave, improve productivity, and lower long-term healthcare
                costs effectively, efficiently, and proactively.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-purple-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <UserCheck className="text-purple-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Tailored Wellness Programs
                </h3>
              </div>
              <p className="text-gray-600">
                Personalized health pathways, including chronic disease support,
                mental health resources, and actionable care recommendations
                tailored to your needs, preferences, lifestyle, and medical
                history.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <BarChart3 className="text-orange-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  HR Wellness Dashboard
                </h3>
              </div>
              <p className="text-gray-600">
                A centralized dashboard for HR leaders to monitor team-wide
                health trends and take data-driven action with real-time
                insights, alerts, reports, and engagement metrics.
              </p>
            </div>
          </motion.div>

          {/* Dashboard Card */}
          <motion.div
            className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-3xl p-3 xl:p-8 shadow-xl mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Dashboard Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Activity className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Workforce Wellness Analytics Dashboard
                  </h2>
                  <p className="text-gray-600">
                    Comprehensive insights, proven results, measurable ROI
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Real-time Data
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
              {/* ROI Comparison */}
              <div className="xl:col-span-2 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="text-blue-600" size={20} />
                  <h3 className="text-gray-900 font-semibold">
                    ROI Comparison
                  </h3>
                </div>
                <ROIComparisonChart />
                <p className="text-sm text-gray-600 mt-2">
                  6:1 ROI vs traditional wellness programs
                </p>
              </div>

              {/* Cost Savings */}
              <div className="xl:col-span-2 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="text-green-600" size={20} />
                  <h3 className="text-gray-900 font-semibold">
                    Cost Savings per $1
                  </h3>
                </div>
                <CostSavingsChart />
                <p className="text-sm text-gray-600 mt-2">
                  Healthcare & absenteeism cost reduction
                </p>
              </div>

              {/* Company Success Rate */}
              <div className="xl:col-span-2 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="text-purple-600" size={20} />
                  <h3 className="text-gray-900 font-semibold">
                    Company Success Rate
                  </h3>
                </div>
                <CompanySuccessChart />
                <p className="text-sm text-gray-600 mt-2">
                  72% saw lower healthcare costs
                </p>
              </div>

              {/* Engagement & Energy Trends */}
              <div className="xl:col-span-3 bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="text-indigo-600" size={20} />
                  <h3 className="text-gray-900 font-semibold">
                    Employee Engagement & Energy Levels
                  </h3>
                </div>
                <EngagementTrendChart />
                <p className="text-sm text-gray-600 mt-2">
                  6-month improvement in engagement and energy
                </p>
              </div>

              {/* Absenteeism Reduction */}
              <div className="xl:col-span-2 bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="text-red-600" size={20} />
                  <h3 className="text-gray-900 font-semibold">
                    Absenteeism Reduction
                  </h3>
                </div>
                <AbsenteeismChart />
                <p className="text-sm text-gray-600 mt-2">
                  Up to 30% reduction in quarterly rates
                </p>
              </div>

              {/* Pilot Program Usage */}
              <div className="xl:col-span-1 bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="text-emerald-600" size={20} />
                  <h3 className="text-gray-900 font-semibold text-sm">
                    Pilot Usage
                  </h3>
                </div>
                <PilotUsageChart />
                <p className="text-xs text-gray-600 mt-2">
                  Active employee participation
                </p>
              </div>
            </div>

            {/* KPI Cards - Fixed to 3 in a row for better display */}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <KPICard
                icon={DollarSign}
                value={3}
                suffix=":1"
                label="Average ROI"
                color="blue"
                description="for every $1 invested in wellness, employers save $6 total"
              />
              <KPICard
                icon={TrendingUp}
                value={10}
                suffix="%"
                label="Healthcare Savings"
                color="green"
                decimals={2}
                description="saved in medical costs for every $1 invested"
              />
              <KPICard
                icon={BarChart3}
                value={5}
                suffix="%"
                label="Absenteeism Savings"
                color="purple"
                decimals={2}
                description="saved in absenteeism costs for every $1 invested"
              />
              <KPICard
                icon={Activity}
                value={10}
                suffix="%"
                label="Absenteeism Drop"
                color="red"
                description="average reduction in absenteeism across participating employees"
              />
            </div>

            {/* Additional Metrics */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="text-blue-600" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Employee Retention
                  </h3>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">82%</div>
                <p className="text-gray-600 text-sm">
                  Employees report wellness support as a key reason to stay with
                  their company
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="text-green-600" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Claims Reduction
                  </h3>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">12%</div>
                <p className="text-gray-600 text-sm">
                  Average reduction in annual health insurance claims per
                  employee
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="text-purple-600" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Energy Levels
                  </h3>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">74%</div>
                <p className="text-gray-600 text-sm">
                  Employees reporting higher energy levels and productivity
                </p>
              </div>
            </div>

            {/* Case Study Highlight */}
            {/* <motion.div
              className="bg-gradient-to-r from-blue-100 via-purple-50 to-blue-100 border border-blue-300 rounded-2xl p-4 xl:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex flex-col lg:flex-row items-start gap-6">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Award className="text-white" size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Johnson & Johnson Success Story
                    </h3>
                    <span className="bg-blue-100 border border-blue-300 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      Verified Results
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6 text-base lg:text-lg leading-relaxed">
                    Johnson & Johnson's comprehensive wellness program
                    implementation (2002-2008) demonstrates the transformative
                    power of AI-driven wellness intelligence, achieving
                    unprecedented cost savings and workforce health
                    improvements.
                  </p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
                    <div className="lg:text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        $250M
                      </div>
                      <div className="text-sm text-gray-600">Total Savings</div>
                    </div>
                    <div className="lg:text-center">
                      <div className="text-3xl font-bold text-green-600">
                        2.7x
                      </div>
                      <div className="text-sm text-gray-600">
                        Return Multiple
                      </div>
                    </div>
                    <div className="lg:text-center">
                      <div className="text-3xl font-bold text-purple-600">
                        30%
                      </div>
                      <div className="text-sm text-gray-600">
                        Absenteeism Drop
                      </div>
                    </div>
                    <div className="lg:text-center">
                      <div className="text-3xl font-bold text-orange-600">
                        6 Years
                      </div>
                      <div className="text-sm text-gray-600">
                        Study Duration
                      </div>
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className="hidden lg:block text-gray-400 mt-2"
                  size={24}
                />
              </div>
            </motion.div> */}
          </motion.div>

          {/* Sick Leave Management Section */}
          <motion.div
            className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 border border-emerald-200 rounded-3xl p-4 xl:p-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl">
                  <Calendar className="text-white" size={40} />
                </div>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Seamless Absence Management with NexCura
              </h2>
              <p className="text-base lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                NexCura enables employees to effortlessly apply for sick leave,
                offering the added benefit of personalized doctor advice based
                on individual health needs. This ensures employees receive the
                right guidance during their recovery.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-8">
                <div className="bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <Users className="text-emerald-600" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Employee Benefits
                    </h3>
                  </div>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <Check className="text-emerald-600 mt-0.5" size={18} />
                      <span>Effortless sick leave application process</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-emerald-600 mt-0.5" size={18} />
                      <span>
                        Personalized doctor advice based on health needs
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-emerald-600 mt-0.5" size={18} />
                      <span>Right guidance during recovery period</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-emerald-600 mt-0.5" size={18} />
                      <span>Comprehensive health support system</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white/70 backdrop-blur-sm border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <BarChart3 className="text-blue-600" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Employer Benefits
                    </h3>
                  </div>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <Check className="text-blue-600 mt-0.5" size={18} />
                      <span>Real-time sick leave tracking and monitoring</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-blue-600 mt-0.5" size={18} />
                      <span>Proactive employee health management</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-blue-600 mt-0.5" size={18} />
                      <span>Streamlined processes with real-time updates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-blue-600 mt-0.5" size={18} />
                      <span>Enhanced productivity and workplace health</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-3 lg:p-6 inline-block">
                <p className="text-base lg:text-lg text-gray-700 font-medium">
                  Fostering a{" "}
                  <span className="text-emerald-600 font-semibold">
                    healthier
                  </span>{" "}
                  and more{" "}
                  <span className="text-blue-600 font-semibold">
                    productive workplace
                  </span>{" "}
                  through comprehensive health support and efficient leave
                  management.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Feature Comparison Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <FeatureComparison />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NexCuraEmployerDashboard;
