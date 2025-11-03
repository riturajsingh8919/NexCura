'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { FaAngleRight } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";


const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
useEffect(() => {
  const fetchOrders = async () => {
    if (typeof window !== "undefined") {
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        setOrders([]); 
        setLoading(false);
        return;
      }

        try {
          const res = await axios.get(
            `${apiBaseUrl}/getAllProductOrders`,
            { params: { userEmail } }
          );

          const data = Array.isArray(res.data) ? res.data : [];
          setOrders(data);
        } catch (error) {
          console.error("Error fetching orders:", error);
          setOrders([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, []);

  const hasOrders = Array.isArray(orders) && orders.length > 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-purple-800 to-blue-900">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-blue-900 px-4 sm:px-8 md:px-16 lg:px-24 py-12 md:py-20">
      {/* Breadcrumb */}
      <div className="text-white text-sm mb-6 flex flex-wrap items-center gap-2">
        <a href="/" className="text-white">Home</a>
        <FaAngleRight className="inline text-white" />
        <span className="cursor-pointer hover:underline">My Orders</span>
      </div>

      {hasOrders ? (
        <div className="space-y-6">
          {orders.map((order) =>
            order.cartItems.map((item, idx) => (
              <div
                key={`${order.productOrderId}-${idx}`}
                className="bg-gradient-to-r from-purple-800 bg-dark-blue/30 p-6 rounded-xl shadow-md flex flex-col sm:flex-row gap-6 sm:gap-12 items-stretch"
              >
                {/* Product Image */}
                <div className="flex-shrink-0 w-full sm:w-[213px] bg-white rounded-lg flex items-center justify-center">
                  <Image
                    src={item.productImage}
                    alt={item.name}
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col text-white flex-1">
                  <h2 className="font-semibold text-lg">{item.productDetails}</h2>
                  <p className="mt-4 text-[1rem] font-semibold">Order Status :</p>

                  <div className="space-y-2 text-[1rem] mt-2">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <span className="font-medium w-40">Order ID</span>
                      <span>{order.productOrderId}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <span className="font-medium w-40">Order Price</span>
                      <span>${item.orderPrice}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <span className="font-medium w-40">Size</span>
                      <span>{item.productSize}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <span className="font-medium w-40">Quantity</span>
                      <span>{item.qty}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <span className="font-medium w-40">Order Placed Date</span>
                      <span>
                        {new Date(order.orderPlacedDate * 1000).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <span className="font-medium w-40">Ship To</span>
                      <span className="break-words">
                        {order.shippingAddress.line1}, {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}, {order.shippingAddress.postal_code},{" "}
                        {order.shippingAddress.country}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <span className="font-medium w-40">Delivery Date</span>
                      <span>
                        Approximate delivery expected by {item.deliveryDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        // No Orders Screen
        <div className="flex flex-col items-center justify-center text-gray-300 mt-16 sm:mt-20 text-center">
          <Image
            src="/images/Cart-Icon.png"
            alt="No Orders"
            width={75}
            height={70}
            className="mb-6"
          />
          <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
          <p className="text-gray-300 mb-6">You haven’t placed any orders yet.</p>
          <button
            className="bg-purple py-2 px-6 rounded-full transition cursor-pointer"
            onClick={() => router.push("/smart-ring")}
          >
            Buy Now
          </button>
        </div>
      )}

      {hasOrders && (
        <p className="text-white text-center mt-10 text-sm">
          Once the product is shipped, you will receive a notification at your
          registered email address.
        </p>
      )}
    </div>
  );
};

export default MyOrders;
