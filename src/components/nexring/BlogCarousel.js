"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiArrowRight, HiClock, HiTag } from "react-icons/hi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function BlogCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const blogs = [
    {
      id: 1,
      image: "/blogs/1.jpg",
      category: "Health Tech",
      title: "The Future of Wearable Health Monitoring",
      excerpt:
        "Discover how smart rings are revolutionizing personal health tracking with AI-powered insights.",
      date: "Oct 12, 2025",
      readTime: "5 min read",
      author: "Dr. Sarah Chen",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      id: 2,
      image: "/blogs/2.jpg",
      category: "Wellness",
      title: "Sleep Optimization: Science Meets Technology",
      excerpt:
        "Learn how advanced sensor technology can transform your sleep quality and daily performance.",
      date: "Oct 10, 2025",
      readTime: "7 min read",
      author: "Michael Roberts",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      id: 3,
      image: "/blogs/3.jpg",
      category: "Innovation",
      title: "Titanium: The Material of Tomorrow",
      excerpt:
        "Explore why aerospace-grade titanium is the perfect choice for next-gen wearables.",
      date: "Oct 8, 2025",
      readTime: "6 min read",
      author: "Emma Wilson",
      gradient: "from-emerald-500/20 to-teal-500/20",
    },
    {
      id: 4,
      image: "/blogs/4.jpg",
      category: "AI & Data",
      title: "AI-Powered Health Insights Explained",
      excerpt:
        "Understanding how machine learning algorithms predict and prevent health issues.",
      date: "Oct 5, 2025",
      readTime: "8 min read",
      author: "Dr. James Park",
      gradient: "from-orange-500/20 to-red-500/20",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % blogs.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-[#000d24] via-[#1a1f3a] to-[#000d24]">
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
            Latest Insights
          </h2>
          <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            Explore the intersection of health, technology, and innovation
          </p>
        </motion.div>

        {/* Carousel Container with Side Arrows */}
        <div className="relative max-w-7xl mx-auto flex items-center gap-6 md:gap-8 lg:gap-12">
          {/* Left Arrow */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="hidden md:flex flex-shrink-0 p-4 lg:p-5 rounded-full cursor-pointer z-20"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(251, 245, 234, 0.1) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            }}
          >
            <BsArrowLeft className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
          </motion.button>

          {/* Main Card Display */}
          <div className="relative flex-1 h-[600px] md:h-[650px] lg:h-[700px] flex items-center justify-center perspective-1000">
            {blogs.map((blog, index) => {
              const offset =
                (index - currentIndex + blogs.length) % blogs.length;
              const isActive = offset === 0;
              const isPrev = offset === blogs.length - 1;
              const isNext = offset === 1;

              return (
                <motion.div
                  key={blog.id}
                  className="absolute w-full max-w-lg md:max-w-2xl lg:max-w-3xl"
                  initial={false}
                  animate={{
                    x: isActive
                      ? "0%"
                      : isPrev
                      ? "-80%"
                      : isNext
                      ? "80%"
                      : offset > 1
                      ? "200%"
                      : "-200%",
                    scale: isActive ? 1 : 0.75,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.5 : 0,
                    rotateY: isActive ? 0 : isPrev ? 25 : isNext ? -25 : 0,
                    z: isActive ? 0 : -100,
                    zIndex: isActive ? 10 : isPrev || isNext ? 5 : 0,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Blog Card */}
                  <motion.div
                    className="relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group"
                    style={{
                      background: `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(251, 245, 234, 0.9) 100%)`,
                      backdropFilter: "blur(20px)",
                      boxShadow:
                        "0 30px 80px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 1)",
                      border: "1px solid rgba(255, 255, 255, 0.8)",
                    }}
                    whileHover={isActive ? { scale: 1.02, y: -5 } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image Container */}
                    <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${blog.gradient} opacity-40 mix-blend-overlay`}
                      />
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Category Badge */}
                      <div
                        className="absolute top-5 left-5 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2"
                        style={{
                          background: "rgba(255, 255, 255, 0.95)",
                          color: "#5646a3",
                          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        <HiTag className="w-4 h-4" />
                        {blog.category}
                      </div>

                      {/* Slide Indicator */}
                      <div
                        className="absolute top-5 right-5 px-4 py-2 rounded-full text-sm font-bold"
                        style={{
                          background: "rgba(0, 0, 0, 0.5)",
                          backdropFilter: "blur(10px)",
                          color: "#fbf5ea",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(blogs.length).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 bg-white/95">
                      {/* Title */}
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-black mb-3 text-[#000d24] group-hover:text-[#5646a3] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-700 text-base md:text-lg mb-5 line-clamp-2">
                        {blog.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between mb-5 text-sm md:text-base text-gray-600">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5">
                            <HiClock className="w-4 h-4" />
                            {blog.readTime}
                          </span>
                          <span>{blog.date}</span>
                        </div>
                        <span className="font-bold text-[#5646a3]">
                          {blog.author}
                        </span>
                      </div>

                      {/* Read More Button */}
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="group/btn flex items-center gap-2 text-[#5646a3] font-bold text-base md:text-lg cursor-pointer"
                      >
                        Read More
                        <HiArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="hidden md:flex flex-shrink-0 p-4 lg:p-5 rounded-full cursor-pointer z-20"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(251, 245, 234, 0.1) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            }}
          >
            <BsArrowRight className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
          </motion.button>
        </div>

        {/* Mobile Navigation - Bottom */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="p-3 rounded-full cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(251, 245, 234, 0.1) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            }}
          >
            <BsArrowLeft className="w-5 h-5 text-white" />
          </motion.button>

          <div className="flex gap-2.5">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="transition-all duration-300 cursor-pointer"
                style={{
                  width: index === currentIndex ? "40px" : "12px",
                  height: "12px",
                  borderRadius: "6px",
                  background:
                    index === currentIndex
                      ? "linear-gradient(90deg, #5646a3, #fbf5ea)"
                      : "rgba(255, 255, 255, 0.4)",
                }}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="p-3 rounded-full cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(251, 245, 234, 0.1) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            }}
          >
            <BsArrowRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}
