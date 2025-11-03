"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  Users,
  Heart,
  User,
  Building2,
  Info,
  Award,
  Users2,
  Briefcase,
  Calendar,
  FileText,
  Circle,
} from "lucide-react";

const Navigation = ({ isScrolled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure consistent client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  const menuItems = [
    {
      name: "NexCura",
      href: "#",
      icon: Heart,
      hasDropdown: true,
      submenu: [
        { name: "Employers", href: "/employers", icon: Building2 },
        { name: "Caregivers", href: "/caregivers", icon: Users },
        { name: "Individuals", href: "/Individuals", icon: User },
         { name: "Smart Ring", href: "/smart-ring", icon: Circle },
      ],
    },
    {
      name: "Company",
      href: "#",
      icon: Building2,
      hasDropdown: true,
      submenu: [
        { name: "About Us", href: "/about-us", icon: Info },
        { name: "Our Values", href: "/our-values", icon: Award },
        { name: "Team Overview", href: "/team-overview", icon: Users2 },
        { name: "Join Us", href: "/join-us", icon: Briefcase },
      ],
    },
    {
      name: "Newsroom",
      href: "#",
      icon: FileText,
      hasDropdown: true,
      submenu: [
        { name: "Events", href: "/events", icon: Calendar },
        { name: "Blogs", href: "/blogs", icon: FileText },
      ],
    },
  ];

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
    setActiveDropdown(null);
  };

  const toggleMobileDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleMouseEnter = (index) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
    setHoverTimeout(timeout);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-8">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center space-x-1 cursor-pointer transition-colors duration-200 py-2 ${
                isScrolled
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-blue-200"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="font-medium">{item.name}</span>
              {item.hasDropdown && (
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
              )}
            </button>

            {/* Desktop Dropdown */}
            {item.hasDropdown && activeDropdown === index && (
              <div
                className={`absolute top-full left-0 mt-1 w-56 backdrop-blur-xl border rounded-lg shadow-xl z-50 ${
                  isScrolled
                    ? "bg-white/80 border-gray-200/50"
                    : "bg-white/10 border-white/20"
                }`}
              >
                <div className="py-2">
                  {item.submenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.href}
                      className={`flex items-center space-x-3 px-4 py-3 transition-colors duration-200 ${
                        isScrolled
                          ? "text-gray-700 hover:bg-gray-100/50 hover:text-gray-900"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      <subItem.icon
                        className={`w-4 h-4 ${
                          isScrolled ? "text-blue-600" : "text-blue-300"
                        }`}
                      />
                      <span className="font-medium">{subItem.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        className={`lg:hidden p-2 rounded-lg transition-colors cursor-pointer duration-200 ${
          isScrolled
            ? "text-gray-700 hover:bg-gray-100"
            : "text-white hover:bg-white/10"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation - Only render on client */}
      {isClient && (
        <div
          className={`fixed top-0 right-0 h-screen w-full bg-black/50 backdrop-blur-sm z-[99] lg:hidden transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeMenu}
        >
          <div
            className={`absolute top-0 right-0 h-full w-80 sm:w-96 backdrop-blur-xl border-l border-white/30 shadow-2xl transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Header */}
            <div
              className="flex items-center justify-between p-6 border-b border-white/30"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)",
              }}
            >
              <h2 className="text-xl font-bold text-white drop-shadow-lg">
                Menu
              </h2>
              <button
                onClick={closeMenu}
                className="p-2 rounded-lg transition-all cursor-pointer duration-200 text-white hover:bg-white/20 drop-shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex flex-col p-6 space-y-1">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <button
                    className="w-full flex items-center cursor-pointer justify-between p-4 rounded-lg transition-all duration-200 text-white hover:bg-white/10 font-medium"
                    onClick={() => toggleMobileDropdown(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-blue-300" />
                      <span className="text-lg">{item.name}</span>
                    </div>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Mobile Dropdown */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeDropdown === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-8 mt-2 space-y-1 transform transition-transform duration-300 ease-in-out">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10 transform ${
                            activeDropdown === index
                              ? "translate-y-0 opacity-100"
                              : "translate-y-2 opacity-0"
                          }`}
                          style={{
                            transitionDelay: `${subIndex * 50}ms`,
                          }}
                          onClick={closeMenu}
                        >
                          <subItem.icon className="w-4 h-4 text-blue-300" />
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
