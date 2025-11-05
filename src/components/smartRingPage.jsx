"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

export default function SmartRingPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/getAllProducts`);
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOrderNowClick = () => {
    // Navigate directly to product details page
    const blackProduct = products.find((p) => p.productColor === "Matte Black");
    if (blackProduct) {
      router.push(`/smartRingDetails/${blackProduct.productId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#000d24] via-[#001233] to-[#000d24] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Animated Loading Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div className="w-20 h-20 border-4 border-transparent border-t-[#5646a3] border-r-purple-400 rounded-full"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#000d24] via-[#001233] to-[#000d24] text-white relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#5646a3] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#585462] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />

      <div>
        <Header />

        {/* Hero Section with Premium Glassmorphism */}
        <section className="relative min-h-[80vh] px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden flex flex-col justify-center">
          {/* Breadcrumb with Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm my-8 md:my-0 md:mb-8"
              style={{
                backgroundColor: "rgba(86, 70, 163, 0.2)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Link
                href="/NxRing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <FaAngleRight className="text-gray-500 text-xs" />
              <span className="text-white font-medium">NxRing</span>
            </div>
          </motion.div>

          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content with Animation */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 relative z-10"
              >
                {/* Main Heading with Gradient */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight"
                >
                  <span className="text-[#fbf5ea]">Smarter insights.</span>
                  <br />
                  <span className="text-[#5646a3]">Stronger you.</span>
                </motion.h1>

                {/* Description with Glass Background */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    NxRing brings intelligent health tracking to your
                    fingertips. Monitor your body, sleep, and activity
                    effortlessly while taking control of your well-being with
                    real-time, personalized insights.
                  </p>
                </motion.div>
              </motion.div>

              {/* Right Image with 3D Effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative flex justify-center items-center"
              >
                <motion.div
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  {/* Glow Effect Behind Ring */}
                  <div className="absolute inset-0 bg-gradient-radial from-[#5646a3]/40 via-[#5646a3]/20 to-transparent rounded-full blur-3xl scale-150" />

                  <img
                    src="/updated-ring.png"
                    alt="Smart Ring"
                    className="relative w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Products Section with Premium Design */}
        <section className="relative pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-[#fbf5ea]">
                Pre-Order Available Now
              </h2>
            </motion.div>

            {products.length > 0 &&
              (() => {
                const blackProduct = products.find(
                  (p) => p.productColor === "Matte Black"
                );

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    key={blackProduct?.productId}
                    className="max-w-5xl mx-auto"
                  >
                    <div className="group relative">
                      {/* Subtle Glow Effect */}
                      <div className="absolute -inset-0.5 bg-[#5646a3] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700" />

                      {/* Compact Modern Card */}
                      <div
                        className="relative rounded-2xl overflow-hidden backdrop-blur-lg"
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        <div className="grid md:grid-cols-5 gap-0 relative">
                          {/* Left: Compact Image Section - 2 columns */}
                          <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="md:col-span-2 flex items-center justify-center p-6 md:p-8"
                            style={{
                              backgroundColor: "rgba(86, 70, 163, 0.1)",
                            }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.08, rotateZ: 3 }}
                              transition={{ duration: 0.4 }}
                              className="relative w-full max-w-[280px]"
                            >
                              {/* Subtle glow behind image */}
                              <div className="absolute inset-0 bg-[#5646a3]/20 blur-2xl rounded-full scale-75" />
                              <img
                                src={products[0].productImages?.[0]}
                                alt={products[0].name}
                                className="relative w-full h-auto object-contain drop-shadow-2xl"
                              />
                            </motion.div>
                          </motion.div>

                          {/* Right: Compact Content Section - 3 columns */}
                          <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center space-y-4"
                          >
                            {/* Compact Header */}
                            <div className="space-y-2">
                              <h3 className="text-lg md:text-xl font-medium text-white">
                                {products[0].productDetails}
                              </h3>
                            </div>

                            {/* Compact Price */}
                            <div className="flex items-baseline gap-3">
                              <span className="text-3xl md:text-4xl font-black text-white">
                                {products[0].currencySymbol}
                                {products[0].productCurrentAmount}
                              </span>
                              {products[0].productOldAmount && (
                                <span className="text-lg text-gray-500 line-through">
                                  {products[0].currencySymbol}
                                  {products[0].productOldAmount}
                                </span>
                              )}
                              <span className="text-sm text-gray-400">
                                + Tax
                              </span>
                            </div>

                            {/* Compact Features Grid */}
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                "Heart Rate Monitor",
                                "Sleep Tracking",
                                "Activity Tracking",
                                "Waterproof Design",
                              ].map((feature, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-1.5"
                                >
                                  <svg
                                    className="w-4 h-4 text-[#5646a3] flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span className="text-xs text-gray-300 font-medium">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {/* Compact CTA Button */}
                            <motion.button
                              onClick={handleOrderNowClick}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full py-3 px-6 rounded-lg font-bold text-base text-white relative overflow-hidden cursor-pointer group/btn"
                              style={{
                                backgroundColor: "#5646a3",
                                boxShadow: "0 4px 20px rgba(86, 70, 163, 0.4)",
                              }}
                            >
                              <span className="relative z-10 flex items-center justify-center gap-2">
                                Order Now
                                <motion.span
                                  animate={{ x: [0, 4, 0] }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                >
                                  →
                                </motion.span>
                              </span>
                              <div className="absolute inset-0 bg-[#585462] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                            </motion.button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
