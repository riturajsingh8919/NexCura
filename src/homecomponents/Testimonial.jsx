"use client";

import React from "react";
import { Star } from "lucide-react";

function Testimonial() {
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      company: "Metro General Hospital",
      avatar: "👩‍⚕️",
      rating: 5,
      content:
        "GenAI Healthcare has revolutionized how we handle patient data and streamlined our workflow significantly. The AI-powered insights have improved our diagnostic accuracy by 40%.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Healthcare Administrator",
      company: "Pacific Health Systems",
      avatar: "👨‍💼",
      rating: 5,
      content:
        "The integration with our existing EHR system was seamless. GenAI Healthcare analytics dashboard gives us real-time insights that help us make better operational decisions.",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Family Medicine Physician",
      company: "Community Health Center",
      avatar: "👩‍⚕️",
      rating: 5,
      content:
        "As a busy family doctor, GenAI Healthcare saves me hours every day. The automated documentation and smart scheduling have transformed my practice completely.",
    },
    {
      id: 4,
      name: "James Wilson",
      role: "IT Director",
      company: "Regional Medical Group",
      avatar: "👨‍💻",
      rating: 5,
      content:
        "Implementation was smooth and the support team is exceptional. GenAI Healthcare security features give us peace of mind when handling sensitive patient information.",
    },
    {
      id: 5,
      name: "Dr. Lisa Park",
      role: "Cardiologist",
      company: `Heart and Vascular Institute`,
      avatar: "👩‍⚕️",
      rating: 5,
      content:
        "The predictive analytics for cardiovascular risk assessment have been game-changing. We can now identify at-risk patients earlier and provide better preventive care.",
    },
    {
      id: 6,
      name: "Robert Kim",
      role: "Practice Manager",
      company: "Wellness Medical Center",
      avatar: "👨‍💼",
      rating: 5,
      content:
        "Our patient satisfaction scores have increased dramatically since implementing GenAI Healthcare. The streamlined processes have improved both staff and patient experiences.",
    },
  ];

  return (
    <section className=" py-16 overflow-hidden bg-gray-100">
      {/* Section Header - Full Width Container */}
      <div className="container mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 leading-relaxed">
          What Our Valued Customers Say
        </h2>
      </div>

      {/* Full Width Scrolling Section */}
      <div className="relative w-full">
        {/* Left Gradient Mask - Full Height */}
        {/* <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 lg:w-30 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent z-20 pointer-events-none"></div> */}

        {/* Right Gradient Mask - Full Height */}
        {/* <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 lg:w-30 bg-gradient-to-l from-gray-50 via-gray-50/90 to-transparent z-20 pointer-events-none"></div> */}

        {/* Scrolling Container - Full Width */}
        <div className="flex space-x-6 animate-scroll py-8 pl-4 sm:pl-8 lg:pl-12">
          {/* Duplicate testimonials for infinite scroll effect */}
          {[...testimonials, ...testimonials, ...testimonials].map(
            (testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-80 sm:w-96 group"
              >
                {/* White/Gray Glassmorphism Card */}
                <div className="relative h-full transform transition-all duration-500 hover:scale-105 hover:rotate-1 rounded-2xl overflow-hidden group">
                  {/* Background image */}
                  <div className="absolute inset-0 bg-[url('/cardbg.jpg')] bg-no-repeat bg-cover bg-center"></div>

                  {/* White Glassmorphism Background */}
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-3xl border border-white/50 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500"></div>

                  {/* Subtle Inner Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/40 via-white/60 to-gray-100/40 rounded-2xl"></div>

                  {/* Glassmorphism Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border border-gray-200 group-hover:border-gray-300/50 transition-all duration-500"></div>

                  {/* Content */}
                  <div className="relative p-6 sm:p-8">
                    {/* Avatar and Author Info */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center text-2xl mr-4 border border-gray-200/50 shadow-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-gray-800">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-gray-500">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                      <q>{testimonial.content}</q>
                    </blockquote>

                    {/* Rating */}
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-[#FFB800] fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
