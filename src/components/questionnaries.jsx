"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";

export default function QuestionnairePage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/getProductQuestions`);
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e) => {
 if (typeof window !== "undefined") {

    const email = localStorage.getItem('userEmail');
    e.preventDefault();
    console.log("Submitted Answers:", answers);
    const payload = {
      userEmail: email,
      questions: questions.map((q) => ({
        questionId: q.questionId,
        question: q.question,
        userResponse: answers[q.questionId] || "",
      })),
    };

    console.log(payload);
    try {
      await axios.post(`${apiBaseUrl}/createUserProductResp`,
        payload,
      );
      localStorage.setItem("ringDialogShown", "true");
      setShowSuccessDialog(true);
    } catch (err) {
      console.error("Error submitting answers:", err);
      alert("Failed to submit answers");
    }
  };
}
  const handleContinue = () => {
    setShowSuccessDialog(false);
    router.push(`/smartRingDetails/${productId}`);
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-purple-800 to-blue-900">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-blue-800 text-white py-12 mt-28">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto text-sm mb-6 text-gray-200">
        <a href="./" className="text-white">
          Home
        </a>
        <FaAngleRight className="inline mx-2 text-white" />
        <span className="font-semibold">Ring Size Questionnaire</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-start">
        {/* LEFT COLUMN - Questions */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-2 max-w-2xl space-y-9"
        >
          {questions.map((q) => (
            <div key={q.questionId}>
              <label className="block text-base font-medium mb-2">
                {q.question}
              </label>
              {q.helpText && (
                <p className="text-sm text-gray-05 mb-3">{q.helpText}</p>
              )}

              {Array.isArray(q.options) && q.options.length > 0 ? (
                <div className="relative w-full">
                  <select
                    className={`w-full border border-gray-300 px-4 py-3 mt-1 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none ${answers[q.questionId] ? "text-black" : "text-gray-700"
                      }`}
                    value={answers[q.questionId] || ""}
                    onChange={(e) => handleChange(q.questionId, e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Select
                    </option>
                    {q.options.map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  {/* Custom dropdown arrow */}
                  <img className="absolute inset-y-6 right-3 flex items-center pointer-events-none text-gray-500" src="images/expand_more.svg">

                  </img>
                </div>

              ) : (
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={answers[q.questionId] || ""}
                  onChange={(e) => handleChange(q.questionId, e.target.value)}
                  placeholder="Type your answer..."
                />
              )}

            </div>
          ))}
          <div className="text-right">
            <button
              type="submit"
              className="px-8 rounded-full bg-purple text-white font-semibold py-2  shadow-lg"
            >
              Submit
            </button>
          </div>
        </form>

        {/* RIGHT COLUMN - Bigger Instructional Image */}
        <div className="md:col-span-1 text-white">
          <h3 className="font-bold mb-4">
            How to measure your ring size? Refer below image:
          </h3>
          <img
            src="/Smart-Ring-Measurement-Chart-new.svg"
            alt="Ring size measurement guide"
            className="w-full h-auto max-h-[500px] object-contain"
          />
        </div>
      </div>
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-8 rounded-2xl shadow-lg max-w-xl w-full text-center">
            <h3 className="text-2xl font-bold mb-4">
              Details Submitted Successfully!
            </h3>
            <p className="text-base text-gray-700 mb-6">
              Thank you for sharing the details, now you can proceed to buy the desired smart ring.
            </p>
            <button
              onClick={handleContinue}
              className="bg-purple text-white px-9 py-3 rounded-full font-medium text-lg"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
