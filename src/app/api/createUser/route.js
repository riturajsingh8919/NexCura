import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_APP_BASE_URL;

export async function POST(request) {
  try {
    console.log("🔄 Proxy: Received request from browser");

    const body = await request.json();
    console.log("🔄 ========== PROXY REQUEST DETAILS ==========");
    console.log("🔄 Proxy: Forwarding payload to backend:");
    console.log(JSON.stringify(body, null, 2));
    console.log("🔄 Proxy: Payload fields:");
    console.log("  - userEmail:", body.userEmail);
    console.log("  - role:", body.role);
    console.log("  - caregiverEmail:", body.caregiverEmail || "N/A");
    console.log("  - firstSet.userName:", body.firstSet?.userName);
    console.log("🔄 ============================================");

    const backendURL = `${API_URL}/user/createUser`;
    console.log("🔄 Proxy: Backend URL:", backendURL);

    const response = await axios.post(backendURL, body, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    console.log("✅ Proxy: Backend responded successfully:", response.status);
    console.log("✅ ========== BACKEND RESPONSE ==========");
    console.log("✅ Proxy: Response status:", response.status);
    console.log(
      "✅ Proxy: Response data:",
      JSON.stringify(response.data, null, 2)
    );
    console.log("✅ ========================================");

    return Response.json(response.data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("❌ Proxy: Error calling backend:", error.message);
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
