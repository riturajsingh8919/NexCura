"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { blogPosts } from "@/data/blogData";
import { useRef } from "react";

/* ---------- Framer-motion Variants ---------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ---------- Scroll Number Component ---------- */
const ScrollNumber = ({ number, isRight, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold: 0.3,
    margin: "0px 0px -100px 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5, x: isRight ? 50 : -50 }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
              x: 0,
              rotate: [0, 5, -5, 0],
            }
          : { opacity: 0, scale: 0.5, x: isRight ? 50 : -50 }
      }
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        rotate: { duration: 2, repeat: Infinity, repeatDelay: 3 },
      }}
      className={`
        hidden lg:block absolute top-1/2 -translate-y-1/2 z-20
        ${isRight ? "right-8 xl:right-16" : "left-8 xl:left-16"}
      `}
    >
      <div className="relative">
        {/* Glowing background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-xl"
        />

        {/* Number container */}
        <div className="relative size-36 bg-white/80 backdrop-blur-md border-2 border-white/50 rounded-full flex items-center justify-center shadow-2xl">
          <span className="text-2xl xl:text-3xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            {String(number).padStart(2, "0")}
          </span>
        </div>

        {/* Decorative dots */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute -top-3 ${
            isRight ? "-left-3" : "-right-3"
          } w-2 h-2 bg-emerald-400 rounded-full`}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className={`absolute -bottom-3 ${
            isRight ? "-right-3" : "-left-3"
          } w-1.5 h-1.5 bg-blue-400 rounded-full`}
        />
      </div>
    </motion.div>
  );
};

/* ---------- Page ---------- */
export default function BlogMainPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* White gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-200" />

      {/* Subtle animated blobs to maintain depth */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-44 -right-32 w-[28rem] h-[28rem] bg-indigo-300/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-black bg-gradient-to-r from-emerald-500 via-emerald-700 to-blue-700 bg-clip-text text-transparent">
            Nexcura Health
          </h2>
          <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Exploring tomorrow's healthcare through innovation &amp; AI
          </p>
        </motion.header>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-16"
        >
          {blogPosts.map((post, i) => (
            <div key={post.id} className="relative">
              {/* Scroll-triggered number on opposite side */}
              <ScrollNumber
                number={i + 1}
                isRight={!(i % 2)} // Opposite side of the card
                delay={i * 0.1}
              />

              <motion.article
                variants={itemVariants}
                whileHover={{ scale: 1.04, rotate: 0, y: -6 }}
                className={`
                  ${post.angle}
                  ${i % 2 ? "ml-auto" : "mr-auto"}
                  ${
                    post.size === "wide"
                      ? "max-w-2xl"
                      : post.size === "large"
                      ? "max-w-xl"
                      : "max-w-lg"
                  }
                  cursor-pointer transition-transform duration-300
                `}
              >
                <Link href={`/blogs/${post.slug}`}>
                  <div className="relative overflow-hidden rounded-3xl shadow-xl bg-white/50 backdrop-blur-lg border border-white/30">
                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-10 group-hover:opacity-30 transition-opacity duration-300`}
                    />
                    {/* Image */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-60 md:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Content */}
                    <div className="p-6 md:p-8">
                      <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
                        {post.title}
                      </h2>
                      <p className="text-slate-600 text-sm md:text-base line-clamp-3">
                        {post.excerpt}
                      </p>
                      {/* Tag */}
                      <span
                        className={`inline-block mt-5 px-4 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${post.color} shadow-md`}
                      >
                        Health Innovation
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Utility classes for text clamping */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
