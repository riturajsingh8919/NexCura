"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Hash, Loader2, CheckCircle } from "lucide-react";
import { confirmSignUp, resendConfirmationCode } from '@/components/cognitoServices';

const Verification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [cognitoError, setCognitoError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.code) errors.code = "Verification code is required";
    return errors;
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await confirmSignUp(email, values.code);
      router.push("/signin");
    } catch (error) {
      setCognitoError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setResendLoading(true);
    try {
      await resendConfirmationCode(email);
    } catch (error) {
      setCognitoError(error.message || "Failed to resend code");
    } finally {
      setResendLoading(false);
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
              Verify Your Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-gray-600 mb-6">
              Enter the verification code sent to{" "}
              <span className="font-medium text-gray-800">{email}</span>
            </p>
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
                          <Input
                            {...input}
                            id="code"
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={6}
                            placeholder="Enter code"
                            className="h-12"
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, ""); 
                              input.onChange(e);
                            }}
                          />
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

                  {/* Verify Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-semibold shadow-lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Verify
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {/* Resend Code */}
                  <Button
                    type="button"
                    onClick={resendCode}
                    disabled={resendLoading}
                    variant="outline"
                    className="w-full h-12 border border-gray-300 mt-2"
                  >
                    {resendLoading ? "Resending..." : "Resend Code"}
                  </Button>
                </form>
              )}
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Verification;
