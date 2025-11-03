import React from "react";
import { Shield, Users, Lightbulb } from "lucide-react";
import Image from "next/image";

function AiDriven() {
  const features = [
    {
      icon: Shield,
      title: "Secure Data Management",
      description:
        "Three stage encryption keeps your health information secure and accessible anywhere.",
      color: "from-pink-400 to-purple-500",
      bgColor: "bg-gradient-to-br from-pink-50 to-purple-50",
      delay: "0ms",
      image: "/01.png",
    },
    {
      icon: Users,
      title: "Personalized Insights",
      description:
        "Receive personalized, actionable health insights designed specifically for your needs.",
      color: "from-green-400 to-blue-500",
      bgColor: "bg-gradient-to-br from-green-50 to-blue-50",
      delay: "200ms",
      image: "/02.png",
    },
    {
      icon: Lightbulb,
      title: "Continuous Monitoring",
      description:
        "Stay ahead with cutting edge AI technology leading the future of healthcare.",
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      delay: "400ms",
      image: "/03.png",
    },
  ];

  return (
    <section className="relative pt-16 pb-19 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-purple-100/30"></div>

      <div className="container relative z-10">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Powering the world of{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              AI Driven Healthcare Solutions
            </span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: feature.delay }}
              >
                {/* Feature Card */}
                <div
                  className={`relative p-8 pb-0 rounded-3xl ${feature.bgColor} border border-white/50 backdrop-blur-sm transition-all duration-500 hover:shadow-3xl hover:-translate-y-2`}
                >
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center size-14 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-500`}
                    >
                      <IconComponent className="size-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed lg:text-lg">
                      {feature.description}
                    </p>

                    {/* Image Placeholder */}

                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={500}
                      height={300}
                      className="w-full h-[70vh] object-contain mt-6 group-hover:scale-105 transition-transform duration-500"
                      quality={100}
                    />
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-white/5 to-transparent rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Decorative Elements */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full opacity-50"></div>
      </div>

      {/* Floating Background Shapes */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-200/30 rounded-full blur-lg animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </section>
  );
}

export default AiDriven;
