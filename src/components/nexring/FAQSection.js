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
  IoAppsOutline,
  IoMoonOutline,
  IoFitnessOutline,
  IoWaterOutline,
  IoSearchOutline,
} from "react-icons/io5";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is the sizing kit process?",
      answer:
        "Our complimentary sizing kit includes 8 different ring sizes to help you find your perfect fit. Simply order the kit, try the sizes at home, and return it using the prepaid shipping label. Once you know your size, you can confidently order your NexRing.",
      icon: IoHelpCircleOutline,
    },
    {
      id: 2,
      question: "How do I purchase an additional charging case?",
      answer:
        "You can purchase an additional charging case directly from our online store. Navigate to the Accessories section, select the charging case, and add it to your cart. Each case comes with a USB-C cable and provides up to 7 days of charging power.",
      icon: IoCartOutline,
    },
    {
      id: 3,
      question: "How long does the NexRing battery last?",
      answer:
        "The NexRing battery lasts up to 7 days on a single charge with typical use. Battery life may vary depending on usage patterns, features enabled, and ambient temperature. The included charging case provides multiple recharges without needing an outlet.",
      icon: IoBatteryChargingOutline,
    },
    {
      id: 4,
      question:
        "Which devices and operating systems (OS) is the NexRing app compatible with?",
      answer:
        "The NexRing app is compatible with iOS 14.0 or later (iPhone 6s and newer) and Android 8.0 or later. The app requires Bluetooth 5.0 or higher for optimal connectivity. Tablets are also supported for both iOS and Android platforms.",
      icon: IoPhonePortraitOutline,
    },
    {
      id: 5,
      question: "How does syncing the NexRing with my smartphone work?",
      answer:
        "Syncing is automatic and seamless. Once paired via Bluetooth, your NexRing continuously syncs data throughout the day. Simply open the app, and your latest health metrics will be updated. Manual sync is also available by pulling down to refresh in the app.",
      icon: IoSyncOutline,
    },
    {
      id: 6,
      question: "Can the NexRing sync with other apps?",
      answer:
        "Yes! NexRing integrates with popular health and fitness apps including Apple Health, Google Fit, Strava, and more. You can enable these integrations in the app settings to share your data across platforms and maintain a comprehensive health profile.",
      icon: IoAppsOutline,
    },
    {
      id: 7,
      question: "Can I wear my NexRing only at night?",
      answer:
        "Absolutely! While wearing the ring 24/7 provides the most comprehensive data, wearing it only at night still gives you valuable sleep insights including sleep stages, heart rate variability, and recovery metrics. Night-only wear is perfect for sleep optimization.",
      icon: IoMoonOutline,
    },
    {
      id: 8,
      question: "Can I wear my NexRing while working out?",
      answer:
        "Yes! The NexRing is designed for active lifestyles. It automatically detects workouts and tracks heart rate, calories burned, and activity intensity. The durable titanium construction withstands impact, making it perfect for any workout routine.",
      icon: IoFitnessOutline,
    },
    {
      id: 9,
      question: "Is the NexRing waterproof?",
      answer:
        "The NexRing is water-resistant up to 100 meters (10 ATM), making it suitable for swimming, showering, and water sports. You can wear it worry-free in any water activity. However, avoid exposing it to hot water like saunas or hot tubs.",
      icon: IoWaterOutline,
    },
    {
      id: 10,
      question: "How can I find a lost ring?",
      answer:
        "The NexRing app features a 'Find My Ring' function that shows the last known location of your ring on a map. The ring will also emit a sound when activated through the app, helping you locate it nearby. Premium members get extended location history.",
      icon: IoSearchOutline,
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
            Everything you need to know about NexRing
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-gray-400 text-base md:text-lg mb-6">
            Still have questions? We&apos;re here to help!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full font-bold text-base md:text-lg cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #5646a3 0%, #7c6bb8 100%)",
              boxShadow: "0 8px 24px rgba(86, 70, 163, 0.4)",
              color: "white",
            }}
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
