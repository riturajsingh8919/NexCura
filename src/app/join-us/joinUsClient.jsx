"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Briefcase } from "lucide-react";
import { jobs } from "@/data/jobs";
import ApplicationModal from "@/components/ApplicationModal";
import Link from "next/link";
import LayoutWrapper from "@/components/LayoutWrapper";

const departmentColors = {
  Engineering: "border-blue-500 hover:border-blue-600 hover:shadow-blue-500/20",
  "Research & Development":
    "border-emerald-500 hover:border-emerald-600 hover:shadow-emerald-500/20",
  Design:
    "border-purple-500 hover:border-purple-600 hover:shadow-purple-500/20",
};

export default function JoinUsClient() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const scrollToJobs = () => {
    const jobsSection = document.getElementById("jobs-section");
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
        <LayoutWrapper>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
            alt="Team collaboration in modern tech workspace"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Build the Future of{" "}
              <span className="text-blue-400">Healthcare</span> with Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              Join a mission-driven team where your work directly empowers
              individuals and transforms care.
            </p>
            <button
              onClick={scrollToJobs}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300"
            >
              View Open Roles
            </button>
          </motion.div>
        </div>
      </section>

      {/* Jobs Section */}
      <section id="jobs-section" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover opportunities to make an impact across engineering,
              research, and design
            </p>
          </motion.div>

          <div className="space-y-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div
                  className={`relative bg-white rounded-2xl p-8 border-l-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
                    departmentColors[job.department] || "border-gray-300"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                          {job.department}
                        </span>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600">
                        {job.title}
                      </h3>

                      <p className="text-gray-600 mb-4">{job.description}</p>
                    </div>

                    <div className="lg:ml-8 flex-shrink-0 mt-6 lg:mt-0">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleApplyClick(job)}
                        className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all"
                      >
                        Apply Now
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Don't see the perfect role?
              </h3>
              <p className="text-gray-600 mb-6">
                We're always looking for exceptional talent.
              </p>
              <Link href={"/contact-us"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-all"
                >
                  Get in Touch
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={selectedJob?.title}
      />
      <link rel="canonical" href="https://www.genaihealth.care/join-us" />
      </LayoutWrapper>
    </div>
  );
}
