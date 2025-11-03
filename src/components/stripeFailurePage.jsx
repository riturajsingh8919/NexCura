"use client";

import React from "react";
import { useRouter } from "next/navigation";
import StatusScreen from "./statusScreen";

const FailureScreen = () => {
  const router = useRouter();

  const handleRetryClick = () => {
    router.push('/smart-ring');
  };

  return (
    <StatusScreen
      imageSrc="/Error_Icon.svg"
      altText="Failure"
      title="Payment Failure"
      message="Your payment for the subscription failed. Please retry the payment. Any deducted funds from your account will be refunded within 2–3 business days."
    >
      <button 
        onClick={handleRetryClick} 
        className="bg-blue-500 text-white mt-2 py-2 px-10"
      >
        Try Again
      </button>
    </StatusScreen>
  );
};

export default FailureScreen;
