"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../redux/features/cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { GiSmartphone } from "react-icons/gi";
import axios from "axios";

const SmartRingDetails = ({ product }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(8);
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
  const [showPreorderDialog, setShowPreorderDialog] = useState(false);
  const [preorderCode, setPreorderCode] = useState("");
  const [error, setError] = useState("");
  const [soldOutMessage, setSoldOutMessage] = useState("");
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    // First show preorder dialog
    setShowPreorderDialog(true);
  };

  const handlePreorderSubmit = async (e) => {
    e.preventDefault();

    if (!preorderCode.trim()) {
      setError("Preorder code is required");
      return;
    }

    try {
      setError("");

      const res = await axios.get(`${apiBaseUrl}/getRingPreorderCode`);

      if (res.data?.code && res.data.code === preorderCode.trim()) {
        // Valid code - add to cart
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
          setPendingProduct(productPayload);
          setShowPreorderDialog(false);
          setShowConfirm(true);
        } else {
          dispatch(addToCart(productPayload));
          setShowPreorderDialog(false);
          // Show success message or redirect
          router.push("/cart");
        }
      } else {
        setError("Invalid preorder code. Please try again.");
      }
    } catch (err) {
      console.error("Error validating preorder code:", err);
      setError("Something went wrong. Please try again later.");
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
      <div className="bg-gradient-to-b from-[#000d24] via-[#001233] to-[#000d24] text-white py-20 md:py-28 relative outfit-font">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#5646a3] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob" />
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#585462] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />

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
                backgroundColor: "rgba(86, 70, 163, 0.2)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <a
                href="/NxRing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </a>
              <FaAngleRight className="text-gray-500 text-xs" />
              <a
                href="/products"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Products
              </a>
              <FaAngleRight className="text-gray-500 text-xs" />
              <span className="text-white font-medium">Details</span>
            </div>
          </motion.div>{" "}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
            {/* Image Gallery Section - Premium Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <div className="w-full max-w-lg mx-auto lg:mx-0">
                {/* Main Image with Glassmorphism */}
                <div className="group relative overflow-hidden rounded-3xl mb-6 shadow-2xl bg-white">
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
                        {/* <div className="absolute inset-0 bg-[#5646a3] opacity-20 rounded-full blur-2xl" /> */}

                        <Image
                          src={images[selectedIndex]}
                          alt={currentProduct.title}
                          width={400}
                          height={400}
                          className="object-contain max-h-full relative z-10"
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
                        backgroundColor: "rgba(86, 70, 163, 0.9)",
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
                        backgroundColor: "rgba(86, 70, 163, 0.9)",
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
                        background: "rgba(255, 255, 255, 0.9)",
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
                          className="absolute inset-0 bg-[#5646a3] opacity-10"
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
              className="lg:col-span-1"
            >
              <div className="space-y-6">
                {/* Product Title */}
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl md:text-4xl font-medium text-[#fbf5ea] leading-tight"
                >
                  Buy NxRing
                </motion.h1>

                {/* Price Section with Premium Styling */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl md:text-5xl font-normal text-[#fbf5ea]">
                      {currentProduct.price}
                    </span>
                    {currentProduct.oldPrice && (
                      <span className="text-2xl text-[#aeacaf] line-through font-medium">
                        {currentProduct.oldPrice}
                      </span>
                    )}
                  </div>
                </motion.div>

                {/* Preorder Delivery Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="p-4 rounded-xl"
                  style={{
                    backgroundColor: "rgba(86, 70, 163, 0.15)",
                    border: "1px solid rgba(86, 70, 163, 0.3)",
                  }}
                >
                  <p className="text-sm text-[#fbf5ea] font-medium">
                    Preorders ship late December 2025. Exact delivery dates will
                    be confirmed via email.
                  </p>
                </motion.div>
                {currentProduct.type !== "sizingKit" && (
                  <>
                    {/* Color Selection */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        Select Color: {/* Color sold out message */}
                        {soldOutMessage &&
                          (soldOutMessage.includes("Silver") ||
                            soldOutMessage.includes("Gold")) && (
                            <motion.span
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-sm text-white font-medium"
                            >
                              {soldOutMessage}
                            </motion.span>
                          )}
                      </h3>

                      <div className="flex flex-wrap gap-3">
                        {currentProduct.colors?.map((color, index) => {
                          // Define sold out colors
                          const isSoldOut =
                            color.name.toLowerCase().includes("silver") ||
                            color.name.toLowerCase() === "gold";

                          return (
                            <motion.button
                              key={color.productId}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 * index }}
                              whileHover={
                                !isSoldOut ? { scale: 1.05, y: -2 } : {}
                              }
                              whileTap={!isSoldOut ? { scale: 0.95 } : {}}
                              onClick={() => {
                                if (isSoldOut) {
                                  setSoldOutMessage(
                                    `${color.name} of size ${selectedSize} is currently out of stock`
                                  );
                                  setTimeout(() => setSoldOutMessage(""), 3000);
                                } else {
                                  handleColorSelect(color);
                                  setSoldOutMessage("");
                                }
                              }}
                              className={`relative px-6 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer
                              } ${
                                selectedColor === color.name
                                  ? "text-white"
                                  : "text-gray-300"
                              }`}
                              style={
                                selectedColor === color.name
                                  ? {
                                      backgroundColor: "#5646a3",
                                      boxShadow:
                                        "0 10px 30px rgba(86, 70, 163, 0.6)",
                                      border:
                                        "1px solid rgba(255, 255, 255, 0.2)",
                                    }
                                  : {
                                      backgroundColor: "rgba(86, 70, 163, 0.1)",
                                      border:
                                        "1px solid rgba(255, 255, 255, 0.2)",
                                    }
                              }
                            >
                              {color.name}
                              {isSoldOut && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-full h-0.5 bg-[#585462]" />
                                </div>
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
                        Size:{" "}
                        {soldOutMessage && soldOutMessage.includes("Size") ? (
                          <span className="text-lg text-white font-medium">
                            {soldOutMessage}
                          </span>
                        ) : (
                          <span className="text-lg text-white">
                            {selectedSize}
                          </span>
                        )}
                      </h3>
                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                        {(currentProduct.sizes || []).map((size, index) => {
                          const isSoldOut = size === 6;
                          return (
                            <motion.button
                              key={size}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.05 * index }}
                              whileHover={
                                !isSoldOut ? { scale: 1.1, y: -3 } : {}
                              }
                              whileTap={!isSoldOut ? { scale: 0.9 } : {}}
                              onClick={() => {
                                if (isSoldOut) {
                                  setSoldOutMessage(
                                    `Size ${size} of ${selectedColor} not available`
                                  );
                                  setTimeout(() => setSoldOutMessage(""), 3000);
                                } else {
                                  setSelectedSize(size);
                                  setSoldOutMessage("");
                                }
                              }}
                              className={`relative aspect-square rounded-xl font-bold text-lg transition-all duration-300 cursor-pointer
                              } ${
                                selectedSize === size
                                  ? "text-white"
                                  : "text-gray-300"
                              }`}
                              style={
                                selectedSize === size
                                  ? {
                                      backgroundColor: "#5646a3",
                                      boxShadow:
                                        "0 8px 20px rgba(86, 70, 163, 0.4)",
                                      border:
                                        "2px solid rgba(255, 255, 255, 0.3)",
                                    }
                                  : {
                                      backgroundColor: "rgba(86, 70, 163, 0.1)",
                                      border:
                                        "1px solid rgba(255, 255, 255, 0.2)",
                                    }
                              }
                            >
                              {size}
                              {isSoldOut && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-full h-0.5 bg-[#585462]" />
                                </div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>

                    <p className="text-sm text-gray-300 my-4">
                      Don’t know your ring size?{" "}
                      <button
                        onClick={() => setIsOpen(true)}
                        className="text-[#fbf5ea] text-[1rem] cursor-pointer font-semibold underline"
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

                    {/* Add to Cart Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleOrderNow}
                      className="w-full py-4 px-6 rounded-xl font-bold text-lg text-white relative overflow-hidden cursor-pointer group mt-6"
                      style={{
                        backgroundColor: "#5646a3",
                        boxShadow: "0 8px 20px rgba(86, 70, 163, 0.4)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-[#585462] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                      <span className="relative z-10 flex items-center justify-center gap-2">
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

                    {/* What's Included Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-bold text-white">
                        What's Included
                      </h3>
                      <div
                        className="p-6 rounded-2xl space-y-3"
                        style={{
                          backgroundColor: "rgba(86, 70, 163, 0.1)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        {[
                          "NxRing",
                          "Charging Case",
                          "One year subscription to NexCura Health Platform",
                        ].map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0 + idx * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="flex-shrink-0">
                              <FaCheckCircle className="text-[#5646a3] text-lg" />
                            </div>
                            <p className="text-gray-200 text-base">{item}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
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
                  <div className="absolute -inset-1 bg-[#5646a3] rounded-3xl blur-xl opacity-50" />

                  {/* Dialog Content */}
                  <div
                    className="relative rounded-3xl p-8 text-center"
                    style={{
                      background: "rgba(255, 255, 255, 0.98)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
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
                        className="px-6 py-3 rounded-xl font-bold text-white cursor-pointer"
                        style={{
                          backgroundColor: "#5646a3",
                          boxShadow: "0 8px 20px rgba(86, 70, 163, 0.4)",
                        }}
                      >
                        Confirm
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={cancelAdd}
                        className="px-6 py-3 rounded-xl font-bold cursor-pointer"
                        style={{
                          backgroundColor: "rgba(86, 70, 163, 0.1)",
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
          {/* Preorder Code Dialog */}
          <AnimatePresence>
            {showPreorderDialog && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
                style={{
                  background: "rgba(0, 13, 36, 0.85)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="relative w-full max-w-md"
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-[#5646a3] rounded-3xl blur-xl opacity-50" />

                  {/* Dialog Content */}
                  <div
                    className="relative rounded-3xl p-8 md:p-10"
                    style={{
                      background: "rgba(255, 255, 255, 0.98)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    {/* Close Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowPreorderDialog(false)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor: "rgba(86, 70, 163, 0.1)",
                        border: "1px solid rgba(86, 70, 163, 0.2)",
                      }}
                    >
                      <span className="text-2xl font-bold text-[#5646a3]">
                        ×
                      </span>
                    </motion.button>

                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="flex justify-center mb-6"
                    >
                      <div
                        className="p-4 rounded-2xl"
                        style={{
                          backgroundColor: "#5646a3",
                          boxShadow: "0 10px 30px rgba(86, 70, 163, 0.4)",
                        }}
                      >
                        <GiSmartphone className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl md:text-3xl font-black text-center mb-3 text-[#5646a3]"
                    >
                      Enter Pre-Order Code
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-center text-gray-700 mb-6 text-base"
                    >
                      Enter the code to proceed with your smart ring pre-order.
                    </motion.p>

                    {/* Form */}
                    <form onSubmit={handlePreorderSubmit} className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <input
                          type="text"
                          value={preorderCode}
                          onChange={(e) => setPreorderCode(e.target.value)}
                          placeholder="Enter your pre-order code"
                          className="w-full px-6 py-4 rounded-2xl text-gray-900 font-medium focus:outline-none focus:ring-2 transition-all duration-300"
                          style={{
                            background: "rgba(255, 255, 255, 0.8)",
                            border: "2px solid rgba(86, 70, 163, 0.2)",
                            boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.05)",
                          }}
                          autoFocus
                        />
                      </motion.div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-4 rounded-xl"
                          style={{
                            backgroundColor: "rgba(239, 68, 68, 0.1)",
                            border: "1px solid rgba(239, 68, 68, 0.2)",
                          }}
                        >
                          <p className="text-red-600 text-sm font-medium text-center">
                            {error}
                          </p>
                        </motion.div>
                      )}

                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-4 px-8 rounded-2xl font-bold text-lg text-white relative overflow-hidden group cursor-pointer"
                        style={{
                          backgroundColor: "#5646a3",
                          boxShadow: "0 10px 30px rgba(86, 70, 163, 0.4)",
                        }}
                      >
                        <span className="relative z-10">Proceed</span>
                        <div className="absolute inset-0 bg-[#585462] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.button>
                    </form>

                    {/* Additional Info */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="text-center text-sm text-gray-600 mt-6"
                    >
                      Don't have a code?{" "}
                      <a
                        href="/NxRing"
                        className="text-[#5646a3] font-bold hover:underline"
                      >
                        Go back
                      </a>
                    </motion.p>
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
