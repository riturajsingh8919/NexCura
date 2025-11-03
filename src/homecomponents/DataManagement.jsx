import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import React from "react";

function DataManagement() {
  return (
    <section className="bg-white overflow-hidden">
      {/* Mobile Layout - Stacked Sections */}
      <div className="lg:hidden">
        {/* Mobile Background Section with Chat Interface */}
        <div className="relative py-16 min-h-[500px]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/securedata.webp"
              alt="Data Management Background"
              fill
              className="object-cover"
            />
            {/* Purple Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/60 via-purple-500/70 to-purple-600/60"></div>
          </div>

          {/* Chat Interface Image */}
          <div className="relative z-10 px-4 flex items-center justify-center h-full">
            <Image
              src="/data-m.png"
              alt="Patient Communication Interface"
              width={600}
              height={400}
              className="w-auto h-[40%] object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Mobile Content Section */}
        <div className="bg-white py-16 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Small Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-gray-100 rounded-lg">
                <ShieldCheck className="h-4 w-4 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">
                Your Privacy, Our Promise
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-none">
              Secure Data Management
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Three stage encryption ensures your health information is
              protected at all times, while still being easily accessible
              whenever and wherever you need it. At GenAI Healthcare, your
              privacy is our top priority, and we follow the highest security
              standards to keep your trust.
            </p>

            {/* Feature List */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 leading-relaxed">
                  HIPAA compliant data storage and handling
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 leading-relaxed">
                  End to end encryption for all records
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 leading-relaxed">
                  Secure cloud access from any device
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 leading-relaxed">
                  Regular security audits and updates
                </span>
              </li>
            </ul>

            {/* Learn More Button */}
            <div>
              <button className="inline-flex items-center px-6 py-3 bg-secondary hover:bg-primary cursor-pointer text-white font-medium transition-colors duration-200">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Side by Side */}
      <div className="hidden lg:block relative py-24">
        {/* Background Image - Left Side */}
        <div className="absolute left-0 top-0 bottom-0 w-[45vw] z-0">
          <div className="relative w-full h-full">
            <Image
              src="/securedata.webp"
              alt="Data Management Background"
              fill
              className="object-cover"
            />
            {/* Purple Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/60 via-purple-500/70 to-purple-600/60"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 gap-12 xl:gap-16 items-center">
            {/* Left Content - Image Overlay */}
            <div className="relative pl-8">
              {/* Chat Interface Image */}
              <div className="relative">
                <Image
                  src="/data-m.png"
                  alt="Patient Communication Interface"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="pl-8">
              {/* Small Badge */}
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <ShieldCheck className="h-4 w-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Your Privacy, Our Promise
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-none">
                Secure Data Management
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Three stage encryption ensures your health information is
                protected at all times, while still being easily accessible
                whenever and wherever you need it. At GenAI Healthcare, your
                privacy is our top priority, and we follow the highest security
                standards to keep your trust.
              </p>

              {/* Feature List */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 leading-relaxed">
                    HIPAA compliant data storage and handling
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 leading-relaxed">
                    End to end encryption for all records
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 leading-relaxed">
                    Secure cloud access from any device
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 leading-relaxed">
                    Regular security audits and updates
                  </span>
                </li>
              </ul>

              {/* Learn More Button */}
              <div>
                <button className="inline-flex items-center px-6 py-3 bg-secondary hover:bg-primary cursor-pointer text-white font-medium transition-colors duration-200">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataManagement;
