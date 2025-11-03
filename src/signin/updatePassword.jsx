"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
import { Lock, Hash, Loader2, KeyRound } from "lucide-react";
import { confirmPassword } from "@/components/cognitoServices";

const UpdatePassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [cognitoError, setCognitoError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.code) errors.code = "Verification code is required";

    if (!values.password) {
      errors.password = "New password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };


  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await confirmPassword(email, values.code, values.password);
      router.push("/signin");
    } catch (error) {
      setCognitoError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-200 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-gray-900">
              Update Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Code */}
                  <Field name="code">
                    {({ input, meta }) => (
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="code">Verification Code*</Label>
                        <div className="relative">
                          <Hash className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <Input
                            {...input}
                            id="code"
                            type="text"
                            placeholder="Enter code"
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

                  {/* New Password */}
                  <Field name="password">
                    {({ input, meta }) => (
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="password">New Password*</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <Input
                            {...input}
                            id="password"
                            type="password"
                            placeholder="Enter new password"
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

                  {/* Confirm Password */}
                  <Field name="confirmPassword">
                    {({ input, meta }) => (
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="confirmPassword">Confirm Password*</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <Input
                            {...input}
                            id="confirmPassword"
                            type="password"
                            placeholder="Re-enter new password"
                            className="pl-10 h-12"
                          />
                        </div>
                        {meta.touched && meta.error && (
                          <span className="text-sm text-red-500">{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>


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
                          Updating...
                        </>
                      ) : (
                        <>
                          <KeyRound className="w-5 h-5 mr-2" />
                          Update Password
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
  );
};

export default UpdatePassword;
