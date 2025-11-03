"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Clock,
  User,
  Calendar,
  ChevronRight,
  ArrowLeft,
  Share2,
  BookOpen,
  Tag,
} from "lucide-react";

export default function SingleBlogPage({ blog }) {
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Generate table of contents from blog sections
  const tableOfContents = [
    { id: "introduction", title: "Introduction" },
    ...(blog?.content?.sections?.map((section) => ({
      id: section.id,
      title: section.title,
    })) || []),
    { id: "conclusion", title: "Conclusion" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    tableOfContents.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tableOfContents]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-4">Blog Not Found</h2>
          <Link href="/blogs" className="text-blue-600 hover:text-blue-800">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Progress Bar */}
      <motion.div
        className="hidden xl:block fixed top-[64px] left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 transform-gpu z-[50]"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <motion.section
        className="relative h-full w-full overflow-hidden pt-[64px] flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/70 to-indigo-900/60" />

        <motion.div
          className="container z-10"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative py-16 xl:py-20">
            {/* Back Button */}
            <motion.div
              className="mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/blogs"
                className="inline-flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Blogs</span>
              </Link>
            </motion.div>

            <motion.h1
              className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {blog.title}
            </motion.h1>

            <motion.p
              className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {blog.excerpt}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-6 text-blue-200"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(blog.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{blog.readTime}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 bg-white/20 hover:bg-blue-600/30 px-3 py-1 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </motion.div>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2 mt-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {blog.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-sm text-blue-100 transition-colors duration-200"
                >
                  <Tag className="w-3 h-3" />
                  <span>{tag}</span>
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Main Content Layout */}
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-16">
          {/* Main Article Content */}
          <motion.article
            className="lg:col-span-8 xl:col-span-7"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="prose prose-lg prose-slate max-w-none">
              {/* Introduction */}
              <section id="introduction">
                <p className="text-xl text-slate-600 leading-relaxed mb-8 font-serif">
                  {blog.content?.introduction}
                </p>
              </section>

              {/* Dynamic Sections */}
              {blog.content?.sections?.map((section, index) => (
                <section key={section.id} id={section.id} className="mt-16">
                  <h2 className="text-2xl font-medium text-slate-900 mb-6 flex items-center">
                    <div
                      className={`w-8 h-8 rounded-lg mr-3 flex items-center justify-center text-white bg-gradient-to-r ${blog.color}`}
                    >
                      <BookOpen className="w-5 h-5" />
                    </div>
                    {section.title}
                  </h2>
                  <div className="font-serif text-slate-700 leading-relaxed mb-6 whitespace-pre-line">
                    {section.content}
                  </div>
                </section>
              ))}

              {/* Conclusion */}
              <section id="conclusion" className="mt-16">
                <h2 className="text-2xl font-medium text-slate-900 mb-6 flex items-center">
                  <div
                    className={`w-8 h-8 rounded-lg mr-3 flex items-center justify-center text-white bg-gradient-to-r ${blog.color}`}
                  >
                    <BookOpen className="w-5 h-5" />
                  </div>
                  Conclusion
                </h2>
                <div className="font-serif text-slate-700 leading-relaxed mb-6">
                  {blog.content?.conclusion}
                </div>
              </section>

              {/* Call to Action */}
              <motion.div
                className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-xl font-medium text-slate-900 mb-4">
                  Ready to Transform Your Healthcare Journey?
                </h3>
                <p className="text-slate-600 mb-6">
                  Discover how Nexcura's AI-powered platform can revolutionize
                  your approach to health and wellness.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="#"
                    className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-all duration-200"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/blogs"
                    className="inline-flex items-center space-x-2 bg-white text-slate-700 px-6 py-3 rounded-lg font-medium border border-slate-300 hover:bg-slate-300 transition-all duration-200"
                  >
                    <span>More Articles</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            className="lg:col-span-4 xl:col-span-5"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Table of Contents */}
            <div className="sticky top-24 space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
                <h3 className="text-xl font-medium text-slate-900 mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Author Info */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
                <h3 className="text-xl font-medium text-slate-900 mb-4">
                  About the Author
                </h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl">
                    {blog.author
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {blog.author}
                    </p>
                    <p className="text-sm text-slate-600">
                      Healthcare Innovation Expert
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">
                  Leading researcher in AI-powered healthcare solutions, with
                  expertise in preventive care and personalized medicine.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
