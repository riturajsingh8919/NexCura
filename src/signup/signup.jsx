"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Field } from "react-final-form";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/components/cognitoServices";
import { createUser } from "./signupServices";
import {
  Loader2,
  Mail,
  Lock,
  CheckCircle,
  Eye,
  EyeOff,
  User,
  Users,
  Plus,
  Trash2,
} from "lucide-react";
import LayoutWrapper from "@/components/LayoutWrapper";

const Signup = () => {
  const router = useRouter();
  const [cognitoError, setCognitoError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dependants, setDependants] = useState([]);

  const addDependant = () => {
    if (dependants.length < 2) {
      setDependants((prev) => [...prev, { email: "" }]);
    }
  };

  const removeDependant = (index) => {
    setDependants((prev) => prev.filter((_, i) => i !== index));
  };

  const updateDependant = (index, value) => {
    setDependants((prev) =>
      prev.map((dep, i) => (i === index ? { ...dep, email: value } : dep))
    );
  };

  const validate = (values) => {
    const errors = {};

    if (!values.role) {
      errors.role = "Please select a role";
    }

    if (!values.email) {
      errors.email = "Please enter your email id";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Please enter a valid email id";
    }

    if (!values.password) {
      errors.password = "Please enter a password";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(values.password)) {
      errors.password =
        "Minimum 8 characters with at least one numeric, one uppercase, and one special character.";
    }

    if (!values.terms) {
      errors.terms = "Please agree to terms and conditions.";
    }

    // Validate dependant emails if caregiver
    if (values.role === "Caregiver" && dependants.length > 0) {
      dependants.forEach((dep, index) => {
        if (dep.email.trim() && !/\S+@\S+\.\S+/.test(dep.email)) {
          errors[`dependant_${index}`] = `Dependant ${
            index + 1
          }: Invalid email format`;
        }
      });
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
    console.log("🔄 Signup form submitted for:", values.email);
    setLoading(true);
    setCognitoError("");

    try {
      // Step 1: Create AWS Cognito account
      console.log("🔄 Creating Cognito account for:", values.email);
      const signupResult = await signUp(values.email, values.password);
      console.log("✅ Cognito signup completed:", signupResult);

      // Step 2: Create user in backend
      console.log("🔄 Creating user in backend...");
      const userPayload = {
        userEmail: values.email,
        role: values.role,
      };

      const userStatus = await createUser(userPayload);

      if (userStatus === 200) {
        console.log("✅ User created successfully in backend");

        // Step 3: Create dependants if any
        if (values.role === "Caregiver" && dependants.length > 0) {
          console.log("🔄 Creating dependants...");
          for (const dependant of dependants) {
            if (dependant.email.trim()) {
              const dependantPayload = {
                userEmail: dependant.email,
                role: "Dependant",
                caregiverEmail: values.email,
              };

              const dependantStatus = await createUser(dependantPayload);
              if (dependantStatus === 200) {
                console.log("✅ Dependant created:", dependant.email);
              } else {
                console.log("⚠️ Failed to create dependant:", dependant.email);
              }
            }
          }
        }

        // Step 4: Store success info and redirect
        if (typeof window !== "undefined") {
          localStorage.setItem("isSignedUp", "true");
          localStorage.setItem("userEmail", values.email);
        }

        console.log("🔄 Redirecting to verification page...");
        router.push(`/verification?email=${encodeURIComponent(values.email)}`);
      } else {
        throw new Error("Failed to create user in backend");
      }
    } catch (error) {
      console.error("❌ Signup error:", error);
      setCognitoError(mapCognitoError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutWrapper>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fbf5ea] via-white to-[#fbf5ea] px-4 py-16">
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
                render={({ handleSubmit, values }) => (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Role Selection */}
                    <Field name="role">
                      {({ input, meta }) => (
                        <div className="flex flex-col gap-3">
                          <Label className="text-base font-semibold">
                            Select Your Role*
                          </Label>
                          <div className="grid grid-cols-1 gap-3">
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                values.role === "Individual"
                                  ? "border-[#5646a3] bg-[#5646a3]/5"
                                  : "border-gray-200 hover:border-[#5646a3]/50"
                              }`}
                              onClick={() => input.onChange("Individual")}
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`p-2 rounded-full ${
                                    values.role === "Individual"
                                      ? "bg-[#5646a3] text-white"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  <User className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-base font-semibold text-gray-900">
                                    Individual
                                  </h3>
                                  <p className="text-gray-600 text-sm">
                                    Managing your own health data
                                  </p>
                                </div>
                                <input
                                  type="radio"
                                  {...input}
                                  value="Individual"
                                  className="w-4 h-4 text-[#5646a3] focus:ring-[#5646a3]"
                                />
                              </div>
                            </motion.div>

                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                values.role === "Caregiver"
                                  ? "border-[#5646a3] bg-[#5646a3]/5"
                                  : "border-gray-200 hover:border-[#5646a3]/50"
                              }`}
                              onClick={() => input.onChange("Caregiver")}
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`p-2 rounded-full ${
                                    values.role === "Caregiver"
                                      ? "bg-[#5646a3] text-white"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  <Users className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-base font-semibold text-gray-900">
                                    Caregiver
                                  </h3>
                                  <p className="text-gray-600 text-sm">
                                    Managing family members' health data
                                  </p>
                                </div>
                                <input
                                  type="radio"
                                  {...input}
                                  value="Caregiver"
                                  className="w-4 h-4 text-[#5646a3] focus:ring-[#5646a3]"
                                />
                              </div>
                            </motion.div>
                          </div>
                          {meta.touched && meta.error && (
                            <span className="text-sm text-red-500">
                              {meta.error}
                            </span>
                          )}
                        </div>
                      )}
                    </Field>

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
                              <span className="text-sm text-red-500">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        );
                      }}
                    </Field>

                    {/* Dependants Section - Only show for Caregivers */}
                    {values.role === "Caregiver" && (
                      <div className="space-y-4 border-t pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base font-semibold">
                              Dependants (Optional)
                            </Label>
                            <p className="text-sm text-gray-600">
                              Add family members you'll manage (up to 2)
                            </p>
                          </div>
                        </div>

                        {dependants.map((dependant, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex gap-3 items-center"
                          >
                            <div className="flex-1">
                              <Label htmlFor={`dependant-${index}`}>
                                Dependant {index + 1} Email
                              </Label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <Input
                                  id={`dependant-${index}`}
                                  type="email"
                                  placeholder="Enter dependant email"
                                  value={dependant.email}
                                  onChange={(e) =>
                                    updateDependant(index, e.target.value)
                                  }
                                  className="pl-10 h-12"
                                />
                              </div>
                            </div>
                            <Button
                              type="button"
                              onClick={() => removeDependant(index)}
                              variant="outline"
                              size="sm"
                              className="mt-6 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        ))}

                        {dependants.length < 2 && (
                          <Button
                            type="button"
                            onClick={addDependant}
                            variant="outline"
                            className="w-full h-12 border-dashed border-[#5646a3] text-[#5646a3] hover:bg-[#5646a3]/5"
                          >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Dependant
                          </Button>
                        )}
                      </div>
                    )}

                    {/* Terms */}
                    <Field name="terms" type="checkbox">
                      {({ input, meta }) => (
                        <div className="flex flex-col gap-1">
                          <div className="flex items-start gap-2">
                            <input
                              {...input}
                              id="terms"
                              type="checkbox"
                              className="h-4 w-4 border-gray-300 rounded text-[#5646a3] focus:ring-[#5646a3]"
                            />
                            <Label
                              htmlFor="terms"
                              className="text-sm text-gray-700"
                            >
                              I agree to the{" "}
                              <a
                                href="/terms-and-condition"
                                className="text-[#5646a3] hover:underline"
                              >
                                Terms and Conditions
                              </a>
                            </Label>
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
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-[#5646a3] hover:bg-[#5646a3]/90 text-white font-semibold shadow-lg"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Create Account
                          </>
                        )}
                      </Button>
                    </motion.div>

                    {/* Already a user */}
                    <p className="text-center text-sm text-gray-600">
                      Already have an account?{" "}
                      <a
                        href="/signin?flag=true"
                        className="text-[#5646a3] font-medium hover:underline"
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
