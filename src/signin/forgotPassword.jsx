"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Field } from "react-final-form";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader2, Send } from "lucide-react";
import { forgotPassword } from "@/components/cognitoServices";
import LayoutWrapper from "@/components/LayoutWrapper";

const ForgotPassword = () => {
  const router = useRouter();
  const [cognitoError, setCognitoError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Please enter your email id";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Please enter a valid email id";
    }
    return errors;
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await forgotPassword(values.email);
      router.push(`/updatePassword?email=${encodeURIComponent(values.email)}`);
    } catch (error) {
      setCognitoError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
      <LayoutWrapper>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-200 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-gray-900">
              Forgot Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-gray-600 mb-6">
              Enter your email to receive a verification code
            </p>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <Field name="email">
                    {({ input, meta }) => (
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="email">Email Address*</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <Input
                            {...input}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 h-12"
                          />
                        </div>
                        {meta.touched && meta.error && (
                          <span className="text-sm text-red-500">
                            {meta.error}
                          </span>
                        )}
                      </div>
                    )}
                  </Field>

                  {/* Error */}
                  {cognitoError && (
                    <div className="text-center text-sm text-red-500">
                      {cognitoError}
                    </div>
                  )}

                  {/* Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-semibold shadow-lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Code
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              )}
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
    </LayoutWrapper>
  );
};

export default ForgotPassword;
