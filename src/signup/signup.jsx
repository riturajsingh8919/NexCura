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
import { signUp } from "@/components/cognitoServices";
import { Loader2, Mail, Lock, CheckCircle, Eye, EyeOff } from "lucide-react";
import LayoutWrapper from "@/components/LayoutWrapper";

const Signup = () => {
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
    if (!values.password) {
      errors.password = "Please enter a password";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(values.password)
    ) {
      errors.password =
        "Minimum 8 characters with at least one numeric, one uppercase, and one special character.";
    }
    if (!values.terms) {
      errors.terms = "Please agree to terms and conditions.";
    }
    return errors;
  };

  const mapCognitoError = (error) => {
    if (error.code) {
      switch (error.code) {
        case "UsernameExistsException":
          return "This email is already registered. Please try another.";
        default:
          return error.message;
      }
    }
    return "Something went wrong. Please try again.";
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await signUp(values.email, values.password);
      if (typeof window !== "undefined") {
        localStorage.setItem("isSignedUp", "true");
        localStorage.setItem("userEmail", values.email);
      }
      router.push(`/verification?email=${encodeURIComponent(values.email)}`);
    } catch (error) {
      setCognitoError(mapCognitoError(error));
      console.error("Signup error:", error);
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
              Create an Account
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                            type="text"  
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

                  {/* Password */}
             {/* Password */}
<Field name="password">
  {({ input, meta }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="flex flex-col gap-1">
        <Label htmlFor="password">Password*</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            {...input}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="pl-10 pr-10 h-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {meta.touched && meta.error && (
          <span className="text-sm text-red-500">{meta.error}</span>
        )}
      </div>
    );
  }}
</Field>


                  {/* Terms */}
                {/* Terms */}
<Field name="terms" type="checkbox">
  {({ input, meta }) => (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-2">
        <input
          {...input}
          id="terms"
          type="checkbox"
          className=" h-4 w-4 border-gray-300 rounded text-cyan-600 focus:ring-cyan-500"
        />
        <Label htmlFor="terms" className="text-sm text-gray-700">
          I agree to the{" "}
          <a
            href="/terms-and-condition"
            className="text-cyan-600 hover:underline"
          >
            Terms and Conditions
          </a>
        </Label>
      </div>
      {meta.touched && meta.error && (
        <span className="text-sm text-red-500">{meta.error}</span>
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
                          Signing Up...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Sign Up
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {/* Already a user */}
                  <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a
                      href="/signin?flag=true"
                      className="text-cyan-600 font-medium hover:underline"
                    >
                      Sign in
                    </a>
                  </p>
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

export default Signup;
