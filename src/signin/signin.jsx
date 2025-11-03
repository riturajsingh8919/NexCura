"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import Link from "next/link";
import { motion } from "framer-motion";
import { login, clearError } from "../redux/features/auth/authSlice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import LayoutWrapper from "@/components/LayoutWrapper";

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectToHomePages = searchParams.get("flag");
  const redirect = searchParams?.get("redirect") || "/";
  const showSignup = redirect === "/cart";
  const dispatch = useDispatch();
  const { loading, error, isLoggedIn } = useSelector((state) => state.auth);
  const [loginError, setLoginError] = useState("");



  useEffect(() => {
    setLoginError("");
    dispatch(clearError());
  }, [dispatch]);


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
    }
    return errors;
  };

  const onSubmit = async (values) => {
    try {
      await dispatch(login(values)).unwrap();
      if (typeof window !== "undefined") {
        localStorage.setItem("isSignedIn", "true");
        localStorage.setItem("userEmail", values.email);
        router.replace(redirect);
      }
    } catch (error) {
      setLoginError(error || "Login failed");
    }
  };


  return (
    <LayoutWrapper>
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-200 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-2xl rounded-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome Back
            </CardTitle>
            <p className="text-gray-600 text-sm">
              Sign in to continue to GenAI Healthcare
            </p>
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
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-700"
                        >
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            {...input}
                            id="email"
                            placeholder="Enter your email"
                            type="text"
                            className="pl-10 h-12 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
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
                          <Label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-700"
                          >
                            Password
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              {...input}
                              id="password"
                              placeholder="Enter your password"
                              type={showPassword ? "text" : "password"}
                              className="pl-10 pr-10 h-12 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                          {meta.touched && meta.error && (
                            <span className="text-sm text-red-500">{meta.error}</span>
                          )}
                          <div className="text-right">
                            <Link
                              href="/forgotPassword"
                              className="text-sm text-purple-600 hover:underline"
                            >
                              Forgot password?
                            </Link>
                          </div>
                        </div>
                      );
                    }}
                  </Field>


                  {/* Error */}
                  {(loginError || error) && (
                    <p className="text-red-500 text-sm font-medium text-center">
                      {loginError || error}
                    </p>
                  )}

                  {/* Submit */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />{" "}
                          Signing in...
                        </>
                      ) : (
                        <>
                          <LogIn className="w-5 h-5 mr-2" /> Sign In
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {/* Sign up */}
                  {showSignup && (
                    <p className="text-sm text-gray-600 text-center">
                      New user?{" "}
                      <Link
                        href="/signup"
                        className="text-purple-600 font-medium hover:underline"
                      >
                        Sign up
                      </Link>
                    </p>
                  )}

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

export default SignIn;
