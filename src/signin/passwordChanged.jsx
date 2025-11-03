import React from "react";
import Title from "../component/title";
import PrimaryButton from "../component/primarybtn";
import { useRouter } from "next/navigation";
const PasswordChanged = () => {
  const router = useRouter();
  return (
    <>
      <div className="mt-[10rem]">
        <div className="2xl:container m-auto">
          <div className="row pt-20 text-center pb-[6rem]  sm:px-[0.75rem] md:px-[3.37rem] 1lg:px-[5.5rem]">
            <div className="flex justify-center">
              <img src="/images/Success_Icon.svg" alt="success icon" />
            </div>
            <div className="flex justify-center mt-3">
              <Title title="Password Changed"/>
            </div>
            <div className="flex justify-center mt-3">
              <p className="text-[1rem] font-medium leading-5 text-white text-center">
                Your password has been changed successfully.
                <br /> Use your new password to log in.
              </p>
            </div>
            <div className="flex justify-center mt-9">
              <PrimaryButton
                btnName="Continue"
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
             <div className="flex justify-center my-[3rem]">
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

export default PasswordChanged;
