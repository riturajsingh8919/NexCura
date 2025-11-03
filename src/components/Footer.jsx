"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Building2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUp,
  Newspaper,
  Youtube,
  Scale,
} from "lucide-react";

function Footer() {
  // Static footer navigation to prevent hydration mismatches
  const footerNavigation = {
    Company: [
      { name: "About", href: "/about-us" },
      { name: "Our Values", href: "/our-values" },
      { name: "Team Overview", href: "/team-overview" },
      { name: "Join Us", href: "/join-us" },
    ],
    NexCura: [
      { name: "Caregivers", href: "/caregivers" },
      { name: "Individuals", href: "/Individuals" },
      { name: "Employers", href: "/employers" },
      { name: "Smart Ring", href: "/smart-ring" },
    ],
    "News Room": [
      { name: "Events", href: "/events" },
      { name: "Blogs", href: "/blogs" },
      { name: "Contact Us", href: "/contact-us" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms and Conditions", href: "/terms-and-condition" },
      { name: "Disclaimer", href: "/disclaimer" },
    ],
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden md:px-10 py-12">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(166.77deg, #1445A3 31.42%, #850E80 99.23%, #092964 106.33%)",
          }}
        ></div>

        {/* Animated overlay gradient */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(45deg, rgba(20, 69, 163, 0.8) 0%, rgba(133, 14, 128, 0.6) 50%, rgba(9, 41, 100, 0.8) 100%)",
            backgroundSize: "400% 400%",
          }}
        ></div>

        {/* Floating particles effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-bounce delay-100"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-300/30 rounded-full animate-ping delay-300"></div>
          <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-purple-300/20 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-white/15 rounded-full animate-bounce delay-700"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-6 lg:pb-8">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <Image
                  className="w-[200px] h-auto object-cover"
                  src="/logo.svg"
                  alt="Logo"
                  width={100}
                  height={100}
                />
              </Link>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                Revolutionizing healthcare with innovative solutions that
                connect patients, providers, and technology for better outcomes.
              </p>

              {/* Contact Info */}

              <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-blue-300 flex-shrink-0" />
                <span className="text-sm">contact.us@genaihealth.care</span>
              </div>
            </div>

            {/* Navigation Links */}
            {Object.entries(footerNavigation).map(([category, links]) => (
              <div
                key={category}
                className={`lg:col-span-1 ${
                  category === "Company" ? "lg:ml-10 xl:ml-20" : ""
                }`}
              >
                <h3 className="text-white font-bold text-lg mb-4 sm:mb-6 flex items-center gap-2">
                  {category === "Company" && (
                    <Building2 className="w-5 h-5 text-blue-300" />
                  )}
                  {category === "NexCura" && (
                    <Heart className="w-5 h-5 text-purple-300" />
                  )}
                  {category === "News Room" && (
                    <Newspaper className="w-5 h-5 text-green-300" />
                  )}
                  {category === "Legal" && (
                    <Scale className="w-5 h-5 text-yellow-300" />
                  )}
                  {category}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 px-4 sm:px-6 lg:px-8 pt-6">
          <div className="container">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <p className="text-white/50 text-sm text-left">
                © 2025 GenAI Healthcare. All rights reserved.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4 order-first sm:order-none">
                <Link
                  href="https://www.linkedin.com/company/gen-ai-healthcare/"
                  target="_blank"
                  className="text-white/50 hover:text-white hover:scale-110 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href="https://twitter.com/genaihealthcare"
                  target="_blank"
                  className="text-white/50 hover:text-white hover:scale-110 transition-all duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.facebook.com/profile.php?id=61556415143670"
                  target="_blank"
                  className="text-white/50 hover:text-white hover:scale-110 transition-all duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/genaihealthcare/"
                  target="_blank"
                  className="text-white/50 hover:text-white hover:scale-110 transition-all duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.youtube.com/@GenAIHealthcare"
                  target="_blank"
                  className="text-white/50 hover:text-white hover:scale-110 transition-all duration-200"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="flex items-center cursor-pointer gap-2 text-white/70 hover:text-white hover:bg-white/10 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 text-sm"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Top</span>
                <span className="sm:hidden">Top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
