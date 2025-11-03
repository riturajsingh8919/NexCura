"use client";

import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Simple but attractive button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 cursor-pointer z-50 group flex items-center justify-center w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 animate-bounce-scale"
          aria-label="Go to top"
        >
          <ArrowUp className="h-6 w-6 text-white transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
      )}

      <style jsx>{`
        @keyframes bounceScale {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-bounce-scale {
          animation: bounceScale 2s infinite;
        }
      `}</style>
    </>
  );
}
