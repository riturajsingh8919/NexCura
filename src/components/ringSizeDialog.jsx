"use client";
import { useRouter } from "next/router";

const RingSizeDialog = ({ open, onClose, productId }) => {
  const router = useRouter();

  if (!open) return null;

  const handleContinue = () => {
 if (typeof window !== "undefined") {

    localStorage.setItem("ringDialogShown", "true"); // mark as shown
    onClose(); // close dialog
    router.push(`/questionnaire?productId=${productId}`);
  };
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 rounded-2xl shadow-lg max-w-xl w-full text-center">
        <h3 className="text-2xl font-bold mb-4">Ensure the Perfect Fit</h3>
        <p className="text-base text-gray-600 mb-6">
          Before purchasing your ring, please answer the following questions
          to help us measure and determine your accurate ring size.
        </p>
        <button
          onClick={handleContinue}
          className="bg-purple text-white px-9 py-3 rounded-full font-medium text-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RingSizeDialog;
