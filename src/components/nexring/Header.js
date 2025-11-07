"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiSmartphone } from "react-icons/gi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set scrolled state
      setScrolled(currentScrollY > 20);

      // Show/hide header based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or at top - show header
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide header
        setVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo - Separate Glass Container */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/NxRing"
                className={`flex items-center gap-2.5 md:gap-3 px-5 md:px-6 pt-2.5 pb-1.5 md:pt-3 md:pb-2 rounded-full group transition-all duration-300 ${
                  scrolled ? "shadow-xl" : "shadow-lg"
                }`}
                style={{
                  background: scrolled
                    ? "linear-gradient(135deg, rgba(86, 70, 163, 0.3) 0%, rgba(86, 70, 163, 0.4) 100%)"
                    : "linear-gradient(135deg, rgba(86, 70, 163, 0.2) 0%, rgba(86, 70, 163, 0.25) 100%)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: scrolled
                    ? "0 8px 32px rgba(86, 70, 163, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                    : "0 4px 24px rgba(86, 70, 163, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                }}
              >
                <Image
                  src="/logo-nxring.png"
                  alt="Logo"
                  width={1400}
                  height={350}
                  className="w-[150px] h-auto object-contain"
                />
              </Link>
            </motion.div>

            {/* CTA Buttons - Separate Glass Container */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-2.5 rounded-full transition-all duration-300 ${
                scrolled ? "shadow-xl" : "shadow-lg"
              }`}
              style={{
                background: scrolled
                  ? "linear-gradient(135deg, rgba(86, 70, 163, 0.3) 0%, rgba(86, 70, 163, 0.4) 100%)"
                  : "linear-gradient(135deg, rgba(86, 70, 163, 0.2) 0%, rgba(86, 70, 163, 0.25) 100%)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: scrolled
                  ? "0 8px 32px rgba(86, 70, 163, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                  : "0 4px 24px rgba(86, 70, 163, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
              }}
            >
              {/* Buy Now Button */}
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center gap-2 px-5 md:px-7 py-2 rounded-full overflow-hidden transition-all duration-300 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #fbf5ea 100%)",
                    boxShadow: "0 4px 20px rgba(251, 245, 234, 0.4)",
                  }}
                >
                  {isMounted && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  )}

                  <span className="relative text-sm md:text-base font-bold text-[#5646a3]">
                    Preorder Now
                  </span>
                  <HiOutlineShoppingCart className="relative w-4 h-4 md:w-5 md:h-5 text-[#5646a3]" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
}
