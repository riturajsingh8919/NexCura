"use client";

import React from "react";
import Image from "next/image";
import { Award, Shield, Users } from "lucide-react";

const OurPromise = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Light Animated Background */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 via-purple-100/30 to-pink-100/50" />

        {/* Floating orbs for visual appeal */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-200 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-orange-200 to-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000" />

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16">
        <div className="w-full max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              <span className="relative">Our</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-gray-800">
                Promise
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Building the future with unwavering commitment, security, and user
              focus
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
            {/* Card 1: Excellence */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-400 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/50">
                {/* Icon Container */}
                <div className="flex justify-center mb-8">
                  <div className="relative p-6 bg-gradient-to-br from-amber-100/80 to-orange-200/80 rounded-2xl backdrop-blur-sm border border-amber-200/50 shadow-lg">
                    <Award
                      className="w-10 h-10 text-amber-600 drop-shadow-sm"
                      strokeWidth={1.5}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-transparent rounded-2xl" />
                  </div>
                </div>

                <div className="text-center space-y-6">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 tracking-wide">
                    Commitment to Excellence
                  </h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full" />
                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    We pursue perfection in every detail, continuously
                    innovating and refining our approach to deliver solutions
                    that exceed expectations and set new industry standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Security */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-400 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/50">
                {/* Icon Container */}
                <div className="flex justify-center mb-8">
                  <div className="relative p-6 bg-gradient-to-br from-emerald-100/80 to-teal-200/80 rounded-2xl backdrop-blur-sm border border-emerald-200/50 shadow-lg">
                    <Shield
                      className="w-10 h-10 text-emerald-600 drop-shadow-sm"
                      strokeWidth={1.5}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-2xl" />
                  </div>
                </div>

                <div className="text-center space-y-6">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 tracking-wide">
                    Data Privacy & Security
                  </h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full" />
                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    Your trust is our foundation. We implement enterprise-grade
                    security measures and maintain complete transparency in how
                    we protect and handle your valuable data.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: User-Centric */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-400 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/50">
                {/* Icon Container */}
                <div className="flex justify-center mb-8">
                  <div className="relative p-6 bg-gradient-to-br from-blue-100/80 to-purple-200/80 rounded-2xl backdrop-blur-sm border border-blue-200/50 shadow-lg">
                    <Users
                      className="w-10 h-10 text-blue-600 drop-shadow-sm"
                      strokeWidth={1.5}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-transparent rounded-2xl" />
                  </div>
                </div>

                <div className="text-center space-y-6">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 tracking-wide">
                    User-Centric Approach
                  </h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full" />
                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    Every feature we build starts with understanding your needs.
                    We create intuitive experiences that feel natural,
                    empowering you to achieve more with less effort.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default OurPromise;
