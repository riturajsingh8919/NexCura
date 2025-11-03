import React from "react";

const PrimaryButton = ({ type, onClick, btnName, className, flag }) => {
  const buttonClass = flag ? className : "w-[21rem]";

  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`bg-[#B5229F] text-white py-3 text-[1.125rem] rounded-3xl font-medium leading-[1.875rem] ${buttonClass}`}
      >
        {btnName}
      </button>
    </div>
  );
};

export default PrimaryButton;
