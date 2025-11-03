"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import SmartRingDetails from "@/components/smartRingDetailsPage";

const SmartRingDetailsPage = () => {
  const params = useParams(); 
  const { id } = params; 
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/getProductByProductId`, {
          params: { productId: id },
        });

        const data = res.data;

        setProduct({
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
          colors:data.colors,
          role:data.role
        });
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return <p className="text-white">Product not found</p>;

  return <SmartRingDetails product={product} />;
};

export default SmartRingDetailsPage;
