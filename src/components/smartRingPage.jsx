"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";
import { GiSmartphone } from "react-icons/gi";
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
  const [showPreorderDialog, setShowPreorderDialog] = useState(true);
  const [preorderCode, setPreorderCode] = useState("");
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const preorderDialogShown = sessionStorage.getItem("preOrderDialogShown");
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    // sessionStorage.setItem("preOrderDialogShown","false");
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

  useEffect(() => {
    if (
      showPreorderDialog &&
      (preorderDialogShown === null || preorderDialogShown === "false")
    ) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showPreorderDialog]);

  const handlePreorderSubmit = async (e) => {
    e.preventDefault();

    if (!preorderCode.trim()) {
      setError("Preorder code is required");
      return;
    }

    try {
      setError("");

      const res = await axios.get(`${apiBaseUrl}/getRingPreorderCode`);

      if (res.data?.code && res.data.code === preorderCode.trim()) {
        setShowPreorderDialog(false);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("preOrderDialogShown", "true");
        }
      } else {
        setError("Invalid preorder code. Please try again.");
      }
    } catch (err) {
      console.error("Error validating preorder code:", err);
      setError("Something went wrong. Please try again later.");
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
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />

      <div
        className={
          showPreorderDialog &&
          (preorderDialogShown === null || preorderDialogShown === "false")
            ? "blur-sm pointer-events-none"
            : ""
        }
      >
        <Header />

        {/* Hero Section with Premium Glassmorphism */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden">
          {/* Breadcrumb with Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm my-8 md:my-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(86, 70, 163, 0.2) 0%, rgba(86, 70, 163, 0.1) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <FaAngleRight className="text-gray-500 text-xs" />
              <span className="text-white font-medium">NexCura Smart Ring</span>
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
                {/* Logo Badge */}
                <div className="relative inline-block">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                    className="flex items-center gap-3"
                  >
                    {/* Premium Glass Badge */}
                    <div
                      className="px-5 py-2.5 rounded-full flex items-center gap-2.5"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(251, 245, 234, 0.9) 100%)",
                        backdropFilter: "blur(20px)",
                        boxShadow:
                          "0 8px 32px rgba(86, 70, 163, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      <div
                        className="p-1.5 rounded-full"
                        style={{
                          background:
                            "linear-gradient(135deg, #fbf5ea 0%, #ffffff 100%)",
                        }}
                      >
                        <GiSmartphone className="w-4 h-4 text-[#5646a3]" />
                      </div>
                      <span className="text-base font-bold text-[#5646a3]">
                        NexCura
                      </span>
                    </div>

                    {/* Smart Ring Badge */}
                    <div
                      className="px-4 py-2.5 rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0.1) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(236, 72, 153, 0.3)",
                      }}
                    >
                      <span className="text-sm font-bold bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-transparent">
                        SMART RING
                      </span>
                    </div>
                  </motion.div>

                  {/* NEW Badge */}
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                    className="absolute -top-3 -right-3 bg-gradient-to-br from-yellow-400 to-yellow-500 text-black text-xs font-black px-3 py-1 rounded-full shadow-lg"
                  >
                    NEW
                  </motion.span>
                </div>

                {/* Main Heading with Gradient */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight"
                >
                  <span className="bg-gradient-to-r from-[#fbf5ea] via-white to-[#fbf5ea] bg-clip-text text-transparent">
                    Monitor your health
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    more intelligently
                  </span>
                </motion.h1>

                {/* Description with Glass Background */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="p-6 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(86, 70, 163, 0.15) 0%, rgba(86, 70, 163, 0.05) 100%)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    Enhance your well-being with our smart ring—designed to
                    intelligently monitor vital health metrics, activity levels,
                    and sleep patterns, empowering smarter decisions for a
                    healthier lifestyle.
                  </p>
                </motion.div>

                {/* CTA Button with Premium Styling */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <button
                    className="group relative px-8 py-4 font-bold text-lg overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, #5646a3 0%, #9333ea 100%)",
                      boxShadow: "0 10px 40px rgba(86, 70, 163, 0.4)",
                    }}
                  >
                    <span className="relative z-10">
                      Reserve your Smart Ring now – pre-booking is live!
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
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
                  <div className="absolute inset-0 bg-gradient-radial from-[#5646a3]/40 via-purple-500/20 to-transparent rounded-full blur-3xl scale-150" />

                  <img
                    src="/images/smart_ring_img.svg"
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
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-[#fbf5ea] via-white to-[#fbf5ea] bg-clip-text text-transparent">
                Available Now
              </h2>
              <p className="text-gray-400 text-lg md:text-xl">
                Premium smart ring collection
              </p>
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
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5646a3] via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700" />

                      {/* Compact Modern Card */}
                      <div
                        className="relative rounded-2xl overflow-hidden backdrop-blur-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
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
                            className="md:col-span-2 bg-gradient-to-br from-[#5646a3]/10 to-purple-900/10 flex items-center justify-center p-6 md:p-8"
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
                              <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-gradient-to-r from-[#5646a3] to-purple-600 rounded-full text-xs font-bold text-white">
                                  PREMIUM
                                </span>
                                {products[0].productOldAmount && (
                                  <span className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-300">
                                    SAVE{" "}
                                    {Math.round(
                                      ((products[0].productOldAmount -
                                        products[0].productCurrentAmount) /
                                        products[0].productOldAmount) *
                                        100
                                    )}
                                    %
                                  </span>
                                )}
                              </div>

                              <h3 className="text-lg md:text-xl font-medium text-white">
                                {products[0].productDetails}
                              </h3>
                            </div>

                            {/* Compact Price */}
                            <div className="flex items-baseline gap-3">
                              <span className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
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
                                    className="w-4 h-4 text-emerald-400 flex-shrink-0"
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

                            {/* Delivery Badge */}
                            {products[0].deliveryDate && (
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg w-fit">
                                <span className="text-sm">🚚</span>
                                <span className="text-xs text-emerald-300 font-semibold">
                                  Delivery by {products[0].deliveryDate}
                                </span>
                              </div>
                            )}

                            {/* Compact CTA Button */}
                            <Link
                              href={`/smartRingDetails/${blackProduct?.productId}`}
                            >
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 px-6 rounded-lg font-bold text-base text-white relative overflow-hidden cursor-pointer group/btn"
                                style={{
                                  background:
                                    "linear-gradient(135deg, #5646a3 0%, #9333ea 100%)",
                                  boxShadow:
                                    "0 4px 20px rgba(86, 70, 163, 0.4)",
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
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                              </motion.button>
                            </Link>
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

      {/* Premium Preorder Dialog */}
      <AnimatePresence>
        {showPreorderDialog &&
          (preorderDialogShown === null || preorderDialogShown === "false") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
              style={{
                background: "rgba(0, 13, 36, 0.85)",
                backdropFilter: "blur(20px)",
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-md"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#5646a3] via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50" />

                {/* Dialog Content */}
                <div
                  className="relative rounded-3xl p-8 md:p-10"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(251, 245, 234, 0.95) 100%)",
                    backdropFilter: "blur(20px)",
                    boxShadow:
                      "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 1)",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => router.push("/smart-ring")}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(86, 70, 163, 0.1) 0%, rgba(86, 70, 163, 0.05) 100%)",
                      border: "1px solid rgba(86, 70, 163, 0.2)",
                    }}
                  >
                    <span className="text-2xl font-bold text-[#5646a3]">×</span>
                  </motion.button>

                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="flex justify-center mb-6"
                  >
                    <div
                      className="p-4 rounded-2xl"
                      style={{
                        background:
                          "linear-gradient(135deg, #5646a3 0%, #9333ea 100%)",
                        boxShadow: "0 10px 30px rgba(86, 70, 163, 0.4)",
                      }}
                    >
                      <GiSmartphone className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl font-black text-center mb-3 bg-gradient-to-r from-[#5646a3] to-purple-600 bg-clip-text text-transparent"
                  >
                    Enter Pre-Order Code
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center text-gray-700 mb-6 text-base"
                  >
                    Enter the code to proceed with your smart ring pre-order.
                  </motion.p>

                  {/* Form */}
                  <form onSubmit={handlePreorderSubmit} className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <input
                        type="text"
                        value={preorderCode}
                        onChange={(e) => setPreorderCode(e.target.value)}
                        placeholder="Enter your pre-order code"
                        className="w-full px-6 py-4 rounded-2xl text-gray-900 font-medium focus:outline-none focus:ring-2 transition-all duration-300"
                        style={{
                          background: "rgba(255, 255, 255, 0.8)",
                          border: "2px solid rgba(86, 70, 163, 0.2)",
                          boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.05)",
                        }}
                        autoFocus
                      />
                    </motion.div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)",
                          border: "1px solid rgba(239, 68, 68, 0.2)",
                        }}
                      >
                        <p className="text-red-600 text-sm font-medium text-center">
                          {error}
                        </p>
                      </motion.div>
                    )}

                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-4 px-8 rounded-2xl font-bold text-lg text-white relative overflow-hidden group cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(135deg, #5646a3 0%, #9333ea 100%)",
                        boxShadow: "0 10px 30px rgba(86, 70, 163, 0.4)",
                      }}
                    >
                      <span className="relative z-10">Proceed</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </form>

                  {/* Additional Info */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-center text-sm text-gray-600 mt-6"
                  >
                    Don't have a code?{" "}
                    <Link
                      href="/"
                      className="text-[#5646a3] font-bold hover:underline"
                    >
                      Go back to home
                    </Link>
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}
