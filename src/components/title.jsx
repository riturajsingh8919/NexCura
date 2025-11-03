import React from "react";

const Title = ({ title }) => {
  return (
    <>
      <div>
        <p className="text-[1.75rem]  font-bold leading-[3rem] text-white">
          {title}
        </p>
      </div>
    </>
  );
};

export default Title;
