import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_APP_BASE_URL;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail");

    if (!userEmail) {
      return Response.json({ error: "userEmail is required" }, { status: 400 });
    }

    console.log("🔄 Proxy: Fetching user details for:", userEmail);

    // Try getCartByEmail first (may contain user and dependent info)
    let backendURL = `${API_URL}/user/getCartByEmail?userEmail=${encodeURIComponent(
      userEmail
    )}`;
    console.log("🔄 Proxy: Trying getCartByEmail endpoint:", backendURL);

    try {
      const response = await axios.get(backendURL, {
        timeout: 10000,
      });

      console.log("✅ Proxy: User details fetched from getCartByEmail");
      console.log("✅ Proxy: Response data:", response.data);

      return Response.json(response.data, {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (cartError) {
      console.log("⚠️ getCartByEmail failed, trying getDependantDetails...");

      // Fallback to getDependantDetails
      backendURL = `${API_URL}/user/getDependantDetails?userEmail=${encodeURIComponent(
        userEmail
      )}`;
      console.log("🔄 Proxy: Backend URL:", backendURL);

      const response = await axios.get(backendURL, {
        timeout: 10000,
      });

      console.log("✅ Proxy: User details fetched from getDependantDetails");
      console.log("✅ Proxy: Response data:", response.data);

      return Response.json(response.data, {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("❌ Proxy: Error fetching user details:", error.message);
    console.error("❌ Proxy: Error response:", error.response?.data);
    console.error("❌ Proxy: Error status:", error.response?.status);

    return Response.json(
      {
        error: error.response?.data?.error || error.message,
        errorType: error.response?.data?.errorType || "ServerError",
      },
      {
        status: error.response?.status || 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
