'use client';
import axios from "axios";

export const createCheckoutSession = async ({ cartItems, amount, quantity, pendingProduct }) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
 if (typeof window !== "undefined") {

    const userEmail = localStorage.getItem("userEmail");
    const payload = {
      amount,
      currencyCode: "USD",
      currencySymbol: "$",
      cartItems,
      userEmail,
    };

    const res = await axios.post(`${apiBaseUrl}/createCheckoutSession`, payload);

    if (res.data?.url) {
      return { redirect: res.data.url };
    } else {
      console.error("Failed to create checkout session:", res.data);
      return { error: "Failed to create checkout session" };
    }
  }
  } catch (err) {
    console.error("Checkout error:", err);
    return { error: err.message };
  }
};
