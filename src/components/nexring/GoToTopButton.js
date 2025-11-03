"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUp } from "react-icons/hi2";

export default function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoHidden, setIsAutoHidden] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const currentTime = Date.now();

      // Show button after 200px scroll
      setIsVisible(scrollTop > 200);

      // Reset auto-hide when user scrolls
      setIsAutoHidden(false);
      setLastScrollTime(currentTime);

      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set timeout to hide after 5 seconds of no scrolling
      timeoutId = setTimeout(() => {
        if (scrollTop > 200) {
          setIsAutoHidden(true);
        }
      }, 5000);
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const shouldShow = isVisible && !isAutoHidden;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.button
          initial={{
            opacity: 0,
            scale: 0.8,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            y: 20,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.4,
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 12px 40px rgba(255, 255, 255, 0.3)",
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center group cursor-pointer"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(251, 245, 234, 0.15) 100%)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow:
              "0 8px 32px 0 rgba(255, 255, 255, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.4)",
          }}
          aria-label="Go to top"
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["-200%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          </motion.div>

          {/* Arrow Icon */}
          <motion.div
            className="relative z-10"
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <HiArrowUp
              className="w-6 h-6 text-white drop-shadow-lg"
              style={{
                filter: "drop-shadow(0 2px 8px rgba(255, 255, 255, 0.3))",
              }}
            />
          </motion.div>

          {/* Pulse ring effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/40"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{
              scale: 1.5,
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
