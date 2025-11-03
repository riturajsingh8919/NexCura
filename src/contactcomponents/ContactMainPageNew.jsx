"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import ReCAPTCHA from "react-google-recaptcha";
import {
  MessageSquare,
  Calendar as CalendarIcon,
  Mail,
  CheckCircle,
  Clock,
  Phone,
  MapPin,
  Send,
  Loader2,
  Users,
  Heart,
  Shield,
  Star,
  Globe,
  Zap,
} from "lucide-react";

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState("message");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
    honeypot: "", // Hidden field for bot detection
  });
  const recaptchaRef = useRef(null);
  const [formStartTime] = useState(Date.now()); // Track when form was loaded

  // Available time slots
  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Clear any previous errors
    setError("");

    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      setIsSubmitting(false);
      return; // Silent fail for bots
    }

    // Time check - form filled too quickly (less than 3 seconds)
    const timeSpent = (Date.now() - formStartTime) / 1000;
    if (timeSpent < 3) {
      setError("Please take your time to fill the form.");
      setIsSubmitting(false);
      return;
    }

    // Verify reCAPTCHA
    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA verification.");
      setIsSubmitting(false);
      return;
    }

    // Validate appointment-specific fields
    if (activeTab === "appointment") {
      if (!selectedDate) {
        setError("Please select an appointment date.");
        setIsSubmitting(false);
        return;
      }
      if (!selectedTime) {
        setError("Please select an appointment time.");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const { honeypot, ...cleanFormData } = formData; // Remove honeypot before sending
      
      const submitData = {
        ...cleanFormData,
        type: activeTab,
        appointmentDate: selectedDate
          ? selectedDate.toLocaleDateString()
          : null,
        appointmentTime: selectedTime,
        recaptchaToken, // Include reCAPTCHA token
        timestamp: Date.now(), // Add timestamp for server-side validation
      };

      const response = await fetch('/api/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: submitData,
          emailType: "contact"
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: "", email: "", message: "", company: "" });
        setSelectedDate(null);
        setSelectedTime("");
        recaptchaRef.current?.reset(); // Reset reCAPTCHA
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        recaptchaRef.current?.reset(); // Reset reCAPTCHA on error
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error("Submit error:", error);
      recaptchaRef.current?.reset(); // Reset reCAPTCHA on error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
      company: "",
    });
    setSelectedDate(null);
    setSelectedTime("");
    setShowSuccess(false);
    recaptchaRef.current?.reset(); // Reset reCAPTCHA
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-cyan-500/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-2xl" />

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl border border-gray-200"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out. We'll get back to you within 24
                hours with personalized healthcare solutions.
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={resetForm} variant="outline">
                  Send Another
                </Button>
                <Button
                  onClick={() => setShowSuccess(false)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container px-4 relative z-10">
        {/* Quick Contact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 xl:max-w-[70%] mx-auto"
        >
          <Card className="bg-white/70 backdrop-blur-sm border border-cyan-200/50 hover:border-cyan-300 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                &lt; 24hrs
              </h3>
              <p className="text-gray-600">Response Time</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-blue-200/50 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">10K+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border border-purple-200/50 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">99.9%</h3>
              <p className="text-gray-600">Data Security</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Methods Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Multiple Ways to Connect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="text-center p-6 rounded-2xl  border border-cyan-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Send a Message
              </h3>
              <p className="text-gray-600">
                Share your healthcare needs and get personalized solutions from
                our expert team.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="text-center p-6 rounded-2xl border border-purple-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Book a Demo
              </h3>
              <p className="text-gray-600">
                Schedule a personalized demo to see how Nexcura can transform
                your healthcare operations.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card className="h-full bg-gradient-to-br from-white/80 to-cyan-50/80 backdrop-blur-sm border border-cyan-200/50 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-colors"
                  >
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-full shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        Email
                      </h3>
                      <p className="text-gray-600">contact.us@genaihealth.care</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-colors"
                  >
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-full shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        Business Hours
                      </h3>
                      <p className="text-gray-600">
                        Mon - Fri: 9:00 AM - 6:00 PM
                        <br />
                        Sat: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </motion.div>

                  {/* Stats Section */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-200/30">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Why Choose Nexcura?
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-600">
                          10,000+ Patients Served
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">
                          99.9% Data Security
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">
                          24/7 AI Assistance
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-600">
                          Global Healthcare Network
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-600">
                          Instant Health Insights
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-2xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Send className="w-4 h-4 text-white" />
                    </div>
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="h-full grid grid-cols-2 mb-8 bg-gradient-to-r from-gray-100 to-gray-50 p-2 rounded-2xl shadow-lg border">
                      <TabsTrigger
                        value="message"
                        className="flex items-center space-x-3 py-4 px-6 rounded-xl text-base font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 hover:bg-white/70 cursor-pointer"
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-sm md:text-base">
                          Send Message
                        </span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="appointment"
                        className="flex items-center space-x-3 py-4 px-6 rounded-xl text-base font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 hover:bg-white/70 cursor-pointer"
                      >
                        <CalendarIcon className="w-5 h-5" />
                        <span className="text-sm md:text-base">Book Demo</span>
                      </TabsTrigger>
                    </TabsList>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Error Message */}
                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                          {error}
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1">
                          <Label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-700"
                          >
                            Full Name*
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="h-12 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                            autoComplete="off"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <Label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700"
                          >
                            Email Address*
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="h-12 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                            autoComplete="off"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <Label
                          htmlFor="company"
                          className="text-sm font-medium text-gray-700"
                        >
                          Company/Organization
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Enter your company name"
                          className="h-12 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                          autoComplete="off"
                        />
                      </div>

                      <TabsContent value="message" className="space-y-4">
                        <div className="flex flex-col gap-1">
                          <Label
                            htmlFor="message"
                            className="text-sm font-medium text-gray-700"
                          >
                            Message*
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell us about your healthcare needs, challenges, or how we can help transform your healthcare experience..."
                            rows={6}
                            className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 resize-none"
                            required
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="appointment" className="space-y-6">
                        <div className="flex flex-col gap-1">
                          <Label
                            htmlFor="message"
                            className="text-sm font-medium text-gray-700"
                          >
                            Purpose of Appointment*
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Please describe the purpose of your appointment, areas of interest, or specific healthcare solutions you'd like to discuss..."
                            rows={4}
                            className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 resize-none"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-sm font-medium text-gray-700">
                              Select Date*
                            </Label>
                            <Input
                              type="date"
                              value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                              onChange={(e) => {
                                const date = e.target.value ? new Date(e.target.value) : null;
                                setSelectedDate(date);
                                setError(""); // Clear error when date is selected
                              }}
                              min={new Date().toISOString().split('T')[0]}
                              className="h-12 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                              required
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium text-gray-700">
                              Select Time*
                            </Label>
                            <div className="grid grid-cols-2 gap-2">
                              {timeSlots.map((time) => (
                                <motion.button
                                  key={time}
                                  type="button"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => {
                                    setSelectedTime(time);
                                    setError(""); // Clear error when time is selected
                                  }}
                                  className={`p-3 text-sm rounded-lg border transition-all duration-200 ${
                                    selectedTime === time
                                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-500 shadow-lg"
                                      : "bg-white text-gray-700 border-gray-300 hover:border-cyan-300 hover:bg-cyan-50"
                                  }`}
                                >
                                  {time}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      {/* Honeypot field - hidden from users, visible to bots */}
                      <div style={{ position: 'absolute', left: '-9999px' }}>
                        <input
                          type="text"
                          name="honeypot"
                          value={formData.honeypot}
                          onChange={handleInputChange}
                          tabIndex="-1"
                          autoComplete="off"
                        />
                      </div>

                      {/* reCAPTCHA */}
                      <div className="flex justify-center">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "YOUR_RECAPTCHA_SITE_KEY"}
                          theme="light"
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-14 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                          size="lg"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              {activeTab === "message"
                                ? "Send Message"
                                : "Book Demo"}
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        {/* <motion.div
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
        </motion.div> */}
      </div>
    </div>
  );
};

export default ContactPage;
