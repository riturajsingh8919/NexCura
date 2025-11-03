import Link from "next/link";
import React from "react";

function HomeAbout() {
  return (
    <section className="relative bg-white py-18 overflow-hidden lg:bg-[url('/about-bg.webp')] bg-no-repeat bg-top bg-cover">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              <span className="block">Redefining Personal</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-gray-800">
                Health with AI
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-12 max-w-2xl">
              At GenAI Healthcare, we're transforming healthcare with advanced
              AI technology. NexCura makes health management proactive,
              personalized, and accessible. By analyzing your unique health
              data, we provide tailored insights to help you achieve optimal
              wellness. Empower your health journey with technology that
              understands you.
            </p>

            {/* CTA Button */}
            <Link href="/#nexcura">
              <button className="group inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-secondary text-white font-semibold cursor-pointer shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <span>Learn More About NexCura</span>
                <div className="w-5 h-5 ml-2 transform group-hover:scale-110 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeAbout;
