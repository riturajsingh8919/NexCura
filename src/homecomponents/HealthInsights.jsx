import {
  HeartPlus,
  HeartPlusIcon,
  HeartPlusIconIconHeartPlusIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";

function HealthInsights() {
  return (
    <section className="bg-white overflow-hidden">
      {/* Mobile Layout - Stacked Sections */}
      <div className="lg:hidden">
        {/* Mobile Background Section with Chat Interface */}
        <div className="relative py-16 min-h-[500px]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/personalized-insights.webp"
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
              src="/insight.png"
              alt="Patient Communication Interface"
              width={600}
              height={400}
              className="w-auto h-[30%] object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Mobile Content Section */}
        <div className="bg-white py-16 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Small Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-gray-100 rounded-lg">
                <HeartPlusIcon className="h-4 w-4 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">
                Health Insights Made for You
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-none">
              Personalised Insights
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Receive actionable, meaningful health insights tailored
              specifically to your unique needs. GenAI Healthcare uses advanced
              AI algorithms to interpret your data and give you guidance that’s
              both easy to understand and practical to follow.
            </p>

            {/* Feature List */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 leading-relaxed">
                  AI driven health analysis and trends
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 leading-relaxed">
                  Customized reports for your lifestyle and goals
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 leading-relaxed">
                  Early detection alerts for potential risks
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 leading-relaxed">
                  Easy to read recommendations for better health
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
        <div className="absolute right-0 top-0 bottom-0 w-[45vw] z-0">
          <div className="relative w-full h-full">
            <Image
              src="/personalized-insights.webp"
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
            <div className="pl-8">
              {/* Small Badge */}
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <HeartPlusIcon className="h-4 w-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Health Insights Made for You
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-none">
                Personalised Insights
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Receive actionable, meaningful health insights tailored
                specifically to your unique needs. GenAI Healthcare uses
                advanced AI algorithms to interpret your data and give you
                guidance that’s both easy to understand and practical to follow.
              </p>

              {/* Feature List */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 leading-relaxed">
                    AI driven health analysis and trends
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 leading-relaxed">
                    Customized reports for your lifestyle and goals
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 leading-relaxed">
                    Early detection alerts for potential risks
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 leading-relaxed">
                    Easy to read recommendations for better health
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
            {/* Right Content */}

            <div className="relative pl-8">
              {/* Chat Interface Image */}
              <div className="relative">
                <Image
                  src="/insight.png"
                  alt="Patient Communication Interface"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HealthInsights;
