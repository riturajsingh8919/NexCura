"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
// Try to import Redux hooks if available
let useSelector, useDispatch;
try {
  const redux = require("react-redux");
  useSelector = redux.useSelector;
  useDispatch = redux.useDispatch;
} catch (e) {
  console.log("Redux not available:", e.message);
}
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  signUp,
  confirmSignUp,
  resendConfirmationCode,
  setNewPassword,
} from "@/components/cognitoServices";
import { createUser, getUserDetails } from "./signupServices";
import {
  Loader2,
  Mail,
  User,
  Eye,
  EyeOff,
  Plus,
  CheckCircle,
} from "lucide-react";
import LayoutWrapper from "@/components/LayoutWrapper";

// Temporary password used during Cognito signup (will be changed after email confirmation)
const TEMP_SIGNUP_PASSWORD = "TempPassword123!";

// Screen 1: Signup Form (Dynamic based on role)
const SignupScreen = ({
  formData,
  updateFormData,
  handleRoleChange,
  updateDependent,
  addDependent,
  removeDependent,
  handleSignup,
  loading,
  error,
}) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Create an account
      </h2>
    </div>

    {/* Role Toggle */}
    <div>
      <Label className="text-gray-700 mb-3 block">Account Create For</Label>
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          type="button"
          onClick={() => handleRoleChange("Self")}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
            formData.role === "Self"
              ? "bg-purple-600 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Self
        </button>
        <button
          type="button"
          onClick={() => handleRoleChange("Caregiver")}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
            formData.role === "Caregiver"
              ? "bg-purple-600 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Caregiver
        </button>
      </div>
    </div>

    {/* User Name */}
    <div className="relative">
      <Input
        type="text"
        placeholder="User Name"
        value={formData.userName}
        onChange={(e) => updateFormData("userName", e.target.value)}
        className="h-14 pr-12 text-base border-gray-200"
      />
      <User className="absolute right-4 top-4 w-6 h-6 text-gray-400" />
    </div>

    {/* Email */}
    <div className="relative">
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => updateFormData("email", e.target.value)}
        className="h-14 pr-12 text-base border-gray-200"
      />
      <Mail className="absolute right-4 top-4 w-6 h-6 text-gray-400" />
    </div>

    {/* Dependent Details - Only show for Caregiver */}
    {formData.role === "Caregiver" && (
      <div>
        {formData.dependents.map((dependent, index) => (
          <div key={`dependent-${index}`} className="mb-6">
            <Label className="text-gray-700 mb-4 block font-semibold">
              {index === 0
                ? "Dependent Details"
                : `Dependent ${index + 1} Details`}
            </Label>
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Dependent Name"
                value={dependent.name}
                onChange={(e) => updateDependent(index, "name", e.target.value)}
                className="h-14 text-base border-gray-200"
              />
              <Input
                type="email"
                placeholder="Dependent Email"
                value={dependent.email}
                onChange={(e) =>
                  updateDependent(index, "email", e.target.value)
                }
                className="h-14 text-base border-gray-200"
              />
              {formData.dependents.length > 1 &&
                index === formData.dependents.length - 1 && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => removeDependent(index)}
                      className="text-purple-600 font-medium"
                    >
                      Remove Dependent
                    </button>
                  </div>
                )}
            </div>
          </div>
        ))}

        {/* Add Dependent Button */}
        {formData.dependents.length < 2 && (
          <button
            type="button"
            onClick={addDependent}
            className="flex items-center text-purple-600 font-medium mb-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Dependent
          </button>
        )}
      </div>
    )}

    {/* Terms */}
    <div className="flex items-start space-x-3">
      <div className="mt-1.5 w-3 h-3 border-2 border-purple-600 rounded flex items-center justify-center bg-white">
        <input
          type="checkbox"
          id="terms"
          className="w-3 h-3 text-purple-600 border-0 rounded focus:ring-0 focus:ring-offset-0"
          required
        />
      </div>
      <label htmlFor="terms" className="text-gray-700 leading-relaxed">
        By checking the box you agree to our{" "}
        <a href="/terms-and-condition" className="text-purple-600 underline">
          Terms
        </a>{" "}
        and{" "}
        <a href="/privacy-policy" className="text-purple-600 underline">
          Conditions
        </a>
      </label>
    </div>

    {/* Error */}
    {error && <div className="text-red-500 text-sm text-center">{error}</div>}

    {/* Sign Up Button */}
    <Button
      onClick={handleSignup}
      disabled={loading}
      className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-lg font-semibold shadow-lg"
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        "Sign up"
      )}
    </Button>

    {/* Already a user */}
    <div className="text-center">
      <span className="text-gray-600">Already a user? </span>
      <a href="/signin" className="text-purple-600 font-medium">
        Sign in
      </a>
    </div>
  </div>
);

// Screen 2: Email Verification
const EmailVerificationScreen = ({
  formData,
  updateVerificationCode,
  updateFormData,
  handleResendCode,
  handleCreateAccount,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  loading,
  error,
  infoMessage,
}) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Email Verification
      </h2>
      <p className="text-gray-600">
        Please enter the 6-digit code sent to your email
      </p>
    </div>

    {/* Verification Code Input */}
    <div className="flex justify-center space-x-2">
      {formData.verificationCode.map((digit, index) => (
        <input
          key={index}
          id={`code-${index}`}
          type="text"
          value={digit}
          onChange={(e) => updateVerificationCode(index, e.target.value)}
          className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none bg-white"
          maxLength={1}
        />
      ))}
    </div>

    {/* Resend Code */}
    <div className="text-center">
      <span className="text-gray-600">Didn't receive any code? </span>
      <button
        type="button"
        onClick={handleResendCode}
        className="text-purple-600 font-medium"
      >
        Resend Code
      </button>
    </div>

    {/* Create Login Password */}
    <div>
      <Label className="text-gray-700 mb-4 block font-semibold">
        Create Login Password
      </Label>

      <div className="space-y-4">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password (8+ chars, uppercase, lowercase, number, special char)"
            value={formData.password}
            onChange={(e) => updateFormData("password", e.target.value.trim())}
            className="h-14 pr-12 text-base border-gray-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-gray-400"
          >
            {showPassword ? (
              <EyeOff className="w-6 h-6" />
            ) : (
              <Eye className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={(e) =>
              updateFormData("confirmPassword", e.target.value.trim())
            }
            className="h-14 pr-12 text-base border-gray-200"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-4 text-gray-400"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-6 h-6" />
            ) : (
              <Eye className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </div>

    {/* Info Message */}
    {infoMessage && (
      <div className="text-blue-600 text-sm text-center bg-blue-50 p-3 rounded-lg">
        {infoMessage}
      </div>
    )}

    {/* Error */}
    {error && <div className="text-red-500 text-sm text-center">{error}</div>}

    {/* Create Account Button */}
    <Button
      onClick={handleCreateAccount}
      disabled={loading}
      className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-lg font-semibold shadow-lg"
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Creating Account...
        </>
      ) : (
        "Create Account"
      )}
    </Button>
  </div>
);

// Screen 3: Success
const SuccessScreen = ({ router, infoMessage }) => (
  <div className="text-center space-y-8">
    {/* Success Icon */}
    <div className="flex justify-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
    </div>

    {/* Success Message */}
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Account Created Successfully!
      </h2>
      <p className="text-gray-600">
        Your account has been created and verified. You can now sign in.
      </p>
      {infoMessage && (
        <div className="mt-4 text-blue-600 text-sm bg-blue-50 p-3 rounded-lg">
          {infoMessage}
        </div>
      )}
    </div>

    {/* Continue Button */}
    <Button
      onClick={() => router.push("/signin")}
      className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-lg font-semibold shadow-lg"
    >
      Continue with Sign in
    </Button>
  </div>
);

const SimpleSignupFlow = () => {
  const router = useRouter();

  // Try to get Redux state if available
  let reduxState = null;
  let authState = null;
  try {
    if (useSelector) {
      reduxState = useSelector((state) => state);
      authState = useSelector((state) => state.auth);
      console.log("🏪 ========== REDUX STATE DETECTED ==========");
      console.log("🏪 Full Redux State:", reduxState);
      console.log("🔐 Auth State:", authState);
      console.log("🏪 ==========================================");
    }
  } catch (e) {
    console.log("🏪 Redux state access error:", e);
  }
  const [currentStep, setCurrentStep] = useState(1); // 1: Signup, 2: Verification, 3: Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 🔍 IMMEDIATE COMPREHENSIVE LOGGING (runs right away)
  console.log("🔍 ========== SIGNUP PAGE LOADED - USER STATE CHECK ==========");
  console.log("⏰ Page load time:", new Date().toISOString());

  // Check localStorage immediately
  console.log("📱 LocalStorage Data:");
  try {
    console.log("  - isSignedIn:", localStorage.getItem("isSignedIn"));
    console.log("  - userEmail:", localStorage.getItem("userEmail"));
    console.log("  - All localStorage keys:", Object.keys(localStorage));
    console.log("  - All localStorage data:");
    Object.keys(localStorage).forEach((key) => {
      console.log(`    ${key}:`, localStorage.getItem(key));
    });
  } catch (e) {
    console.error("  - LocalStorage error:", e);
  }

  // Check sessionStorage immediately
  console.log("💾 SessionStorage Data:");
  try {
    console.log("  - All sessionStorage keys:", Object.keys(sessionStorage));
    console.log("  - All sessionStorage data:");
    Object.keys(sessionStorage).forEach((key) => {
      console.log(`    ${key}:`, sessionStorage.getItem(key));
    });
  } catch (e) {
    console.error("  - SessionStorage error:", e);
  }

  // Check cookies immediately
  console.log("🍪 Document Cookies:");
  console.log("  - All cookies:", document.cookie);

  // Check current URL and route immediately
  console.log("🌐 Current Route Info:");
  console.log("  - Current pathname:", window.location.pathname);
  console.log("  - Current search:", window.location.search);
  console.log("  - Current hash:", window.location.hash);
  console.log("  - Full URL:", window.location.href);

  // Check URL parameters immediately
  const urlParams = new URLSearchParams(window.location.search);
  console.log("🔗 URL Parameters:");
  urlParams.forEach((value, key) => {
    console.log(`  - ${key}:`, value);
  });

  console.log("🔍 =============================================");

  // 🔍 COMPREHENSIVE USER STATE LOGGING IN USEEFFECT
  useEffect(() => {
    const checkUserState = async () => {
      console.log("🔄 ========== DETAILED USER STATE CHECK ==========");

      // Check Redux store if available
      try {
        const reduxState = window.__REDUX_DEVTOOLS_EXTENSION__?.();
        console.log("🏪 Redux State Available:", !!reduxState);

        // Try to access Redux store from window
        if (window.store) {
          console.log("🏪 Redux Store State:", window.store.getState());
        }
      } catch (e) {
        console.log("🏪 Redux state check error:", e);
      }

      // Check for any authentication tokens
      console.log("🔐 Authentication Tokens:");
      const possibleTokenKeys = [
        "accessToken",
        "idToken",
        "refreshToken",
        "authToken",
        "token",
        "jwt",
      ];
      possibleTokenKeys.forEach((key) => {
        const localValue = localStorage.getItem(key);
        const sessionValue = sessionStorage.getItem(key);
        if (localValue)
          console.log(
            `  - localStorage.${key}:`,
            localValue.substring(0, 50) + "..."
          );
        if (sessionValue)
          console.log(
            `  - sessionStorage.${key}:`,
            sessionValue.substring(0, 50) + "..."
          );
      });

      console.log("🔍 =============================================");
    };

    checkUserState();
  }, []);

  // Form data state
  const [formData, setFormData] = useState({
    role: "Self",
    userName: "",
    email: "",
    dependents: [],
    verificationCode: ["", "", "", "", "", ""],
    password: "",
    confirmPassword: "",
  });

  // 🔍 LOG FORM DATA CHANGES
  useEffect(() => {
    console.log("📝 Form Data Updated:");
    console.log("  - Role:", formData.role);
    console.log("  - User Name:", formData.userName);
    console.log("  - Email:", formData.email);
    console.log("  - Dependents count:", formData.dependents.length);
    console.log("  - Dependents data:", formData.dependents);
    console.log(
      "  - Verification code length:",
      formData.verificationCode.join("").length
    );
    console.log("  - Password length:", formData.password.length);
    console.log(
      "  - Confirm password length:",
      formData.confirmPassword.length
    );
    console.log("  - Full form data:", formData);
  }, [formData]);

  // 🔍 LOG STEP CHANGES
  useEffect(() => {
    console.log("🚶 Step Changed:");
    console.log("  - Current step:", currentStep);
    console.log(
      "  - Step name:",
      currentStep === 1
        ? "Signup Form"
        : currentStep === 2
        ? "Email Verification"
        : currentStep === 3
        ? "Success"
        : "Unknown"
    );
    console.log("  - Loading state:", loading);
    console.log("  - Error state:", error);
    console.log("  - Info message:", infoMessage);
  }, [currentStep, loading, error, infoMessage]);

  // Update form data
  const updateFormData = useCallback((field, value) => {
    console.log(`📝 Updating form field '${field}' with value:`, value);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // 🔍 CHECK AWS COGNITO USER STATE
  useEffect(() => {
    const checkCognitoUser = async () => {
      try {
        console.log("🔐 ========== AWS COGNITO USER CHECK ==========");
        console.log("🔧 Environment check:");
        console.log("  - USER_POOL_ID:", process.env.NEXT_PUBLIC_USER_POOL_ID);
        console.log(
          "  - USER_POOL_CLIENT_ID:",
          process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID
        );

        // Check if there's a current user session
        const { CognitoUserPool } = await import("amazon-cognito-identity-js");
        const userPool = new CognitoUserPool({
          UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
          ClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
        });

        const currentUser = userPool.getCurrentUser();
        console.log("👤 Current Cognito User:", currentUser);

        if (currentUser) {
          console.log("✅ USER IS LOGGED IN:");
          console.log("  - Username:", currentUser.username);
          console.log("  - User attributes:", currentUser.attributes);
          console.log(
            "  - Storage keys:",
            Object.keys(currentUser.storage || {})
          );
          console.log("  - Full user object:", currentUser);

          // Get user session
          currentUser.getSession((err, session) => {
            if (err) {
              console.log("❌ Session error:", err);
            } else {
              console.log("✅ ACTIVE SESSION FOUND:");
              console.log("  - Session valid:", session?.isValid());
              const accessToken = session?.accessToken?.jwtToken;
              console.log(
                "  - Access token:",
                accessToken?.substring(0, 50) + "..."
              );
              console.log("  - ID token payload:", session?.idToken?.payload);
              console.log(
                "  - Refresh token:",
                session?.refreshToken?.token?.substring(0, 50) + "..."
              );
              console.log("  - Full session:", session);

              // Store access token for API calls
              if (accessToken) {
                window.cognitoAccessToken = accessToken;
                console.log("✅ Access token stored for API calls");
              }
            }
          });

          // Get user attributes
          currentUser.getUserAttributes((err, attributes) => {
            if (err) {
              console.log("❌ Attributes error:", err);
            } else {
              console.log("✅ USER ATTRIBUTES:");
              let userEmail = null;
              attributes?.forEach((attr) => {
                console.log(`  - ${attr.getName()}:`, attr.getValue());
                if (attr.getName() === "email") {
                  userEmail = attr.getValue();
                }
              });

              // Check localStorage for user details (backend endpoints not available)
              if (userEmail) {
                console.log("🔍 Checking localStorage for user details...");

                const lastCreatedUser = localStorage.getItem("lastCreatedUser");
                if (lastCreatedUser) {
                  try {
                    const userData = JSON.parse(lastCreatedUser);
                    if (userData.email === userEmail) {
                      console.log("");
                      console.log(
                        "✅ COMPLETE USER DATA (From Signup Session):"
                      );
                      console.log("  - User Name:", userData.userName);
                      console.log("  - Email:", userData.email);
                      console.log("  - Account Type:", userData.role);
                      console.log("  - Created At:", userData.createdAt);

                      if (
                        userData.role === "Caregiver" &&
                        userData.dependents?.length > 0
                      ) {
                        console.log("");
                        console.log("✅ CAREGIVER ACCOUNT - DEPENDENTS:");
                        console.log(
                          "  - Number of Dependents:",
                          userData.dependents.length
                        );
                        userData.dependents.forEach((dep, idx) => {
                          console.log(`\n  📍 Dependent ${idx + 1}:`);
                          console.log(`     - Name: ${dep.name}`);
                          console.log(`     - Email: ${dep.email}`);
                        });
                      } else if (userData.role === "Self") {
                        console.log(
                          "  - Account Type: Individual (No dependents)"
                        );
                      }

                      console.log("");
                      console.log("📦 Full User Object:", userData);
                      console.log("");
                      console.log("✅ ALL USER DATA DISPLAYED SUCCESSFULLY!");
                    } else {
                      console.log(
                        "⚠️ This user was created in a different session"
                      );
                      console.log(
                        "💡 Create a new account to see full details"
                      );
                    }
                  } catch (e) {
                    console.error("❌ Error parsing localStorage data:", e);
                  }
                } else {
                  console.log("⚠️ No user data found in localStorage");
                  console.log(
                    "💡 This user was created before tracking was implemented"
                  );
                  console.log(
                    "   Create a NEW test account to see complete details including dependents"
                  );
                }
              }
            }
          });
        } else {
          console.log("❌ No current Cognito user found");
        }

        console.log("🔐 =============================================");
      } catch (error) {
        console.error("❌ Error checking Cognito user:", error);
      }
    };

    checkCognitoUser();
  }, []);

  // Handle role change - clear form when switching roles
  const handleRoleChange = useCallback(
    (newRole) => {
      console.log(`🔄 Role changing from '${formData.role}' to '${newRole}'`);
      setFormData((prev) => ({
        ...prev,
        role: newRole,
        userName: "",
        email: "",
        dependents: newRole === "Caregiver" ? [{ name: "", email: "" }] : [],
      }));
    },
    [formData.role]
  );

  // Add dependent (max 2)
  const addDependent = useCallback(() => {
    setFormData((prev) => {
      if (prev.dependents.length < 2) {
        return {
          ...prev,
          dependents: [...prev.dependents, { name: "", email: "" }],
        };
      }
      return prev;
    });
  }, []);

  // Remove dependent
  const removeDependent = useCallback((index) => {
    setFormData((prev) => ({
      ...prev,
      dependents: prev.dependents.filter((_, i) => i !== index),
    }));
  }, []);

  // Update dependent
  const updateDependent = useCallback((index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      dependents: prev.dependents.map((dep, i) =>
        i === index ? { ...dep, [field]: value } : dep
      ),
    }));
  }, []);

  // Update verification code
  const updateVerificationCode = useCallback((index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      setFormData((prev) => {
        const newCode = [...prev.verificationCode];
        newCode[index] = value;
        return { ...prev, verificationCode: newCode };
      });

      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  }, []);

  // Validation
  const validateStep1 = () => {
    const errors = [];
    if (!formData.userName.trim()) errors.push("User Name is required");
    if (!formData.email.trim()) errors.push("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.push("Please enter a valid email");

    if (formData.role === "Caregiver") {
      formData.dependents.forEach((dep, index) => {
        if (!dep.name.trim())
          errors.push(`Dependent ${index + 1} name is required`);
        if (!dep.email.trim())
          errors.push(`Dependent ${index + 1} email is required`);
        if (dep.email && !/\S+@\S+\.\S+/.test(dep.email)) {
          errors.push(`Dependent ${index + 1} email is invalid`);
        }
      });
    }

    return errors;
  };

  const validateStep2 = () => {
    const errors = [];
    const code = formData.verificationCode.join("");
    if (code.length !== 6)
      errors.push("Please enter the complete 6-digit code");
    if (!formData.password) errors.push("Password is required");
    if (formData.password.length < 8)
      errors.push("Password must be at least 8 characters");
    // AWS Cognito password requirements: no leading/trailing spaces, and contains uppercase, lowercase, number, special char
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?-])(?!.*\s$)(?!^\s).{8,}$/.test(
        formData.password
      )
    ) {
      errors.push(
        "Password must contain uppercase, lowercase, number, special character, and no leading/trailing spaces"
      );
    }
    if (formData.password !== formData.confirmPassword) {
      errors.push("Passwords do not match");
    }
    return errors;
  };

  // Handle signup
  const handleSignup = async () => {
    console.log("🚀 ========== SIGNUP PROCESS STARTED ==========");
    console.log("📋 Current form data at signup:", formData);
    console.log("🔍 Environment variables:");
    console.log("  - USER_POOL_ID:", process.env.NEXT_PUBLIC_USER_POOL_ID);
    console.log(
      "  - USER_POOL_CLIENT_ID:",
      process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID
    );
    console.log("  - API_BASE_URL:", process.env.NEXT_PUBLIC_API_APP_BASE_URL);

    setError("");
    setInfoMessage("");
    setLoading(true);

    try {
      const errors = validateStep1();
      if (errors.length > 0) {
        setError(errors[0]);
        setLoading(false);
        return;
      }

      try {
        // Try to create new user
        const result = await signUp(formData.email, TEMP_SIGNUP_PASSWORD);
        if (result.user) {
          console.log("✅ New user created, proceeding to verification");
          setCurrentStep(2);
        }
      } catch (signupError) {
        if (signupError.name === "UsernameExistsException") {
          console.log("🔄 User exists, trying to resend confirmation code...");
          try {
            // User exists but might be unverified, try to resend confirmation
            await resendConfirmationCode(formData.email);
            console.log(
              "✅ Confirmation code resent, proceeding to verification"
            );
            setError(""); // Clear any previous errors
            setInfoMessage(
              "A verification code has been sent to your email. Please check and enter it below."
            );
            setCurrentStep(2);
          } catch (resendError) {
            console.error("❌ Error resending confirmation:", resendError);
            if (
              resendError.name === "InvalidParameterException" ||
              resendError.message?.includes("already confirmed")
            ) {
              setError(
                "An account with this email is already verified. Please sign in instead."
              );
            } else {
              setError("Failed to resend verification code. Please try again.");
            }
          }
        } else {
          throw signupError; // Re-throw other errors
        }
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  // Handle account creation (verification + password)
  const handleCreateAccount = async () => {
    console.log("✅ ========== ACCOUNT CREATION STARTED ==========");
    console.log("📱 Current user state:");
    console.log("  - Email:", formData.email);
    console.log("  - Role:", formData.role);
    console.log("  - Verification code:", formData.verificationCode.join(""));
    console.log("  - Password length:", formData.password.length);
    console.log("  - Dependents:", formData.dependents);

    setError("");
    setInfoMessage("");
    setLoading(true);

    try {
      const errors = validateStep2();
      if (errors.length > 0) {
        setError(errors[0]);
        setLoading(false);
        return;
      }

      const code = formData.verificationCode.join("");
      console.log(
        "🔄 Confirming signup with code:",
        code,
        "for email:",
        formData.email
      );
      const confirmResult = await confirmSignUp(formData.email, code);
      console.log("✅ Cognito confirm result:", confirmResult);

      // Set the permanent password after email confirmation
      console.log("🔄 Setting permanent password in Cognito...");
      await setNewPassword(
        formData.email,
        TEMP_SIGNUP_PASSWORD,
        formData.password
      );
      console.log("✅ Permanent password set successfully");

      // Create user in our backend
      const userPayload = {
        userEmail: formData.email,
        role: formData.role === "Self" ? "Individual" : "Caregiver",
        firstSet: {
          userName: formData.userName,
        },
      };

      console.log("🔄 ========== USER CREATION ==========");
      console.log("🔄 Form role value:", formData.role);
      console.log(
        "🔄 Backend role value:",
        formData.role === "Self" ? "Individual" : "Caregiver"
      );
      console.log(
        "🔄 Creating user with payload:",
        JSON.stringify(userPayload, null, 2)
      );
      console.log("🔄 ====================================");

      // Create user in backend - MUST succeed to proceed
      const userCreationStatus = await createUser(userPayload);
      console.log("✅ User creation status:", userCreationStatus);

      // Check if user creation was successful (status 200 or 201)
      if (userCreationStatus !== 200 && userCreationStatus !== 201) {
        throw new Error(
          `Failed to create user account. Please try again or contact support.`
        );
      }

      // Create dependents if caregiver
      if (formData.role === "Caregiver" && formData.dependents.length > 0) {
        console.log("🔄 ========== DEPENDENT CREATION ==========");
        console.log("🔄 Caregiver role detected:", formData.role);
        console.log(
          "🔄 Number of dependents to create:",
          formData.dependents.length
        );
        console.log(
          "🔄 Dependents data:",
          JSON.stringify(formData.dependents, null, 2)
        );
        console.log("🔄 ==========================================");

        for (const dependent of formData.dependents) {
          const dependentPayload = {
            userEmail: dependent.email,
            role: "Dependant",
            caregiverEmail: formData.email,
            firstSet: {
              userName: dependent.name,
            },
          };
          console.log("🔄 ========== CREATING DEPENDENT ==========");
          console.log(
            "🔄 Dependent payload:",
            JSON.stringify(dependentPayload, null, 2)
          );
          console.log("🔄 ==========================================");

          const dependentStatus = await createUser(dependentPayload);
          console.log("✅ Dependent creation status:", dependentStatus);

          if (dependentStatus !== 200 && dependentStatus !== 201) {
            throw new Error(
              `Failed to create dependent: ${dependent.name}. Please contact support.`
            );
          }

          console.log(
            "✅ ========== DEPENDENT CREATED SUCCESSFULLY =========="
          );
          console.log("✅ Dependent name:", dependent.name);
          console.log("✅ Dependent email:", dependent.email);
          console.log(
            "✅ ======================================================"
          );
        }

        console.log("✅ ========== ALL DEPENDENTS CREATED ==========");
        console.log("✅ Total dependents created:", formData.dependents.length);
        console.log("✅ ==============================================");
      } else {
        console.log("ℹ️ ========== NO DEPENDENTS TO CREATE ==========");
        console.log("ℹ️ Form role:", formData.role);
        console.log("ℹ️ Is Caregiver?:", formData.role === "Caregiver");
        console.log("ℹ️ Dependents length:", formData.dependents.length);
        console.log(
          "ℹ️ Will create dependents?:",
          formData.role === "Caregiver" && formData.dependents.length > 0
        );
        console.log("ℹ️ ================================================");
      }

      console.log(
        "✅ All users created successfully in backend, proceeding to success screen"
      );

      // Store user info in localStorage for reference
      localStorage.setItem(
        "lastCreatedUser",
        JSON.stringify({
          email: formData.email,
          role: formData.role,
          userName: formData.userName,
          dependents: formData.dependents,
          createdAt: new Date().toISOString(),
        })
      );

      setCurrentStep(3);
    } catch (err) {
      console.error("Account creation error:", err);
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 COMPREHENSIVE USER STATE LOGGER
  const logCompleteUserState = useCallback(() => {
    console.log("🔍 ========== COMPLETE USER STATE DUMP ==========");
    console.log("⏰ Timestamp:", new Date().toISOString());

    // Browser state
    console.log("🌐 Browser State:");
    console.log("  - User Agent:", navigator.userAgent);
    console.log("  - URL:", window.location.href);
    console.log("  - Referrer:", document.referrer);

    // Authentication state
    console.log("🔐 Authentication State:");
    console.log(
      "  - localStorage isSignedIn:",
      localStorage.getItem("isSignedIn")
    );
    console.log(
      "  - localStorage userEmail:",
      localStorage.getItem("userEmail")
    );

    // Form state
    console.log("📝 Current Form State:");
    console.log("  - Step:", currentStep);
    console.log("  - Loading:", loading);
    console.log("  - Error:", error);
    console.log("  - Info:", infoMessage);
    console.log("  - Form Data:", JSON.stringify(formData, null, 2));

    // Environment
    console.log("🔧 Environment:");
    console.log("  - NODE_ENV:", process.env.NODE_ENV);
    console.log(
      "  - API URLs configured:",
      !!process.env.NEXT_PUBLIC_API_APP_BASE_URL
    );

    console.log("🔍 =============================================");
  }, [currentStep, loading, error, infoMessage, formData]);

  // Make logger available globally for debugging
  useEffect(() => {
    window.logUserState = logCompleteUserState;
    console.log("🔧 Global function 'logUserState()' available for debugging");
  }, [logCompleteUserState]);

  // Resend code
  const handleResendCode = async () => {
    console.log("📤 Resending verification code for:", formData.email);
    try {
      await resendConfirmationCode(formData.email);
      setError("Code resent successfully");
      console.log("✅ Code resent successfully");
    } catch (err) {
      console.error("❌ Failed to resend code:", err);
      setError("Failed to resend code");
    }
  };

  return (
    <LayoutWrapper>
      <div className="min-h-screen pt-[64px] bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-200 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md py-20"
        >
          <Card className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              {currentStep === 1 && (
                <SignupScreen
                  formData={formData}
                  updateFormData={updateFormData}
                  handleRoleChange={handleRoleChange}
                  updateDependent={updateDependent}
                  addDependent={addDependent}
                  removeDependent={removeDependent}
                  handleSignup={handleSignup}
                  loading={loading}
                  error={error}
                />
              )}
              {currentStep === 2 && (
                <EmailVerificationScreen
                  formData={formData}
                  updateVerificationCode={updateVerificationCode}
                  updateFormData={updateFormData}
                  handleResendCode={handleResendCode}
                  handleCreateAccount={handleCreateAccount}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                  loading={loading}
                  error={error}
                  infoMessage={infoMessage}
                />
              )}
              {currentStep === 3 && (
                <SuccessScreen router={router} infoMessage={infoMessage} />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </LayoutWrapper>
  );
};

export default SimpleSignupFlow;
