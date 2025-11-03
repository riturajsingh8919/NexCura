import React from "react";
import Image from "next/image";

const Collaborate = () => {
  const careFeatures = [
    {
      id: 1,
      title: "Sensors And Wearables",
      description:
        "Instantly see how your food and activity impact your metabolism.",
      bgColor: "bg-gradient-to-br from-pink-100 to-purple-100",
      borderColor: "border-pink-200",
      imageSrc: "/censores.jpg",
      imageAlt:
        "Black smartwatch and fitness tracking devices on white background",
    },
    {
      id: 2,
      title: "Clinical Care Team",
      description:
        "Get support from your personal team of providers and coaches.",
      bgColor: "bg-gradient-to-br from-green-100 to-emerald-100",
      borderColor: "border-green-200",
      imageSrc: "/care-team.webp",
      imageAlt:
        "Smiling female healthcare professional in white coat with stethoscope",
    },
    {
      id: 3,
      title: "Insights And Tracking",
      description:
        "See your progress, understand your body, and stay on track.",
      bgColor: "bg-gradient-to-br from-blue-100 to-cyan-100",
      borderColor: "border-blue-200",
      imageSrc: "/tracking.webp",
      imageAlt:
        "Hands holding smartphone displaying health app interface with charts and data",
    },
  ];

  return (
    <section className="py-16 md:px-10 bg-white">
      <div className="container">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Personalized care is at{" "}
            <span className="text-gray-700">the heart of</span>{" "}
            <span className="text-gray-600">everything we do</span>
          </h1>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:max-w-[80%] mx-auto">
          {careFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`
                ${feature.bgColor} 
                ${feature.borderColor}
                rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-xl hover:scale-105
                flex flex-col justify-between
                animate-fade-in-up
              `}
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: "both",
              }}
            >
              {/* Content Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-700">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Image Section */}
              <div className="mt-8 flex justify-center">
                <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={feature.imageSrc}
                    alt={feature.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0} // Prioritize loading the first image
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collaborate;
