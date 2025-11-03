import React from "react";

const StatusScreen = ({ imageSrc, altText, title, message, children }) => (
    <div className="flex flex-col w-full items-center  min-h-screen justify-center mt-5">
  <div className="flex flex-col  items-center justify-center md:w-3/6 dm:w-2/6 px-6 md:px-0">
    <img src={imageSrc} alt={altText} className="w-12 md:w-18 h-12 md:h-18 mb-4" />
    <h2 className="text-xl md:text-2xl text-center black-100 font-semibold mb-3">{title}</h2>
    <p className="text-center text-medium md:text-lg black-100 font-medium mb-6">{message}</p>  
  </div>
  {children}
  </div>
);

export default StatusScreen;
