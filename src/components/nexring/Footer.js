"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoYoutube,
  IoArrowForward,
} from "react-icons/io5";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Warranty Policy", href: "/warranty-policy" },
    { name: "Return & Refund", href: "/return-and-refund-policy" },
  ];

  const toolsLinks = [
    { name: "BMR Calculator", href: "/tools/bmr-calculator" },
    { name: "Macro Calculator", href: "/tools/macro-calculator" },
    { name: "Body Fat Calculator", href: "/tools/body-fat-calculator" },
    { name: "1RM Calculator", href: "/tools/one-rep-max-calculator" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Become a Coach", href: "/become-a-coach" },
    { name: "Help & Support", href: "/faq" },
    { name: "Contact Us", href: "/contact-us" },
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
                <h2
                  className="text-5xl md:text-6xl font-black tracking-tight leading-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #5646a3 50%, #fbf5ea 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 20px rgba(86, 70, 163, 0.5))",
                  }}
                >
                  NexRing
                </h2>
              </Link>

              {/* Tagline */}
              <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-md">
                Revolutionizing personal health tracking with{" "}
                <span className="text-[#fbf5ea] font-semibold">
                  AI-powered insights
                </span>
                . Experience the future of wearable technology on your finger.
              </p>

              {/* Clean Newsletter Input */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3.5 rounded-xl text-white placeholder:text-gray-500 outline-none text-sm font-medium"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3.5 rounded-xl font-bold text-white cursor-pointer text-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, #5646a3 0%, #7c6bb8 100%)",
                    boxShadow: "0 4px 16px rgba(86, 70, 163, 0.4)",
                  }}
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
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

            {/* Tools Links */}
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
                Tools
              </h3>
              <ul className="space-y-4">
                {toolsLinks.map((link, index) => (
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
              transition={{ duration: 0.6, delay: 0.3 }}
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
              © {currentYear} NexRing. All rights reserved. Designed with{" "}
              <span className="text-red-500">❤️</span> in India
            </motion.p>

            {/* Social Links */}
            <motion.div
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
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
