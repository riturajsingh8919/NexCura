"use client";
import { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { clearCart, removeItem } from "../redux/features/cart/cartSlice";
import { createCheckoutSession } from "./services/paymentService";
import LayoutWrapper from "./LayoutWrapper";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, count } = useSelector((state) => state.cart);
  const router = useRouter();
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const total = items.reduce(
    (acc, item) => acc + item.productCurrentAmount * item.qty,
    0
  );
  const deliveryDate = items.length > 0 ? items[0].deliveryDate : null;

  const handleAddAnotherRing = () => router.push(`/smart-ring`);

  const handleProceedToPay = async () => {
    if (typeof window !== "undefined") {
      const isSignedIn = localStorage.getItem("isSignedIn") === "true";
      if (!isSignedIn) {
        router.push(`/signin?redirect=/cart`);
        return;
      }

      setLoadingCheckout(true);

      const cartItems = items.map((item) => ({
        productId: item.id,
        deliveryDate: item.deliveryDate,
        name: item.productDetails,
        productDetails: item.productDetails,
        productColor: item.color,
        productAmount: item.productCurrentAmount,
        qty: item.qty,
        productSize: item.size || 3,
        role: item.role,
      }));

      const result = await createCheckoutSession({
        cartItems,
        amount: total,
        quantity: count,
      });

      if (result.redirect) {
        if (result.redirect.startsWith("/")) {
          router.push(result.redirect);
        } else {
          window.location.href = result.redirect;
        }
      }
    }
  };

  if (items.length === 0) {
    return (
      <LayoutWrapper>
        <div className="min-h-screen bg-gradient-to-b from-[#000d24] via-[#001233] to-[#000d24] relative overflow-hidden">
          {/* Background Grid Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          {/* Glowing Orbs */}
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#5646a3] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob" />
          <div className="absolute top-1/3 -right-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />

          <div className="relative flex flex-col items-center justify-center px-6 md:px-24 py-32 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Glass Card for Empty State */}
              <div
                className="p-12 rounded-3xl backdrop-blur-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(86, 70, 163, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mb-6"
                >
                  <Image
                    src="/Cart-Icon.png"
                    alt="Empty Cart"
                    width={100}
                    height={95}
                    className="mx-auto opacity-80"
                  />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                >
                  Your Cart is Empty
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 mb-8 text-lg max-w-md mx-auto"
                >
                  You haven't added any products to your cart yet. Start
                  shopping now!
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-xl font-bold text-white cursor-pointer relative overflow-hidden group"
                  onClick={() => router.push("/smart-ring")}
                  style={{
                    background:
                      "linear-gradient(135deg, #5646a3 0%, #9333ea 100%)",
                    boxShadow: "0 10px 30px rgba(86, 70, 163, 0.4)",
                  }}
                >
                  <span className="relative z-10">Start Shopping</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gradient-to-b from-[#000d24] via-[#001233] to-[#000d24] text-white relative overflow-hidden">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#5646a3] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob" />
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />

        <div className="relative px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-28">
          {/* Breadcrumb with Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{
                background:
                  "linear-gradient(135deg, rgba(86, 70, 163, 0.2) 0%, rgba(86, 70, 163, 0.1) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <a
                href="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </a>
              <FaAngleRight className="text-gray-500 text-xs" />
              <a
                href="/smart-ring"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Smart Ring
              </a>
              <FaAngleRight className="text-gray-500 text-xs" />
              <span className="text-white font-medium">My Cart ({count})</span>
            </div>
          </motion.div>

          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#fbf5ea] via-white to-[#fbf5ea] bg-clip-text text-transparent">
              Your Cart
            </h1>
            <p className="text-gray-400 mt-2 text-lg">
              Review your items and proceed to checkout
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Cart Items */}
            <div className="flex-1 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={item.cartItemId || `cart-item-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group relative"
                  >
                    {/* Subtle Glow Effect on Hover */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5646a3] to-purple-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500" />

                    {/* Card */}
                    <div
                      className="relative rounded-2xl overflow-hidden backdrop-blur-lg p-6"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <div className="flex flex-col sm:flex-row gap-6 items-stretch">
                        {/* Product Image */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          onClick={() =>
                            router.push(`/smartRingDetails/${item.id}`)
                          }
                          className="flex-shrink-0 w-full sm:w-[180px] h-[180px] bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center cursor-pointer p-4 border border-white/10"
                        >
                          <Image
                            src={item.productImages[0]}
                            alt={item.title || "Product Image"}
                            width={140}
                            height={140}
                            className="object-contain drop-shadow-xl"
                          />
                        </motion.div>

                        {/* Product Details */}
                        <div className="flex flex-col flex-1 justify-between">
                          <div>
                            <h2
                              onClick={() =>
                                router.push(`/smartRingDetails/${item.id}`)
                              }
                              className="font-bold text-xl cursor-pointer hover:text-purple-300 transition-colors mb-4"
                            >
                              {item.productDetails}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#5646a3] to-purple-500" />
                                <span className="text-gray-400">Price:</span>
                                <span className="font-bold text-white">
                                  ${item.productCurrentAmount}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#5646a3] to-purple-500" />
                                <span className="text-gray-400">Color:</span>
                                <span className="font-semibold text-white">
                                  {item.color}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#5646a3] to-purple-500" />
                                <span className="text-gray-400">Size:</span>
                                <span className="font-semibold text-white">
                                  {item.size}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 sm:col-span-2">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" />
                                <span className="text-gray-400">Delivery:</span>
                                <span className="font-semibold text-emerald-300 text-xs">
                                  by {item.deliveryDate}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Remove Item button */}
                          <div className="flex justify-end mt-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                dispatch(
                                  removeItem({ cartItemId: item.cartItemId })
                                )
                              }
                              className="px-5 py-2 text-white rounded-lg transition cursor-pointer text-sm font-semibold"
                              style={{
                                background:
                                  "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)",
                                border: "1px solid rgba(239, 68, 68, 0.3)",
                              }}
                            >
                              Remove Item
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right: Summary Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full lg:w-[22rem]"
            >
              <div className="sticky top-24">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5646a3] to-purple-500 rounded-2xl blur-lg opacity-30" />

                {/* Summary Card */}
                <div
                  className="relative rounded-2xl backdrop-blur-xl p-6"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(86, 70, 163, 0.15) 0%, rgba(147, 51, 234, 0.1) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <h3 className="text-xl font-bold mb-6 text-gray-300">
                    Order Summary
                  </h3>

                  {/* Total Amount */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-gray-400 text-sm">Subtotal</span>
                      <span className="text-2xl font-black bg-gradient-to-r from-[#fbf5ea] via-white to-[#fbf5ea] bg-clip-text text-transparent">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Items</span>
                      <span className="text-white font-semibold">{count}</span>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div
                    className="mb-6 p-4 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg mt-0.5">🚚</span>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">
                          Estimated Delivery
                        </p>
                        <p className="text-sm font-bold text-emerald-300">
                          {deliveryDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="mb-6 space-y-2 text-xs">
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">Ship From</span>
                      <span className="text-white font-semibold">Nexcura</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-gray-400">Sold By</span>
                      <span className="text-white font-semibold">Nexcura</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">Payment</span>
                      <span className="text-emerald-300 font-semibold flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Secure
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-6 rounded-xl font-bold text-white cursor-pointer relative overflow-hidden group"
                      onClick={handleProceedToPay}
                      style={{
                        background:
                          "linear-gradient(135deg, #5646a3 0%, #9333ea 100%)",
                        boxShadow: "0 10px 30px rgba(86, 70, 163, 0.5)",
                      }}
                    >
                      <span className="relative z-10">Proceed to Pay</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-6 rounded-xl font-bold text-white cursor-pointer"
                      onClick={handleAddAnotherRing}
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      Add Another Ring
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {loadingCheckout && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 flex items-center justify-center z-50"
              style={{
                background: "rgba(0, 13, 36, 0.85)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="relative">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#5646a3] via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse" />

                {/* Spinner */}
                <div className="relative w-16 h-16 border-4 border-transparent border-t-[#5646a3] border-r-purple-400 rounded-full animate-spin"></div>

                {/* Loading Text */}
                <p className="text-white text-sm font-semibold mt-4 text-center">
                  Processing...
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default CartPage;
