"use client";

import React from "react";
import PrimaryButton from "../components/primarybtn";
import { useRouter } from "next/navigation";
const SuccessComponent = () => {
  const router = useRouter();
  return (
    <>
      <div className="mt-[4rem]">
        <div className="2xl:container m-auto">
          <div className="row pt-36  pb-[9rem]  sm:px-[0.75rem] md:px-[3.37rem] 1lg:px-[5.5rem]">
            <div className="flex items-center justify-center">
              <img src="/images/Success_Icon.svg" alt="success icon" />
            </div>
            <div className="flex justify-center mt-3">
              <p className="text-[1.5rem] text-white font-bold leading-8 text-center">
                Your account has been created
                <br /> successfully!
              </p>
            </div>
            <div className="flex justify-center mt-9">
              <PrimaryButton
                btnName="Continue with Sign in"
                type="submit"
                onClick={() =>
                  router.push({
                    pathname: "/signin",
                    query: { flag: "true" },
                  })
                }
              />
            </div>
          </div>
            <div className="flex justify-center my-[4rem]">
                        <p className="text-[0.875rem] font-medium leading-5 text-white">
                          Copyright © 2024 GenAI Healthcare, All Rights
                          Reserved.
                        </p>
                      </div>
         
        </div>
      </div>
    </>
  );
};

export default SuccessComponent;
