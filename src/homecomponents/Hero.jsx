"use client";

import { CirclePlay, X } from "lucide-react";
import React, { useState } from "react";
import HeroBottomBar from "./HeroBottomBar";

function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };
  return (
    <section className="relative w-full h-full overflow-hidden bg-[#351e55] pt-[64px] text-white">
      <video
        src="/hero1.mp4"
        className="absolute top-0 left-[20%] md:left-[28%] w-full h-[60%] md:h-full object-cover opacity-40 lg:opacity-100"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Gradient overlay */}
      <div
        className="absolute top-0 left-[20%] md:left-[28%] w-full h-[60%] md:h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(90.01deg, #351E55 0.03%, rgba(53, 30, 85, 0) 50.06%), linear-gradient(180deg, rgba(53, 30, 85, 0) 50.04%, #351E55 100%)",
        }}
      ></div>
      {/* Content */}
      <div className="container relative z-10 flex flex-col justify-between">
        <div className="relative">
          <div className="md:max-w-[60%] lg:max-w-[40%] pt-10 lg:pt-16">
            <h1 className="text-white text-3xl md:text-6xl 2xl:text-7xl">
              Empowering Health Through AI Innovation
            </h1>
            <h2 className="text-white mt-4 text-sm lg:text-xl">
              Accurate, secure, and personalized health solutions powered by AI
              to help you live better. Your health, your data, your control, and
              together, we shape a healthier future.
            </h2>
            {/* <div className="flex mt-8">
              <button
                className="flex items-center justify-center gap-2 bg-primary text-base py-2 px-6 text-white hover:bg-secondary cursor-pointer transition-all duration-300"
                onClick={openVideoModal}
              >
                <span>Watch Video</span>
                <CirclePlay />
              </button>
            </div> */}
          </div>
        </div>
        <HeroBottomBar />
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="relative w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 cursor-pointer right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Container */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                controls
                autoPlay
                muted
                playsInline
              >
                <source src="/hero1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={closeVideoModal}
          ></div>
        </div>
      )}
    </section>
  );
}

export default Hero;
