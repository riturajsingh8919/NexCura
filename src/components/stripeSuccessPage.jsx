"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import axios from "axios";

import StatusScreen from "./statusScreen";
import { clearCart } from "../redux/features/cart/cartSlice";

const SuccessScreen = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [emailsSent, setEmailsSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const emailsSentRef = useRef(false);

  useEffect(() => {
    dispatch(clearCart());
    localStorage.removeItem("persist:cart");
    if (typeof window !== "undefined") {
      sessionStorage.setItem("preOrderDialogShown", "false");
    }

    const fetchOrders = async () => {
      if (typeof window !== "undefined") {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
          setOrders([]);
          setLoadingOrders(false);
          return;
        }

        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/getAllProductOrders`,
            { params: { userEmail } }
          );

          // Normalize response
          let data = res.data;
          console.log("API response:", res.data);
          if (!Array.isArray(data)) {
            data = Object.values(data);
          }

          if (data.length > 0) {
            const sorted = [...data].sort(
              (a, b) => Number(b.orderPlacedDate) - Number(a.orderPlacedDate)
            );

            console.log("Sorted orders:", sorted[0]);

            setOrders(sorted[0]);

            // Don't send emails here - move to separate useEffect
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
          setOrders([]);
        } finally {
          setLoadingOrders(false);
        }
      }
    };

    fetchOrders();
  }, [dispatch]);

  // Separate useEffect for sending emails - only runs when orders change
  useEffect(() => {
    if (orders && orders.productOrderId && !emailsSentRef.current) {
      const sendEmails = async () => {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) return;

        const emailSentKey = `transaction_email_sent_${orders.productOrderId}`;
        const alreadySent = sessionStorage.getItem(emailSentKey);

        if (!alreadySent && !emailsSentRef.current) {
          emailsSentRef.current = true;
          try {
            await sendTransactionEmails(orders, userEmail);
            sessionStorage.setItem(emailSentKey, 'true');
          } catch (error) {
            console.error("Error sending transaction emails:", error);
            emailsSentRef.current = false; // Reset on error
          }
        }
      };

      sendEmails();
    }
  }, [orders]);

  const sendTransactionEmails = async (orderData, userEmail) => {
    try {
      const userName = localStorage.getItem("userName") || userEmail.split("@")[0];

      // Fix date parsing: convert seconds → ms
      let orderDate;
      if (orderData.orderPlacedDate) {
        const timestamp = Number(orderData.orderPlacedDate);
        if (timestamp > 1000000000000) { // Valid timestamp
          orderDate = new Date(timestamp).toLocaleDateString();
        } else {
          orderDate = new Date().toLocaleDateString();
        }
      } else {
        orderDate = new Date().toLocaleDateString();
      }

      let shippingAddress = "To be provided";
      if (orderData.shippingAddress) {
        const { line1, line2, city, state, country, postal_code } =
          orderData.shippingAddress;

        shippingAddress = [
          line1,
          line2,
          `${city}, ${state} ${postal_code}`,
          country,
        ]
          .filter(Boolean)
          .join(", ");
      }
      // Prepare transaction data
      const transactionData = {
        customerName: userName,
        customerEmail: userEmail,
        orderId: orderData.productOrderId || "N/A",
        orderDate: orderDate,
        totalAmount:
          orderData.totalAmount ||
          orderData.orderPrice ||
          orderData.cartItems?.reduce(
            (sum, item) => sum + (item.orderPrice || 0) * (item.qty || 1),
            0
          ) ||
          "0",
        deliveryDate:
          orderData.deliveryDate || orderData.cartItems?.[0]?.deliveryDate || "TBD",
        items:
          orderData.cartItems?.map((item) => ({
            name: item.name || "NexCura Smart Ring",
            details: item.productDetails || "",
            size: item.productSize || "Selected",
            quantity: item.qty || 1,
            price: item.orderPrice || 0,
            color: item.color || "Selected",
          })) || [],
        shippingAddress: shippingAddress,
      };

      // Send transaction emails directly to API Gateway
      const response = await fetch(`${process.env.NEXT_PUBLIC_EMAIL_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: transactionData,
          emailType: 'transaction'
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Transaction emails sent successfully:", result);
      } else {
        const errorData = await response.json();
        console.error("Error sending transaction emails:", errorData);
      }
    } catch (error) {
      console.error("Error sending transaction emails:", error);
    }
  };


  if (loadingOrders) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-purple-800 to-blue-900">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <StatusScreen
      imageSrc="/Success_Icon.svg"
      altText="Success"
      title="Payment is Successful"
      message="Thank you for your payment. An automated payment receipt will be sent to your registered email."
    >
      <Link href="/" className="text-blue-500 font-semibold text-[1rem] my-2">
        Go to Home <FaAngleRight className="inline text-blue-500" />
      </Link>

      {!loadingOrders && (
        <div className="mt-6 text-center">
          <h2 className="text-lg font-semibold text-black">
            Your Order Details
          </h2>
          <div className="mt-3">
            <p className="text-gray-700 font-medium">
              Order ID: {orders.productOrderId}
            </p>
          </div>
        </div>
      )}

      <h2 className="text-xl md:text-2xl black-100 font-semibold mb-4 mt-6">
        Download Nexcura App
      </h2>

      <div className="flex space-x-4">
        <a
          href="https://www.apple.com/app-store/"
          target="_blank"
          className="text-white py-3 px-2 rounded"
        >
          <img
            src="/App_store_Button.svg"
            alt="App Store"
            className="w-32 h-auto"
          />
        </a>
        <a
          href="https://play.google.com/store"
          target="_blank"
          className="text-white py-3 rounded"
        >
          <img
            src="/PlayStore_Button.svg"
            alt="Google Play"
            className="w-32 h-auto"
          />
        </a>
      </div>

      <p className="text-center text-medium md:text-lg mt-8">
        Download and Install Nexcura app and start tracking your health journey!
      </p>
    </StatusScreen>
  );
};

export default SuccessScreen;
