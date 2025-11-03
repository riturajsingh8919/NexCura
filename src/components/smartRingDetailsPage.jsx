"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaMinus,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../redux/features/cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { BsShieldCheck, BsLightning, BsDiamond } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import axios from "axios";

const SmartRingDetails = ({ product }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(6);
  const [selectedColor, setSelectedColor] = useState(
    product.detailsType || "Black"
  );
  const [selectedRole, setSelectedRole] = useState("Self");
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("about"); // New state for tabs

  // State for current color's product data
  const [currentProduct, setCurrentProduct] = useState(product);
  const images = currentProduct.images || [];

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handlePrev = () => {
    setSelectedIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const handleNext = () => {
    setSelectedIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleOrderNow = () => {
    const existing = items.find(
      (item) =>
        item.id === currentProduct.id &&
        item.size === selectedSize &&
        item.color === currentProduct.detailsType
    );

    const productPayload = {
      id: currentProduct.id,
      productDetails: currentProduct.title,
      color: currentProduct.detailsType,
      productCurrentAmount: currentProduct.productCurrentAmount,
      deliveryDate: currentProduct.deliveryDate,
      productImages: currentProduct.images,
      size: selectedSize,
      qty: quantity,
      role: selectedRole,
    };

    if (existing) {
      setPendingProduct(productPayload); // ✅ now well-shaped
      setShowConfirm(true);
    } else {
      dispatch(addToCart(productPayload));
      router.push("/cart");
    }
  };
  const confirmAdd = () => {
    if (pendingProduct) {
      dispatch(addToCart(pendingProduct));
      router.push("/cart");
      setPendingProduct(null);
    }
    setShowConfirm(false);
  };

  const cancelAdd = () => {
    setPendingProduct(null);
    setShowConfirm(false);
  };

  const handleColorSelect = async (color) => {
    setSelectedColor(color.name);
    if (color.productId) {
      try {
        // Fetch the new product data for the selected color
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await axios.get(`${apiBaseUrl}/getProductByProductId`, {
          params: { productId: color.productId },
        });

        const data = res.data;
        const newProduct = {
          id: data.productId,
          title: data.productDetails,
          price: `${data.currencySymbol}${data.productCurrentAmount}`,
          oldPrice: `${data.currencySymbol}${data.productOldAmount}`,
          delivery: `Approximate delivery expected by ${data.deliveryDate}`,
          detailsType: data.productColor,
          images: data.productImages,
          sizes: data.productSizes,
          specifications: data.specifications,
          aboutThisItem: data.aboutThisItem,
          type: data.type,
          productCurrentAmount: data.productCurrentAmount,
          name: data.name,
          deliveryDate: data.deliveryDate,
          colors: data.colors,
          role: data.role,
        };

        // Update the current product state
        setCurrentProduct(newProduct);
        setSelectedIndex(0); // Reset to first image
      } catch (error) {
        console.error("Error fetching product for selected color:", error);
      }
    }
  };

  const handleQuantity = (newQty) => {
    const existing = items.find(
      (item) =>
        item.id === currentProduct.id &&
        // item.size===selectedSize&&
        item.color === currentProduct.detailsType
    );

    if (existing) {
      dispatch(
        updateQuantity({
          id: currentProduct.id,
          color: currentProduct.detailsType,
          qty: newQty,
        })
      );
    }
  };

  return (
    <>
      <div className="bg-gradient-to-b from-[#000d24] via-[#001233] to-[#000d24] text-white py-20 md:py-28 relative">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#5646a3] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob" />
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />

        <div className="container mx-auto relative z-10">
          {/* Premium Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 px-4 sm:px-6 lg:px-8"
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
                NexCura Smart Ring
              </a>
              <FaAngleRight className="text-gray-500 text-xs" />
              <span className="text-white font-medium">Details</span>
            </div>
          </motion.div>{" "}
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-12 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
            {/* Image Gallery Section - Premium Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1 xl:col-span-4"
            >
              <div className="w-full max-w-lg mx-auto lg:mx-0">
                {/* Main Image with Glassmorphism */}
                <div
                  className="group relative overflow-hidden rounded-3xl mb-6 shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(251, 245, 234, 0.95) 100%)",
                    backdropFilter: "blur(20px)",
                    boxShadow:
                      "0 25px 70px rgba(86, 70, 163, 0.25), inset 0 1px 0 rgba(255, 255, 255, 1)",
                    border: "1px solid rgba(255, 255, 255, 0.6)",
                  }}
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#5646a3] via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-1000" />

                  <div className="relative aspect-square flex items-center justify-center p-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedIndex}
                        initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                        transition={{
                          duration: 0.6,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                        className="relative w-full h-full flex items-center justify-center"
                      >
                        {/* Glow Effect Behind Image */}
                        <div className="absolute inset-0 bg-gradient-radial from-[#5646a3]/20 via-transparent to-transparent rounded-full blur-2xl" />

                        <Image
                          src={images[selectedIndex]}
                          alt={currentProduct.title}
                          width={400}
                          height={400}
                          className="object-contain max-h-full drop-shadow-2xl relative z-10"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Premium Navigation Buttons */}
                    <motion.button
                      whileHover={{ scale: 1.1, x: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 z-20 cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(86, 70, 163, 0.9) 0%, rgba(147, 51, 234, 0.9) 100%)",
                        boxShadow: "0 8px 20px rgba(86, 70, 163, 0.4)",
                      }}
                    >
                      <FaChevronLeft className="text-white text-lg" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1, x: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 z-20 cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(86, 70, 163, 0.9) 0%, rgba(147, 51, 234, 0.9) 100%)",
                        boxShadow: "0 8px 20px rgba(86, 70, 163, 0.4)",
                      }}
                    >
                      <FaChevronRight className="text-white text-lg" />
                    </motion.button>
                  </div>
                </div>

                {/* Premium Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-3">
                  {images.map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      onClick={() => setSelectedIndex(idx)}
                      className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                        selectedIndex === idx ? "ring-4 ring-[#5646a3]" : ""
                      }`}
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(251, 245, 234, 0.8) 100%)",
                        backdropFilter: "blur(10px)",
                        border:
                          selectedIndex === idx
                            ? "2px solid #5646a3"
                            : "1px solid rgba(255, 255, 255, 0.3)",
                        boxShadow:
                          selectedIndex === idx
                            ? "0 8px 20px rgba(86, 70, 163, 0.4)"
                            : "0 4px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="aspect-square p-2 flex items-center justify-center">
                        <Image
                          src={img}
                          alt={`thumb-${idx}`}
                          width={80}
                          height={80}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      {selectedIndex === idx && (
                        <motion.div
                          layoutId="activeThumb"
                          className="absolute inset-0 bg-gradient-to-br from-[#5646a3]/10 to-purple-500/10"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Product Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-1 xl:col-span-5"
            >
              <div className="space-y-6">
                {/* Product Title */}
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#fbf5ea] via-white to-[#fbf5ea] bg-clip-text text-transparent leading-tight"
                >
                  {currentProduct.title}
                </motion.h1>

                {/* Price Section with Premium Styling */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#5646a3] to-purple-400 bg-clip-text text-transparent">
                      {currentProduct.price}
                    </span>
                    {currentProduct.oldPrice && (
                      <span className="text-2xl text-gray-400 line-through font-medium">
                        {currentProduct.oldPrice}
                      </span>
                    )}
                  </div>
                </motion.div>
                {currentProduct.type !== "sizingKit" && (
                  <>
                    {/* Delivery Info */}
                    {currentProduct.delivery && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="p-4 rounded-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                        }}
                      >
                        <p className="text-sm text-gray-200 font-medium">
                          🚚 {currentProduct.delivery}
                        </p>
                      </motion.div>
                    )}

                    {/* Color Selection */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-bold text-white">
                        Select Color:
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {currentProduct.colors?.map((color, index) => {
                          // Determine color-specific gradients
                          const getColorGradient = (colorName) => {
                            const name = colorName.toLowerCase();

                            // Check for Matte Black specifically
                            if (name.includes("black")) {
                              return {
                                active:
                                  "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
                                shadow: "0 10px 30px rgba(0, 0, 0, 0.8)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                              };
                            }

                            // Check for Matte Silver specifically
                            if (
                              name.includes("silver") ||
                              name.includes("matte")
                            ) {
                              return {
                                active:
                                  "linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)",
                                shadow: "0 10px 30px rgba(156, 163, 175, 0.7)",
                                border: "1px solid rgba(229, 231, 235, 0.5)",
                                color: "#000000",
                              };
                            }

                            // Gold/Rose Gold
                            if (
                              name.includes("gold") ||
                              name.includes("rose")
                            ) {
                              return {
                                active:
                                  "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                                shadow: "0 10px 30px rgba(245, 158, 11, 0.7)",
                                border: "1px solid rgba(251, 191, 36, 0.5)",
                              };
                            }

                            // Sterling Silver
                            if (name.includes("sterling")) {
                              return {
                                active:
                                  "linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)",
                                shadow: "0 10px 30px rgba(209, 213, 219, 0.6)",
                                border: "1px solid rgba(209, 213, 219, 0.4)",
                              };
                            }

                            // Default purple
                            return {
                              active:
                                "linear-gradient(135deg, #5646a3 0%, #9333ea 100%)",
                              shadow: "0 10px 30px rgba(86, 70, 163, 0.6)",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                            };
                          };

                          const colorStyle = getColorGradient(color.name);

                          // Determine text color based on selection
                          const getTextColor = (colorName) => {
                            const name = colorName.toLowerCase();
                            if (
                              name.includes("silver") &&
                              name.includes("matte")
                            ) {
                              return "text-gray-900"; // Dark text only for Matte Silver
                            }
                            return "text-white"; // White text for all other colors
                          };

                          return (
                            <motion.button
                              key={color.productId}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 * index }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleColorSelect(color)}
                              className={`relative px-6 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer ${
                                selectedColor === color.name
                                  ? getTextColor(color.name)
                                  : "text-gray-300"
                              }`}
                              style={
                                selectedColor === color.name
                                  ? {
                                      background: colorStyle.active,
                                      boxShadow: colorStyle.shadow,
                                      border: colorStyle.border,
                                    }
                                  : {
                                      background:
                                        "linear-gradient(135deg, rgba(86, 70, 163, 0.1) 0%, rgba(86, 70, 163, 0.05) 100%)",
                                      border:
                                        "1px solid rgba(255, 255, 255, 0.2)",
                                    }
                              }
                            >
                              {color.name}
                              {selectedColor === color.name && (
                                <motion.div
                                  layoutId="selectedColor"
                                  className="absolute inset-0 rounded-xl"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)",
                                  }}
                                />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* Size Selection */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-bold text-white">
                        Selected Size:{" "}
                        <span className="text-4xl text-[#9f8cff]">
                          {selectedSize}
                        </span>
                      </h3>
                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                        {(currentProduct.sizes || []).map((size, index) => (
                          <motion.button
                            key={size}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.05 * index }}
                            whileHover={{ scale: 1.1, y: -3 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedSize(size)}
                            className={`aspect-square rounded-xl font-bold text-lg transition-all duration-300 cursor-pointer ${
                              selectedSize === size
                                ? "text-white"
                                : "text-gray-300"
                            }`}
                            style={
                              selectedSize === size
                                ? {
                                    background:
                                      "linear-gradient(135deg, #5646a3 0%, #9333ea 100%)",
                                    boxShadow:
                                      "0 8px 20px rgba(86, 70, 163, 0.4)",
                                    border:
                                      "2px solid rgba(255, 255, 255, 0.3)",
                                  }
                                : {
                                    background:
                                      "linear-gradient(135deg, rgba(86, 70, 163, 0.1) 0%, rgba(86, 70, 163, 0.05) 100%)",
                                    border:
                                      "1px solid rgba(255, 255, 255, 0.2)",
                                  }
                            }
                          >
                            {size}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                    <p className="text-sm text-gray-300 my-4">
                      Don’t know your ring size?{" "}
                      <button
                        onClick={() => setIsOpen(true)}
                        className="text-pink-400 text-[1rem] cursor-pointer font-semibold underline"
                      >
                        Click here
                      </button>
                    </p>
                    {isOpen && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm bg-black/30">
                        <div className="bg-white rounded-lg shadow-lg w-[95%] md:w-[800px] lg:w-[900px] relative p-8">
                          {/* Close Button */}
                          <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 w-10 text-black text-xl hover:bg-gray-100 rounded-full"
                          >
                            ×
                          </button>

                          <h2 className="text-xl font-semibold mb-6 text-black">
                            How to measure your ring size?
                          </h2>

                          <Image
                            src="/Smart-Ring-Measurement-Chart-new.png"
                            alt="Ring Size Guide"
                            width={800}
                            height={600}
                            className="rounded-2xl border border-grey-900 w-full h-auto"
                          />
                        </div>
                      </div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-bold text-white">
                        Select Role:
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {currentProduct.role?.map((role, index) => (
                          <motion.button
                            key={role}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.05 * index }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedRole(role)}
                            className={`relative px-8 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer ${
                              selectedRole === role
                                ? "text-white"
                                : "text-gray-300"
                            }`}
                            style={
                              selectedRole === role
                                ? {
                                    background:
                                      "linear-gradient(135deg, #6C1B7A 0%, #9333ea 100%)",
                                    boxShadow:
                                      "0 10px 30px rgba(108, 27, 122, 0.5)",
                                    border:
                                      "1px solid rgba(255, 255, 255, 0.2)",
                                  }
                                : {
                                    background:
                                      "linear-gradient(135deg, rgba(108, 27, 122, 0.1) 0%, rgba(108, 27, 122, 0.05) 100%)",
                                    border:
                                      "1px solid rgba(255, 255, 255, 0.2)",
                                  }
                            }
                          >
                            {role}
                            {selectedRole === role && (
                              <motion.div
                                layoutId="selectedRole"
                                className="absolute inset-0 rounded-xl"
                                style={{
                                  background:
                                    "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)",
                                }}
                              />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Premium Tabs Section - About & Specifications */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="mt-8"
                >
                  {/* Tab Headers */}
                  <div className="flex gap-2 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab("about")}
                      className={`flex-1 py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        activeTab === "about" ? "text-white" : "text-gray-400"
                      }`}
                      style={
                        activeTab === "about"
                          ? {
                              background:
                                "linear-gradient(135deg, #5646a3 0%, #9333ea 100%)",
                              boxShadow: "0 8px 25px rgba(86, 70, 163, 0.5)",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                            }
                          : {
                              background:
                                "linear-gradient(135deg, rgba(86, 70, 163, 0.1) 0%, rgba(86, 70, 163, 0.05) 100%)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                            }
                      }
                    >
                      <FaInfoCircle className="text-lg" />
                      About this item
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab("specifications")}
                      className={`flex-1 py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        activeTab === "specifications"
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                      style={
                        activeTab === "specifications"
                          ? {
                              background:
                                "linear-gradient(135deg, #5646a3 0%, #9333ea 100%)",
                              boxShadow: "0 8px 25px rgba(86, 70, 163, 0.5)",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                            }
                          : {
                              background:
                                "linear-gradient(135deg, rgba(86, 70, 163, 0.1) 0%, rgba(86, 70, 163, 0.05) 100%)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                            }
                      }
                    >
                      <BsDiamond className="text-lg" />
                      Specifications
                    </motion.button>
                  </div>

                  {/* Tab Content */}
                  <AnimatePresence mode="wait">
                    {activeTab === "about" && (
                      <motion.div
                        key="about"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 rounded-3xl"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(86, 70, 163, 0.1) 0%, rgba(86, 70, 163, 0.05) 100%)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div className="space-y-4">
                          {Object.entries(currentProduct.aboutThisItem).map(
                            ([key, value], index) => (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-4 group"
                              >
                                <div className="flex-shrink-0 mt-1">
                                  <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, #5646a3 0%, #9333ea 100%)",
                                      boxShadow:
                                        "0 4px 15px rgba(86, 70, 163, 0.3)",
                                    }}
                                  >
                                    <FaCheckCircle className="text-white text-lg" />
                                  </div>
                                </div>
                                <p className="text-gray-200 text-base leading-relaxed pt-2 group-hover:text-white transition-colors">
                                  {value}
                                </p>
                              </motion.div>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "specifications" &&
                      currentProduct?.specifications && (
                        <motion.div
                          key="specifications"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="p-6 rounded-3xl"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(86, 70, 163, 0.1) 0%, rgba(86, 70, 163, 0.05) 100%)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          <div className="space-y-4">
                            {Object.entries(currentProduct.specifications).map(
                              ([key, value], index) => (
                                <motion.div
                                  key={key}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-start gap-4 group"
                                >
                                  <div className="flex-shrink-0 mt-1">
                                    <div
                                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                                      style={{
                                        background:
                                          "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                        boxShadow:
                                          "0 4px 15px rgba(16, 185, 129, 0.3)",
                                      }}
                                    >
                                      <HiSparkles className="text-white text-lg" />
                                    </div>
                                  </div>
                                  <p className="text-gray-200 text-base leading-relaxed pt-2 group-hover:text-white transition-colors">
                                    {value}
                                  </p>
                                </motion.div>
                              )
                            )}
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>

            {/* Sticky Sidebar - Premium Cart Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-1 xl:col-span-3"
            >
              <div className="lg:sticky lg:top-20 lg:self-start space-y-4">
                {/* Main Price Card */}
                <div
                  className="group relative rounded-3xl overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                    backdropFilter: "blur(30px)",
                    boxShadow:
                      "0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                >
                  {/* Animated Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5646a3] via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-1000" />

                  <div className="relative p-6 lg:p-8 space-y-6">
                    {/* Price Display with Badge */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">
                          Price
                        </span>
                        <div
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            background:
                              "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                            color: "white",
                          }}
                        >
                          {currentProduct.oldPrice && (
                            <>
                              SAVE{" "}
                              {Math.round(
                                ((parseFloat(
                                  currentProduct.oldPrice.replace(
                                    /[^0-9.-]+/g,
                                    ""
                                  )
                                ) -
                                  parseFloat(
                                    currentProduct.price.replace(
                                      /[^0-9.-]+/g,
                                      ""
                                    )
                                  )) /
                                  parseFloat(
                                    currentProduct.oldPrice.replace(
                                      /[^0-9.-]+/g,
                                      ""
                                    )
                                  )) *
                                  100
                              )}
                              %
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#fbf5ea] via-white to-[#fbf5ea] bg-clip-text text-transparent">
                          {currentProduct.price}
                        </span>
                      </div>
                      {currentProduct.oldPrice && (
                        <div className="flex items-center gap-2">
                          <p className="text-xl text-gray-500 line-through font-medium">
                            {currentProduct.oldPrice}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Add to Cart Button - Premium 3D Design */}
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleOrderNow}
                      className="w-full py-4 px-6 rounded-xl font-bold text-lg text-white relative overflow-hidden cursor-pointer group"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #5646a3 0%, #9333ea 50%, #7c3aed 100%)",
                        boxShadow:
                          "0 10px 30px rgba(86, 70, 163, 0.6), " +
                          "0 20px 60px rgba(147, 51, 234, 0.4), " +
                          "inset 0 1px 0 rgba(255, 255, 255, 0.2), " +
                          "inset 0 -8px 20px rgba(0, 0, 0, 0.3)",
                        border: "1px solid rgba(124, 58, 237, 0.5)",
                        transform: "translateZ(0)",
                      }}
                    >
                      {/* 3D Light Reflection */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-50"
                        style={{
                          backgroundImage:
                            "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%, rgba(0, 0, 0, 0.2) 100%)",
                        }}
                      />

                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          backgroundImage:
                            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)",
                        }}
                        animate={{
                          x: ["-200%", "200%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-pink-400/30 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <HiSparkles className="text-lg drop-shadow-lg" />
                        </motion.div>
                        <span className="tracking-wide drop-shadow-lg">
                          Add To Cart
                        </span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="text-xl"
                        >
                          →
                        </motion.div>
                      </span>
                    </motion.button>

                    {/* Trust Badges with Icons */}
                    <div className="space-y-3 pt-4 border-t border-gray-700/30">
                      {[
                        {
                          Icon: BsShieldCheck,
                          text: "Secure Payment",
                          color: "#10b981",
                        },
                        {
                          Icon: BsLightning,
                          text: "Fast Delivery",
                          color: "#f59e0b",
                        },
                        {
                          Icon: BsDiamond,
                          text: "Premium Quality",
                          color: "#8b5cf6",
                        },
                      ].map((badge, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-center gap-3 text-gray-300 group/badge cursor-default"
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover/badge:scale-110"
                            style={{
                              background: `linear-gradient(135deg, ${badge.color}20 0%, ${badge.color}10 100%)`,
                              border: `1px solid ${badge.color}40`,
                            }}
                          >
                            <badge.Icon
                              className="text-base"
                              style={{ color: badge.color }}
                            />
                          </div>
                          <span className="text-sm font-medium tracking-wide">
                            {badge.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Confirmation Dialog - Premium */}
          <AnimatePresence>
            {showConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center z-50 px-4"
                style={{
                  background: "rgba(0, 13, 36, 0.85)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="relative w-full max-w-md"
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#5646a3] via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50" />

                  {/* Dialog Content */}
                  <div
                    className="relative rounded-3xl p-8 text-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(251, 245, 234, 0.95) 100%)",
                      backdropFilter: "blur(20px)",
                      boxShadow:
                        "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 1)",
                    }}
                  >
                    <h3 className="text-xl font-black text-[#5646a3] mb-4">
                      Item Already in Cart
                    </h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Your cart contains a ring with similar features.
                      <br />
                      Do you want to add another?
                    </p>
                    <div className="flex gap-4 justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={confirmAdd}
                        className="px-6 py-3 rounded-xl font-bold text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, #5646a3 0%, #9333ea 100%)",
                          boxShadow: "0 8px 20px rgba(86, 70, 163, 0.4)",
                        }}
                      >
                        Confirm
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={cancelAdd}
                        className="px-6 py-3 rounded-xl font-bold"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(86, 70, 163, 0.1) 0%, rgba(86, 70, 163, 0.05) 100%)",
                          border: "1px solid rgba(86, 70, 163, 0.2)",
                          color: "#5646a3",
                        }}
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default SmartRingDetails;
