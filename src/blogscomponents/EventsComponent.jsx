"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  ExternalLink,
  Users,
  MapPin,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { events } from "@/data/eventsData";
import LayoutWrapper from "@/components/LayoutWrapper";

// Animation variants (same as before)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          visiblePages.push(i);
        }
        visiblePages.push("...");
        visiblePages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        visiblePages.push(1);
        visiblePages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          visiblePages.push(i);
        }
      } else {
        visiblePages.push(1);
        visiblePages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          visiblePages.push(i);
        }
        visiblePages.push("...");
        visiblePages.push(totalPages);
      }
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center gap-2 mt-12"
    >
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 h-10 w-10 border-gray-200 hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-gray-400 text-sm">...</span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "ghost"}
                size="sm"
                onClick={() => onPageChange(page)}
                className={`h-10 w-10 text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {page}
              </Button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 h-10 w-10 border-gray-200 hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};

// Updated Event Card Component (same as before)
const EventCard = ({ event, index }) => {
  const eventDate = new Date(event.date);
  const currentDate = new Date();
  const isUpcoming = eventDate >= currentDate;

  const formattedDate = eventDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const fullFormattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div variants={cardVariants} whileHover={{ y: -4 }}>
      <Card className="group overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
        <div className="relative overflow-hidden">
          <div className="aspect-video relative">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              <Badge
                variant={isUpcoming ? "default" : "secondary"}
                className={`backdrop-blur-md font-medium ${
                  isUpcoming
                    ? "bg-emerald-500 text-white shadow-emerald-500/25"
                    : "bg-gray-500/80 text-white shadow-gray-500/25"
                } shadow-lg`}
              >
                {isUpcoming ? "Upcoming" : "Past Event"}
              </Badge>
            </div>

            {/* Enhanced Date Overlay */}
            <div className="absolute bottom-0 left-0 right-0">
              <div className="bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-white font-bold text-lg">
                    <Calendar className="w-5 h-5 mr-3 text-white" />
                    <span className="drop-shadow-lg">{formattedDate}</span>
                  </div>
                  <div className="text-white/80 text-sm font-medium">
                    {fullFormattedDate.split(",")[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CardHeader className="pb-3 space-y-2">
          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight line-clamp-2">
            {event.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0 space-y-4">
          <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {event.description}
          </CardDescription>

          {/* Enhanced Learn More Button */}
          <div className="pt-2">
            <Button
              variant="ghost"
              size="sm"
              className="group/btn relative overflow-hidden p-0 h-auto font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300 cursor-pointer"
              onClick={() => window.open(event.link, "_blank")}
            >
              <span className="relative z-10 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-blue-600 group-hover/btn:text-purple-600 transition-colors duration-300" />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold group-hover/btn:from-blue-700 group-hover/btn:to-purple-700">
                  Discover More
                </span>
                <ArrowRight className="w-4 h-4 ml-2 text-purple-600 group-hover/btn:translate-x-1 group-hover/btn:text-blue-600 transition-all duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-md -m-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Updated Events Grid Component with Pagination
const EventsGrid = ({ events, title, currentPage, pageSize = 6 }) => {
  // Calculate pagination
  const totalPages = Math.ceil(events.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentEvents = events.slice(startIndex, endIndex);

  if (events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16"
      >
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Calendar className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">
            No {title} Found
          </h3>
          <p className="text-gray-500 text-lg">
            {title === "upcoming events"
              ? "No upcoming events scheduled. Please check back later!"
              : "No past events to display at the moment."}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
    >
      {currentEvents.map((event, index) => (
        <EventCard key={event.id} event={event} index={index} />
      ))}
    </motion.div>
  );
};

// Hero Section Component (same as before)
const HeroSection = () => {
  return (
            <LayoutWrapper>
    
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Conference stage with audience"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

      <div className="relative z-20 h-full flex items-center justify-center px-4">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Shaping the Future of
            <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Innovation
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 font-light leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover world-class conferences, summits, and networking events
            that connect industry pioneers and shape tomorrow's breakthroughs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105"
              onClick={() =>
                document
                  .getElementById("events-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Events
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
    </LayoutWrapper>
  );
};

// Main Events Page Component
export default function EventsPage() {
  const currentDate = new Date();
  const pageSize = 6;

  // Pagination state
  const [upcomingCurrentPage, setUpcomingCurrentPage] = useState(1);
  const [pastCurrentPage, setPastCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= currentDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = events
    .filter((event) => new Date(event.date) < currentDate)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate total pages
  const upcomingTotalPages = Math.ceil(upcomingEvents.length / pageSize);
  const pastTotalPages = Math.ceil(pastEvents.length / pageSize);

  // Handle tab change and reset pagination
  const handleTabChange = (value) => {
    setActiveTab(value);
    if (value === "upcoming") {
      setUpcomingCurrentPage(1);
    } else {
      setPastCurrentPage(1);
    }
  };

  // Reset to page 1 when switching tabs if current page exceeds total pages
  const handleUpcomingPageChange = (page) => {
    setUpcomingCurrentPage(page);
    // Smooth scroll to top of events section
    document.getElementById("events-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePastPageChange = (page) => {
    setPastCurrentPage(page);
    // Smooth scroll to top of events section
    document.getElementById("events-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <HeroSection />

      <section id="events-section" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Featured Events
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with industry leaders, discover cutting-edge innovations,
              and expand your professional network at our curated selection of
              premier events.
            </p>

            <div className="flex justify-center gap-12 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">
                  {upcomingEvents.length}
                </div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Upcoming Events
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {pastEvents.length}
                </div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Past Events
                </div>
              </div>
            </div>
          </motion.div>

          {/* Fixed Tabs with Pagination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 p-2 bg-gray-100/80 backdrop-blur-sm rounded-xl h-14 border border-gray-200/50">
                <TabsTrigger
                  value="upcoming"
                  className="cursor-pointer text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 rounded-lg transition-all duration-300 hover:bg-white/50"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming ({upcomingEvents.length})
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="cursor-pointer text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 rounded-lg transition-all duration-300 hover:bg-white/50"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Past ({pastEvents.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="upcoming"
                className="space-y-8 focus-visible:outline-none"
              >
                <EventsGrid
                  events={upcomingEvents}
                  title="upcoming events"
                  currentPage={upcomingCurrentPage}
                  pageSize={pageSize}
                />
                <Pagination
                  currentPage={upcomingCurrentPage}
                  totalPages={upcomingTotalPages}
                  onPageChange={handleUpcomingPageChange}
                />
              </TabsContent>

              <TabsContent
                value="past"
                className="space-y-8 focus-visible:outline-none"
              >
                <EventsGrid
                  events={pastEvents}
                  title="past events"
                  currentPage={pastCurrentPage}
                  pageSize={pageSize}
                />
                <Pagination
                  currentPage={pastCurrentPage}
                  totalPages={pastTotalPages}
                  onPageChange={handlePastPageChange}
                />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
