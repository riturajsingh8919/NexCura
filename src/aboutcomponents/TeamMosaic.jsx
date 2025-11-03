"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const TeamMosaic = () => {
  const [selectedTeam, setSelectedTeam] = useState("leadership");
  const [selectedMember, setSelectedMember] = useState(null);

  // Leadership Team Data with better image variety
  const leadershipTeam = [
    {
      id: "ramesh",
      name: "Ramesh Sundararajan",
      title: "Chief Executive Officer",
      image: "/team/ramesh.jpg",
      bio: "Leading our vision towards innovative healthcare solutions",
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "kalyan",
      name: "Kalyan Gudladana",
      title: "President & CTO",
      image: "/team/kalyan.jpg",
      bio: "Driving technological innovation and strategic direction",
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "daniel",
      name: "Dr. Daniel Botelho, MD",
      title: "Chief Medical Officer",
      image: "/team/daniel.jpg",
      bio: "Ensuring clinical excellence and medical oversight",
      color: "from-green-500 to-teal-600",
    },
    {
      id: "robin",
      name: "Robin Hackney",
      title: "Chief Marketing Officer",
      image: "/team/robin.png",
      bio: "Leading brand strategy and market expansion",
      color: "from-orange-500 to-red-600",
    },
    {
      id: "yousuf-lead",
      name: "Yousuf Al Yousuf",
      title: "President, Middle East Market",
      image: "/team/yousuf.jpg",
      bio: "Overseeing operations and growth in the Middle East region",
      color: "from-cyan-500 to-blue-600",
    },
    {
      id: "jaymen",
      name: "Jaymen Chavda",
      title: "General Counsel",
      image: "/team/jaymen.jpeg",
      bio: "Managing legal affairs and corporate compliance",
      color: "from-rose-500 to-pink-600",
    },
    {
      id: "james",
      name: "James Porter",
      title: "Director, Business Development",
      image: "/team/james.jpg",
      bio: "Driving strategic partnerships and business growth",
      color: "from-amber-500 to-orange-600",
    },
  ];

  // Advisory Board Data with repeated working images
  const advisoryBoard = [
    {
      id: "neda",
      name: "Neda Barqawi",
      title: "Investor Relations",
      description: "Managing Partner, Knovatech Ventures",
      image: "/team/neda.jpeg",
      expertise: ["Healthcare Investment", "Portfolio Management"],
    },
    {
      id: "jane",
      name: "Jane McCracken",
      title: "Strategic Growth",
      description: "Healthcare growth specialist with multiple exits",
      image: "/team/jane.jpeg",
      expertise: ["Business Growth", "Market Expansion"],
    },
    {
      id: "yousuf-adv",
      name: "Yousuf Al Yousuf",
      title: "Middle East Market",
      description: "COO of AI Yosuf Group",
      image: "/team/yousuf.jpg",
      expertise: ["Regional Markets", "Healthcare Innovation"],
    },
    {
      id: "amir",
      name: "Amir Karuppiah",
      title: "Technology & AI",
      description: "CTO with two successful exits",
      image: "/team/amir.jpeg",
      expertise: ["AI Technology", "Product Innovation"],
    },
    {
      id: "srikanth",
      name: "Srikanth Gundavarappu",
      title: "Business Strategy",
      description: "President, GC Ingredients Inc.",
      image: "/team/Srikanth.jpeg",
      expertise: ["Strategic Planning", "Industry Partnerships"],
    },
    {
      id: "dhanya-adv",
      name: "Dhanya Vijayakumar, MD",
      title: "Clinical Solutions",
      description: "Practicing neurologist and medical advisor",
      image: "/team/dhanya.jpg",
      expertise: ["Clinical Practice", "Medical Advisory"],
    },
  ];

  // Clinical Team Data with repeated working images
  const clinicalTeam = [
    {
      id: "daniel-clinical",
      name: "Daniel Botelho, MD",
      title: "Chief Medical Officer",
      image: "/team/daniel.jpg",
      specialization: "Medical Leadership",
      credentials: "MD, Board Certified",
    },
    {
      id: "srividhya",
      name: "Dr. Srividhya Karunanithi",
      title: "Senior Clinical Research Scientist",
      image: "/team/Srividhya.jpg",
      specialization: "Clinical Research",
      credentials: "PhD, Clinical Sciences",
    },
    {
      id: "dhanya-clinical",
      name: "Dr. Dhanya Vijayakumar",
      title: "Clinical Solutions Advisor",
      image: "/team/dhanya.jpg",
      specialization: "Neurology",
      credentials: "MD, Neurologist",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const LeadershipCard = ({ member, index }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => setSelectedMember(member)}
      className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden cursor-pointer group shadow-xl"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      />

      <div className="relative p-6">
        <div className="flex items-center space-x-4">
          <div className="relative size-28 rounded-full overflow-hidden ring-4 ring-white/10 group-hover:ring-white/30 transition-all duration-300">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg group-hover:text-blue-300 transition-colors">
              {member.name}
            </h3>
            <p className="text-gray-400 text-sm">{member.title}</p>
            <p className="text-gray-500 text-xs mt-1 italic">{member.bio}</p>
          </div>
        </div>

        <div
          className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r ${member.color} animate-pulse`}
        />
      </div>
    </motion.div>
  );

  const AdvisoryCard = ({ member }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group"
    >
      <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer min-h-[309px]">
        <div className="flex flex-col items-center text-center">
          <div className="relative size-28 mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full animate-pulse opacity-30" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-gray-200">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          </div>

          <h3 className="text-gray-900 font-bold text-lg mb-1">
            {member.name}
          </h3>
          <p className="text-purple-600 text-sm font-medium mb-2">
            {member.title}
          </p>
          <p className="text-gray-600 text-xs mb-3">{member.description}</p>

          <div className="flex flex-wrap gap-2 justify-center">
            {member.expertise.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs text-blue-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const ClinicalCard = ({ member }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.03, rotateX: 5 }}
      className="relative"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="bg-gradient-to-br from-white to-gray-100 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
        <div className="relative w-full h-[400px] overflow-hidden">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover w-full h-auto "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-xl mb-1">{member.name}</h3>
            <p className="text-emerald-300 text-sm">{member.title}</p>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-emerald-600">⚕️</span>
            <span className="text-gray-800 text-sm font-medium">
              {member.specialization}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-emerald-600">🎓</span>
            <span className="text-gray-600 text-xs">{member.credentials}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
      {/* Animated Background - more subtle for light theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl xl:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Innovative leaders, advisors, and clinicians working together to
              transform healthcare
            </p>
          </motion.div>

          {/* Team Navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white/80 backdrop-blur-lg rounded-full p-1 border border-gray-300 shadow-lg">
              {["leadership", "clinical", "advisory"].map((team) => (
                <button
                  key={team}
                  onClick={() => setSelectedTeam(team)}
                  className={`px-8 py-3 rounded-full font-medium cursor-pointer transition-all duration-300 text-center min-w-[120px] ${
                    selectedTeam === team
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {team.charAt(0).toUpperCase() + team.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Team Content */}
          <AnimatePresence mode="wait">
            {selectedTeam === "leadership" && (
              <motion.div
                key="leadership"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {leadershipTeam.map((member, index) => (
                  <LeadershipCard
                    key={member.id}
                    member={member}
                    index={index}
                  />
                ))}
              </motion.div>
            )}

            {selectedTeam === "advisory" && (
              <motion.div
                key="advisory"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {advisoryBoard.map((member) => (
                  <AdvisoryCard key={member.id} member={member} />
                ))}
              </motion.div>
            )}

            {selectedTeam === "clinical" && (
              <motion.div
                key="clinical"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {clinicalTeam.map((member) => (
                  <ClinicalCard key={member.id} member={member} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Member Detail Modal */}
          <AnimatePresence>
            {selectedMember && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedMember(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-gradient-to-br from-white to-gray-100 rounded-3xl p-8 max-w-md w-full border border-gray-200 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-gray-200">
                      <Image
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div>
                      <h2 className="text-gray-900 font-bold text-2xl">
                        {selectedMember.name}
                      </h2>
                      <p className="text-gray-600">{selectedMember.title}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">{selectedMember.bio}</p>

                  <button
                    onClick={() => setSelectedMember(null)}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg transition-shadow"
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TeamMosaic;