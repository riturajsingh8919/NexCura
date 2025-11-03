import React from "react";
import { Brain, Scan, Monitor, Target, BarChart3 } from "lucide-react";

function HomeIconBoxex() {
  const features = [
    {
      icon: Brain,
      title: "Predictive AI",
      color: "from-blue-500 to-purple-600",
      delay: "0ms",
    },
    {
      icon: Scan,
      title: "Full Body Analysis",
      color: "from-purple-500 to-pink-600",
      delay: "100ms",
    },
    {
      icon: Monitor,
      title: "Real Time Monitoring",
      color: "from-green-500 to-blue-600",
      delay: "200ms",
    },
    {
      icon: Target,
      title: "Lifestyle Management",
      color: "from-orange-500 to-red-600",
      delay: "300ms",
    },
    {
      icon: BarChart3,
      title: "Wellness Dashboard",
      color: "from-indigo-500 to-purple-600",
      delay: "400ms",
    },
  ];

  return (
    <section className="relative pt-16">
      <div className="container">
        <div className="relative">
          {/* Glassmorphism Container */}
          <div className="relative">
            {/* Content */}
            <div className="relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group relative"
                    style={{ animationDelay: feature.delay }}
                  >
                    {/* Feature Card */}
                    <div className="relative overflow-hidden rounded-2xl">
                      {/* Glassmorphism Card Background */}
                      <div className="absolute inset-0 bg-gray-200 backdrop-blur-xs border border-white/80 rounded-2xl transform group-hover:scale-105 transition-all duration-300"></div>

                      {/* Inner Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/30 to-white/20 rounded-2xl"></div>

                      {/* Card Content */}
                      <div className="relative z-10 p-6 text-center">
                        {/* Icon Container */}
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl mb-4 transform group-hover:scale-110 transition-all duration-300`}
                        >
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-medium text-gray-800">
                          {feature.title}
                        </h3>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                    </div>

                    {/* Floating Animation */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/30 rounded-full animate-ping opacity-75"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Elements around the container */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-lg animate-bounce"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full shadow-lg animate-pulse"></div>
          <div className="absolute top-1/2 -left-6 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-lg animate-ping"></div>
        </div>
      </div>
    </section>
  );
}

export default HomeIconBoxex;
