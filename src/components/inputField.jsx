import React, { useState } from "react";
import { Field } from "react-final-form";

const InputField = ({
  name,
  placeholder,
  type,
  icon,
  openEyeIcon,
  staticIcon,
  iconAlt,
  className,
  validate,
}) => {
  const [inputType, setInputType] = useState(type);
  const [currentIcon, setCurrentIcon] = useState(icon);

  const toggleInputType = () => {
    if (inputType === "password") {
      setInputType("text");
      setCurrentIcon(openEyeIcon);
    } else {
      setInputType("password");
      setCurrentIcon(icon);
    }
  };

  return (
    <Field name={name} validate={validate}>
      {({ input, meta }) => (
        <div className="w-[21rem]">
          <div className="relative flex w-full flex-wrap">
            <input
              placeholder={placeholder}
              type={inputType}
              {...input}
              className={`bg-white outline-none w-full px-3 text-black py-[1rem] pb-[1rem] mb-3 leading-tight focus:border-gray-500 ${
                meta.touched && meta.error ? "border-red" : "border-gray-300"
              } ${className}`}
            />
            {type === "password" && (
              <span
                className="flex h-full absolute items-center justify-center w-6 pb-2 right-0 mx-3 cursor-pointer"
                onClick={toggleInputType}
              >
                <img src={currentIcon} alt={iconAlt} className="w-6 h-6" />
              </span>
            )}
            {type !== "password" && staticIcon && (
              <span className="flex h-full absolute items-center justify-center w-6 pb-2 right-0 mx-3">
                <img src={staticIcon} alt={iconAlt} className="w-6 h-6" />
              </span>
            )}
          </div>
          {meta.touched && meta.error && (
            <span className="text-red text-[0.875rem] font-medium leading-5">
              {meta.error}
            </span>
          )}
        </div>
      )}
    </Field>
  );
};

export default InputField;
