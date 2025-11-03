import React, { useRef } from "react";

const OTPinputfield = ({ length, input }) => {
  const inputsRef = useRef(new Array(length).fill(null));

  const handleChange = (value, index) => {
    if (!isNaN(value) && value.length === 1) {
      const newOtp = inputsRef.current.map((input, idx) =>
        idx === index ? value : input.value
      );
      input.onChange(newOtp.join(""));
      if (index < length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyUp = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !inputsRef.current[index].value) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    if (/^\d+$/.test(pasteData) && pasteData.length <= length) {
      pasteData.split("").forEach((char, index) => {
        inputsRef.current[index].value = char;
      });
      input.onChange(pasteData);
    }
  };

  return (
    <div className="flex space-x-2" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          maxLength="1"
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyUp={(e) => handleKeyUp(e, index)}
          className="w-12 h-12 bg-white text-center outline-none border-light-grey border px-3 text-black py-[1rem] pb-[1rem] mb-3 leading-tight focus:border-gray-500"
        />
      ))}
    </div>
  );
};

export default OTPinputfield;