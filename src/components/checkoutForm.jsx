import React, { useState } from "react";
import Image from "next/image";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
const CheckoutForm = () => {
  const [cardHolderName, setCardHolderName] = useState("");
  const [saveCard, setSaveCard] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    router.push("/stripeSuccessPage");
  };
 const currentYear = new Date().getFullYear();
  return (
    <div className="bg-white min-h-screen"> 

      <div className="flex items-center justify-between mb-20 p-6 bg-white shadow-md">  
          <div className="flex items-center">  
            <Image  
              src="/images/Nexcura.png"  
              width={120}
              height={40}  
              className="object-contain"  
              alt="NexCura Logo"  
            />  
          </div>  
          {/* <h1 className="text-xl font-bold text-gray-800">Billing Information</h1>   */}
        </div> 
        
      <div className="max-w-7xl mx-auto py-15">  
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-2">  
          <div>  
            <h2 className="text-lg font-semibold">Billing Information</h2>  
          </div>  
          <div>  
            <h2 className="text-lg font-semibold">Payment Method</h2>  
          </div>  
          <div>  
            <h2 className="text-lg font-semibold">Order Details</h2>  
          </div>  
        </div> 
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-20">
        {/* Column 1: Billing Information */}
        <div className="bg-white p-6  shadow-lg border border-gray-200">
          <div className="space-y-4 ">
            <div>
              <label className="block text-sm font-medium text-black-400 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 "
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black-400 mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 "
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black-400 mb-1">Contact Number</label>
              <input
                type="tel"
                className="w-full p-2 border border-gray-300 "
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black-400 mb-1">Country</label>
              <select className="w-full p-2 border border-gray-300 ">
                <option>United States</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black-400 mb-1">State/Region</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 "
                placeholder="Atlanta"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black-400 mb-1">Address</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 "
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black-400 mb-1">Zip Code</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 "
              />
            </div>
          </div>
        </div>

        {/* Column 2: Payment Method */}
        <div className="bg-white p-6  shadow-lg border border-gray-200">
          <div className="space-y-4">
            <div className="flex items-center">
             
              <label htmlFor="creditCard" className="font-medium">Credit/Debit Card</label>
              <div className="ml-auto flex space-x-2">
                <img src="/images/visaLogo.svg" alt="Visa" className="h-6" />
                <img src="/images/mastercard-logo.svg" alt="MasterCard" className="h-6" />
                <img src="/images/amex-logo.svg" alt="Amex" className="h-6" />
              </div>
            </div>
              <div className="border border-gray-200"></div>

            <div>
              <label className="block text-sm font-medium text-black-400 mb-1">Card Number</label>
              <div className="p-2 border border-gray-300 ">
                <CardNumberElement
                  options={{
                    style: { base: { fontSize: "16px" } },
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black-400 mb-1">Expiration Date</label>
                <div className="p-2 border border-gray-300 ">
                  <CardExpiryElement
                    options={{
                      style: { base: { fontSize: "16px" } },
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black-400 mb-1">Security Code (CVV)</label>
                <div className="p-2 border border-gray-300 ">
                  <CardCvcElement
                    options={{
                      style: { base: { fontSize: "16px" } },
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black-400 mb-1">Card Holder Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 "
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                placeholder="James Porter"  
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="saveCard"
                className="mr-2"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
              />
              <label htmlFor="saveCard" className="text-sm text-gray-500">Save this card for future payments</label>
            </div>

            <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">
                <img
                  src="/images/ShowPassword.svg"
                  alt="SecureIcon"
                  className="h-4 1lg:h-4 xl:h-4"
                />
              </span>
              <span>Secure payment with SSL Encryption</span>
                <img
                  src="/images/info-icon.png"
                  alt="InfoIcon"
                  className="h-4 1lg:h-3 xl:h-4 ml-2"
                />
            </div>
          </div>
        </div>

        {/* Column 3: Order Details */}
       <div className="bg-white p-6 shadow-lg border border-gray-200 h-fit">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-bold">NexCura Smart Ring - Matte Black</span>
              </div>
              <div className="flex justify-between">
                <span>Product</span>
                <span className="font-bold">$199.99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-bold">$5.00</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Order Total</span>
                  <span>$204.99</span>
                </div>
              </div>

              <button
                type="submit" onClick={handleSubmit}
                className="w-full bg-[#174FB6] text-white py-3 px-4 font-bold mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Confirm and Pay"}
              </button>
            </div>
          </div>
        </form>

    </div>
             <section
        className={`relative`}
        style={{
          backgroundImage: `linear-gradient(to bottom left, #870F5F 10%, #0F2468 80%)`,
          // paddingBottom: isMenuHidden ? "1.25rem" : "2.5rem",
        }}
      >
      <div className="w-full text-center hidden lg:flex lg:justify-between lg:items-center mt-4 px-10 py-4 lg:px-16">
            <div className="flex justify-center lg:justify-start">
              <p className="text-white text-md font-medium">
                Copyright © {currentYear} GenAI Healthcare, All Rights Reserved.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end">
              <a
                href="/privacy-policy"
                className="text-white text-sm hover:underline mx-2 mt-2 lg:mt-0"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-and-condition"
                className="text-white text-sm hover:underline mx-2 mt-2 lg:mt-0"
              >
                Terms and Conditions
              </a>
              <a
                href="/disclaimer"
                className="text-white text-sm hover:underline mx-2 mt-2 lg:mt-0"
              >
                Disclaimer
              </a>
            </div>
          </div>
          <div className="w-full flex flex-col items-center lg:hidden text-center lg:mt-4">
            <div className="flex mt-5">
              <a
                href="/privacy-policy"
                className="text-white text-sm xm:text-base hover:underline mx-2"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-and-condition"
                className="text-white text-sm xm:text-base hover:underline mx-2"
              >
                Terms and Conditions
              </a>
              <a
                href="/disclaimer"
                className="text-white text-sm xm:text-base hover:underline mx-2"
              >
                Disclaimer
              </a>
            </div>
            <div className="w-[95%]">
              <div className="border-white border-t-[0.001rem] mt-5 items-center w-full"></div>
            </div>
            <div className="mt-4 text-white text-md font-medium">
              Copyright © {currentYear} GenAI Healthcare,
              <br /> All Rights Reserved.
            </div>
          </div>
          </section>
    </div>
  );
};

export default CheckoutForm;