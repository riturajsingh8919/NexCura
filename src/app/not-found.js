"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Search,
  ArrowLeft,
  Stethoscope,
  Heart,
  Brain,
  Activity,
  RefreshCw,
} from "lucide-react";

export default function NotFound() {
  const handleRefresh = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center px-4 pt-36 pb-16">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative">
            {/* Large 404 Text */}
            <motion.h1
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 leading-none"
            >
              404
            </motion.h1>

            {/* Medical Icons Around 404 */}
            <motion.div
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -top-4 -left-4 md:-top-8 md:-left-8"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="absolute -top-4 -right-4 md:-top-8 md:-right-8"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-100 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 md:w-8 md:h-8 text-pink-600" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Title and Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-2 max-w-2xl mx-auto">
            The page you&apos;re looking for seems to have taken a detour
            through our healthcare system.
          </p>
          <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto">
            Don&apos;t worry, our AI-powered navigation will help you find your
            way back to better health outcomes.
          </p>
        </motion.div>

        {/* Animated Medical Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex justify-center items-center space-x-4 mb-8">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <Activity className="w-6 h-6 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
              className="w-14 h-14 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <Brain className="w-7 h-7 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <Link
            href="/"
            className="group flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/contact-us"
            className="group flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20 transform hover:scale-105"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Get Help</span>
          </Link>

          <button
            onClick={handleRefresh}
            className="group flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Try Again</span>
          </button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="border-t border-white/20 pt-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Popular Destinations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <Link
              href="/caregivers"
              className="text-blue-300 hover:text-blue-100 font-medium hover:underline transition-colors"
            >
              Caregivers
            </Link>
            <Link
              href="/individuals"
              className="text-purple-300 hover:text-purple-100 font-medium hover:underline transition-colors"
            >
              Individuals
            </Link>
            <Link
              href="/employers"
              className="text-pink-300 hover:text-pink-100 font-medium hover:underline transition-colors"
            >
              Employers
            </Link>
            <Link
              href="/about-us"
              className="text-green-300 hover:text-green-100 font-medium hover:underline transition-colors"
            >
              About Us
            </Link>
          </div>
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm">
            Need immediate assistance? Contact our support team at{" "}
            <a
              href="mailto:support@genaihealth.care"
              className="text-blue-300 hover:text-blue-100 font-medium hover:underline"
            >
              support@genaihealth.care
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
