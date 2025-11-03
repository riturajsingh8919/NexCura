"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const FAQSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 py-20 relative overflow-hidden">

          <div className="container px-4 relative z-10">
     <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 relative"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="relative">Frequently</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-gray-800">
              Asked Questions
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Why NexCura App?
                </h3>
                <p className="text-gray-600">
                  NexCura App leverages advanced AI technology to provide
                  personalized healthcare insights, making health management
                  more intuitive, efficient, and tailored to individual needs.
                  It's not just an app; it's a comprehensive health companion.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How does NexCura ensure the privacy and security of my health
                  data?
                </h3>
                <p className="text-gray-600">
                  We prioritize your privacy and security. NexCura uses
                  state-of-the-art encryption and complies with all relevant
                  data protection regulations to ensure that your personal
                  health information is kept secure and confidential.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can NexCura integrate with my existing health devices and
                  apps?
                </h3>
                <p className="text-gray-600">
                  Absolutely! NexCura is designed to seamlessly integrate with a
                  wide range of health devices and apps, allowing for a
                  centralized and comprehensive view of your health data.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Is NexCura suitable for managing chronic health conditions?
                </h3>
                <p className="text-gray-600">
                  Yes, NexCura is ideal for managing chronic health conditions.
                  It provides continuous monitoring, personalized
                  recommendations, and tracks your health trends to help manage
                  and mitigate chronic health issues effectively.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What makes NexCura different from other health apps?
                </h3>
                <p className="text-gray-600">
                  NexCura stands out due to its AI-driven personalized health
                  insights, comprehensive health dashboard, community support
                  features, and its ability to adapt and evolve with your health
                  journey, offering a unique and holistic health management
                  experience.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How can I get started with NexCura ?
                </h3>
                <p className="text-gray-600">
                  Getting started with NexCura is easy. Simply download the app,
                  create an account, and begin your personalized health journey.
                  You can also sign up for our free trial to explore NexCura ’s
                  features before committing to a subscription.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
        </div>
        </div>
  );
};

export default FAQSection;
