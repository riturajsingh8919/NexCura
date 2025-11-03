"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Clock,
  MapPin,
  Calendar,
  ChevronRight,
  ArrowLeft,
  Share2,
  BookOpen,
  Users,
  ExternalLink,
  Award,
  Sparkles,
  Network,
  Mic,
} from "lucide-react";

// Icon mapping
const iconMap = {
  Award: <Award className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />,
  Network: <Network className="w-8 h-8" />,
  Mic: <Mic className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Calendar: <Calendar className="w-8 h-8" />,
};

export default function SingleEventPage({ event }) {
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Generate table of contents from event sections
  const tableOfContents = [
    { id: "introduction", title: "Introduction" },
    ...(event?.content?.sections?.map((section) => ({
      id: section.id,
      title: section.title,
    })) || []),
    ...(event?.content?.agenda
      ? [{ id: "agenda", title: "Event Agenda" }]
      : []),
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
          title: event.title,
          text: event.description,
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

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-4">Event Not Found</h2>
          <Link href="/events" className="text-blue-600 hover:text-blue-800">
            ← Back to Events
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
          src={event.image}
          alt={event.title}
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
                href="/events"
                className="inline-flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Events</span>
              </Link>
            </motion.div>

            {/* Event Icon and Status */}
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              <div className="p-4 bg-white/20 rounded-2xl text-white backdrop-blur-sm">
                {iconMap[event.icon] || <Calendar className="w-8 h-8" />}
              </div>
              <div
                className={`px-4 py-2 rounded-full text-sm font-bold ${
                  event.status === "upcoming"
                    ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg"
                    : "bg-gradient-to-r from-slate-300 to-slate-400 text-slate-700 shadow-md"
                }`}
              >
                {event.status === "upcoming" ? "Upcoming Event" : "Past Event"}
              </div>
            </motion.div>

            <motion.h1
              className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {event.title}
            </motion.h1>

            <motion.p
              className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {event.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-6 text-blue-200"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-lg">
                <Users className="w-4 h-4" />
                <span>{event.type}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 bg-white/20 hover:bg-blue-600/30 px-3 py-1 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </motion.div>

            {/* External Link */}
            <motion.div
              className="mt-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <Link
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <span>Visit Event Website</span>
                <ExternalLink className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
          {/* Table of Contents - Sidebar */}
          <motion.div
            className="xl:col-span-1"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="sticky top-24 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-800">
                  Contents
                </h3>
              </div>
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left p-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                      activeSection === item.id
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                        : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span>{item.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="xl:col-span-3"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50">
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Introduction
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {event.content?.introduction}
                </p>
              </section>

              {/* Dynamic Sections */}
              {event.content?.sections?.map((section, index) => (
                <section key={section.id} id={section.id} className="mb-12">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">
                    {section.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {section.content}
                  </p>
                </section>
              ))}

              {/* Event Agenda */}
              {event.content?.agenda && (
                <section id="agenda" className="mb-12">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">
                    Event Agenda
                  </h2>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200/50">
                    <div className="space-y-4">
                      {event.content.agenda.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 bg-white/70 rounded-lg border border-blue-100"
                        >
                          <div className="flex items-center space-x-2 text-blue-600 font-semibold min-w-0 flex-shrink-0">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{item.time}</span>
                          </div>
                          <div className="h-6 w-px bg-blue-200" />
                          <span className="text-slate-700 font-medium">
                            {item.activity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Conclusion */}
              <section id="conclusion" className="mb-12">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Conclusion
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {event.content?.conclusion}
                </p>
              </section>

              {/* Event Actions */}
              <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  Event Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <span className="text-sm text-slate-500">Date</span>
                        <p className="font-semibold text-slate-800">
                          {event.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <span className="text-sm text-slate-500">Location</span>
                        <p className="font-semibold text-slate-800">
                          {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <div>
                        <span className="text-sm text-slate-500">
                          Event Type
                        </span>
                        <p className="font-semibold text-slate-800">
                          {event.type}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 cursor-pointer"
                    >
                      <span>Visit Event Website</span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
