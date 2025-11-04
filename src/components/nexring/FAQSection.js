"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import {
  IoHelpCircleOutline,
  IoCartOutline,
  IoBatteryChargingOutline,
  IoPhonePortraitOutline,
  IoSyncOutline,
  IoWaterOutline,
} from "react-icons/io5";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I know which NxRing size to select?",
      answer:
        "Please refer to our NxRing measurement guide to get the most accurate fit.",
      icon: IoHelpCircleOutline,
    },
    {
      id: 2,
      question: "Does the NxRing come with a charging case?",
      answer: "Yes, each order of the NxRing includes a charging case.",
      icon: IoCartOutline,
    },
    {
      id: 3,
      question: "How long does the NxRing battery last?",
      answer:
        "The NxRing battery lasts up to 5 days on a single charge with typical use. Battery life may vary depending on usage patterns, features enabled, and ambient temperature. The included charging case provides multiple recharges without needing an outlet.",
      icon: IoBatteryChargingOutline,
    },
    {
      id: 4,
      question: "Which devices is the NxRing compatible with?",
      answer:
        "The NxRing connects to the NexCura app which is available in the Apple App Store and Google Play Store.",
      icon: IoPhonePortraitOutline,
    },
    {
      id: 5,
      question: "How does the NxRing sync with my device?",
      answer:
        "The NxRing connects to your phone or tablet via bluetooth. The NxRing continuously syncs data to the NexCura app which gives you actionable insights about your health and wellness.",
      icon: IoSyncOutline,
    },
    {
      id: 6,
      question: "Is the NxRing water-resistant?",
      answer:
        "Yes, the NxRing has a durable titanium build and tightly sealed design which  is water-resistant up to 50 meters (50 ATM) which makes it perfect for indoor, outdoor, and even underwater activities.",
      icon: IoWaterOutline,
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-[#000d24] via-[#1a1f3a] to-[#000d24]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #fbf5ea 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            Everything you need to know about NxRing
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  style={{
                    background: isOpen
                      ? "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(251, 245, 234, 0.08) 100%)"
                      : "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(251, 245, 234, 0.04) 100%)",
                    backdropFilter: "blur(20px)",
                    border: isOpen
                      ? "1px solid rgba(255, 255, 255, 0.2)"
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: isOpen
                      ? "0 8px 32px rgba(86, 70, 163, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                      : "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => toggleFAQ(index)}
                >
                  {/* Question */}
                  <div className="flex items-center gap-4 p-5 md:p-6">
                    {/* Icon */}
                    <motion.div
                      className="flex-shrink-0 p-3 rounded-xl"
                      style={{
                        background: isOpen
                          ? "linear-gradient(135deg, #5646a3 0%, #7c6bb8 100%)"
                          : "rgba(86, 70, 163, 0.2)",
                        transition: "all 0.3s ease",
                      }}
                      animate={{
                        scale: isOpen ? 1.05 : 1,
                      }}
                    >
                      <Icon
                        className={`w-5 h-5 md:w-6 md:h-6 ${
                          isOpen ? "text-white" : "text-[#5646a3]"
                        }`}
                      />
                    </motion.div>

                    {/* Question Text */}
                    <div className="flex-1">
                      <h3
                        className={`text-base md:text-lg font-bold ${
                          isOpen ? "text-white" : "text-gray-200"
                        } transition-colors duration-300`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    {/* Arrow Icon */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex-shrink-0"
                    >
                      <HiChevronDown
                        className={`w-6 h-6 ${
                          isOpen ? "text-[#fbf5ea]" : "text-gray-400"
                        } transition-colors duration-300`}
                      />
                    </motion.div>
                  </div>

                  {/* Answer */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.3, ease: "easeInOut" },
                          opacity: { duration: 0.2, ease: "easeInOut" },
                        }}
                        className="overflow-hidden"
                      >
                        <div
                          className="px-5 md:px-6 pb-5 md:pb-6 pt-2"
                          style={{
                            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          <p className="text-gray-300 text-sm md:text-base leading-relaxed pl-14">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom Shine Effect */}
                  {isOpen && (
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5646a3] to-transparent" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
