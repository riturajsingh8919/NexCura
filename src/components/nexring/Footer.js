"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoYoutube,
  IoArrowForward,
  IoCheckmarkCircle,
  IoAlertCircle,
} from "react-icons/io5";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Newsletter subscription state
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address");
      setMessageType("error");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          honeypot: "", // Empty honeypot field for legitimate users
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(
          "🎉 Successfully subscribed! Check your email for confirmation."
        );
        setMessageType("success");
        setEmail(""); // Clear the input
      } else {
        setMessage(data.error || "Subscription failed. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setMessage("Network error. Please check your connection and try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);

      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    }
  };

  const legalLinks = [
    {
      name: "Terms & Conditions",
      href: "https://nex-cura.vercel.app/privacy-policy",
    },
    {
      name: "Privacy Policy",
      href: "https://nex-cura.vercel.app/terms-and-condition",
    },
    {
      name: "Disclaimer",
      href: "https://nex-cura.vercel.app/disclaimer",
    },
  ];

  const companyLinks = [
    {
      name: "About Us",
      href: "https://www.genaihealth.care/about-us",
    },
    {
      name: "Help & Support",
      href: "https://www.genaihealth.care/contact-us",
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: IoLogoFacebook,
      href: "https://facebook.com",
      color: "#1877F2",
    },
    {
      name: "Twitter",
      icon: IoLogoTwitter,
      href: "https://twitter.com",
      color: "#1DA1F2",
    },
    {
      name: "Instagram",
      icon: IoLogoInstagram,
      href: "https://instagram.com",
      color: "#E4405F",
    },
    {
      name: "LinkedIn",
      icon: IoLogoLinkedin,
      href: "https://linkedin.com",
      color: "#0A66C2",
    },
    {
      name: "YouTube",
      icon: IoLogoYoutube,
      href: "https://youtube.com",
      color: "#FF0000",
    },
  ];

  return (
    <footer className="relative bg-[#000d24] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5646a3]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5646a3]/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Gradient Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5646a3] to-transparent" />

      {/* Main Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section with Newsletter */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <Link href="/" className="inline-block mb-6 group">
                <div className="relative w-48 h-12">
                  <Image
                    src="/logo-nxring.png"
                    alt="NexCura powered by GenAI"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>

              {/* Tagline */}
              <h3 className="text-2xl font-black text-[#fbf5ea] mb-4">
                Predict. Prevent. Protect.
              </h3>

              {/* Newsletter CTA */}
              <p className="text-[#aeacaf] text-sm mb-6 leading-relaxed">
                Stay updated with the latest health insights, product updates,
                and exclusive offers from NxRing.
              </p>

              {/* Newsletter Subscription Form */}
              <form
                onSubmit={handleNewsletterSubmit}
                className="space-y-4 max-w-md"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                    className="flex-1 px-5 py-3.5 rounded-xl text-white placeholder:text-gray-500 outline-none text-sm font-medium transition-all duration-300 focus:ring-2 focus:ring-[#5646a3]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                    className="px-6 py-3.5 rounded-xl font-bold text-white cursor-pointer text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: isSubmitting
                        ? "rgba(86, 70, 163, 0.5)"
                        : "#5646a3",
                      boxShadow: isSubmitting
                        ? "none"
                        : "0 4px 16px rgba(86, 70, 163, 0.4)",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </motion.button>
                </div>

                {/* Honeypot field for bot detection (hidden) */}
                <input
                  type="text"
                  name="honeypot"
                  style={{ display: "none" }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                {/* Status Message */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{
                      type: "spring",
                      duration: 0.5,
                      bounce: messageType === "success" ? 0.4 : 0.2,
                    }}
                    className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      messageType === "success"
                        ? "text-[#fbf5ea] border"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                    style={
                      messageType === "success"
                        ? {
                            background: "rgba(86, 70, 163, 0.2)",
                            borderColor: "#5646a3",
                            boxShadow: "0 4px 15px rgba(86, 70, 163, 0.3)",
                          }
                        : {}
                    }
                  >
                    {messageType === "success" ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring" }}
                      >
                        <IoCheckmarkCircle className="w-4 h-4 flex-shrink-0 text-[#5646a3]" />
                      </motion.div>
                    ) : (
                      <IoAlertCircle className="w-4 h-4 flex-shrink-0" />
                    )}
                    <span>{message}</span>
                  </motion.div>
                )}

                {/* Privacy Notice */}
                <p className="text-xs text-gray-500 leading-relaxed">
                  By subscribing, you agree to receive updates about NxRing
                  products and health insights. We respect your privacy and you
                  can unsubscribe at any time.
                </p>
              </form>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-black text-xl mb-6 flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #5646a3 0%, #7c6bb8 100%)",
                    boxShadow: "0 0 10px rgba(86, 70, 163, 0.8)",
                  }}
                />
                Legal
              </h3>
              <ul className="space-y-4">
                {legalLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#fbf5ea] transition-all duration-300 text-sm flex items-center gap-2 group"
                    >
                      <IoArrowForward className="w-0 h-4 text-[#5646a3] group-hover:w-4 transition-all duration-300" />
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-black text-xl mb-6 flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #5646a3 0%, #7c6bb8 100%)",
                    boxShadow: "0 0 10px rgba(86, 70, 163, 0.8)",
                  }}
                />
                Company
              </h3>
              <ul className="space-y-4">
                {companyLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#fbf5ea] transition-all duration-300 text-sm flex items-center gap-2 group"
                    >
                      <IoArrowForward className="w-0 h-4 text-[#5646a3] group-hover:w-4 transition-all duration-300" />
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="pt-8 border-t"
          style={{
            borderColor: "rgba(86, 70, 163, 0.2)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm text-center md:text-left"
            >
              © {currentYear} NxRing. All rights reserved.
            </motion.p>

            {/* Social Links */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.2,
                      y: -5,
                      boxShadow: `0 10px 30px ${social.color}60`,
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl cursor-pointer group relative overflow-hidden"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors relative z-10" />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${social.color} 0%, ${social.color}80 100%)`,
                      }}
                    />
                  </motion.a>
                );
              })}
            </motion.div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
