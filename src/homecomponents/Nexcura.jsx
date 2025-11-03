import React from "react";
import { ArrowRight, Heart, Shield, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Nexcura() {
  return (
    <section
      className="relative bg-gradient-to-br from-gray-100 via-white to-gray-50 py-16 overflow-hidden"
      id="nexcura"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle Background Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gray-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl"></div>

        {/* Floating Particles */}
        <div className="absolute top-32 left-1/4 w-3 h-3 bg-gray-300/40 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-1/3 w-2 h-2 bg-blue-200/50 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-1/3 w-4 h-4 bg-white/60 rounded-full animate-pulse"></div>
      </div>

      <div className="container relative z-10">
        {/* Main Glassmorphism Card */}
        <div className="relative">
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-gray-100/30 rounded-3xl"></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-full shadow-sm mb-6">
                  <Heart className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-gray-700 font-medium text-sm">
                    Our Product
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-6 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-gray-800 to-gray-900">
                    Nexcura:
                  </span>
                  <br />
                  <span className="text-gray-900">
                    Personalized Health at Your Fingertips
                  </span>
                </h2>

                {/* Description */}
                <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
                  At GenAI Healthcare, NexCura is your smart, adaptive health
                  companion. It anticipates your needs, delivering proactive
                  wellness solutions for better health every day. Transform your
                  health journey today with NexCura.
                </p>

                {/* Feature Icons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link
                    href={"/employers"}
                    className="relative z-0 rounded-xl overflow-hidden group"
                  >
                    <Image
                      src="/Employers.webp"
                      alt="Personal"
                      width={400}
                      height={480}
                      className="w-full h-full md:h-[300px] object-cover group-hover:scale-125 transition-transform duration-1000"
                    />
                    <h3 className="absolute text-xl bottom-6 md:bottom-3 left-6 text-white font-medium z-[2]">
                      Employers
                    </h3>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[1]"></div>
                  </Link>
                  <Link
                    href={"/caregivers"}
                    className="relative z-0 rounded-xl overflow-hidden group"
                  >
                    <Image
                      src="/Caregivers.webp"
                      alt="Smart AI"
                      width={400}
                      height={480}
                      className="w-full h-full md:h-[300px] object-cover group-hover:scale-125 transition-transform duration-1000"
                    />
                    <h3 className="absolute text-xl bottom-6 md:bottom-3 left-6 text-white font-medium z-[2]">
                      Caregivers
                    </h3>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[1]"></div>
                  </Link>

                  <Link
                    href={"/Individuals"}
                    className="relative z-0 rounded-xl overflow-hidden group"
                  >
                    <Image
                      src="/Individuals.webp"
                      alt="Secure"
                      width={400}
                      height={480}
                      className="w-full h-full md:h-[300px] object-cover group-hover:scale-125 transition-transform duration-1000"
                    />
                    <h3 className="absolute text-xl bottom-6 md:bottom-3 left-6 text-white font-medium z-[2]">
                      Individuals
                    </h3>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[1]"></div>
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative">
                {/* Image Container with Glass Effect */}
                <div className="relative">
                  {/* Glass Border */}
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm border border-white/40 rounded-3xl shadow-xl transform rotate-3"></div>

                  {/* Main Image Container */}
                  <div className="relative bg-white/40 backdrop-blur-sm border border-white/50 rounded-3xl p-4 shadow-2xl">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src="/product.png"
                        alt="NexCura Product Interface"
                        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                      />

                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl"></div>
                    </div>
                  </div>

                  {/* Floating Elements around Image */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg animate-bounce"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg animate-pulse"></div>
                  <div className="absolute top-1/2 -left-6 w-4 h-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Nexcura;
