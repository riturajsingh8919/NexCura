import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_APP_BASE_URL;

// Use Next.js API proxy to avoid CORS issues until backend enables CORS
const USE_PROXY = true; // Set to false once CORS is enabled on backend API Gateway

const apiEndPoint = USE_PROXY
  ? "/api/createUser" // Next.js API route (no CORS issues)
  : `${API_URL}/user/createUser`; // Direct backend call

console.log("🔧 SignupServices config:");
console.log("  - USE_PROXY:", USE_PROXY);
console.log("  - API Endpoint:", apiEndPoint);
console.log("  - Backend URL:", API_URL);

// Health check function to test API connectivity
export const checkAPIHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`, { timeout: 5000 });
    return response.status === 200;
  } catch (error) {
    console.warn("❌ API health check failed:", error.message);
    return false;
  }
};

export const createUser = async (payload) => {
  try {
    console.log("🔄 Creating user with payload:", payload);
    console.log("🔄 API endpoint:", apiEndPoint);
    console.log("🔄 Using proxy:", USE_PROXY);

    const response = await axios.post(apiEndPoint, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000, // 10 second timeout
    });

    console.log("✅ User creation response:", response);
    console.log("✅ User creation status:", response.status);
    console.log("✅ User creation data:", response.data);

    // Return status code for success responses (200-299 range)
    if (response.status >= 200 && response.status < 300) {
      return response.status;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("❌ Error creating user:", error);
    console.error("❌ Error response:", error.response?.data);
    console.error("❌ Error status:", error.response?.status);
    console.error("❌ Error message:", error.message);
    console.error("❌ Error code:", error.code);
    console.error("❌ Error config:", error.config?.url);

    // Handle specific network errors
    if (error.code === "NETWORK_ERROR" || error.message === "Network Error") {
      console.error(
        "🚨 CORS ERROR: The backend API is not configured to accept requests from the browser."
      );
      console.error(
        "📋 ACTION REQUIRED: Configure CORS on AWS API Gateway at:"
      );
      console.error(
        "   https://gxovntlla3.execute-api.us-east-2.amazonaws.com/Dev"
      );
      console.error("   Required CORS headers:");
      console.error("   - Access-Control-Allow-Origin: * (or your domain)");
      console.error("   - Access-Control-Allow-Methods: POST, GET, OPTIONS");
      console.error(
        "   - Access-Control-Allow-Headers: Content-Type, Authorization"
      );
      throw new Error(
        "CORS Error: The backend API is not configured to accept browser requests. Please contact the backend team to enable CORS on the API Gateway."
      );
    } else if (error.code === "ECONNABORTED") {
      throw new Error(
        "Request timed out. The server may be slow or unavailable. Please try again."
      );
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.response?.status) {
      throw new Error(
        `Server error: ${error.response.status} - ${error.response.statusText}`
      );
    } else {
      throw new Error(error.message || "Failed to create user");
    }
  }
};

// Additional utility function to validate dependant emails
export const validateDependantEmails = (dependants) => {
  const emailRegex = /\S+@\S+\.\S+/;
  const errors = [];

  dependants.forEach((dependant, index) => {
    if (dependant.email.trim()) {
      if (!emailRegex.test(dependant.email)) {
        errors.push(`Dependant ${index + 1}: Invalid email format`);
      }
    }
  });

  return errors;
};

// Get user details from backend (including dependents for caregivers)
export const getUserDetails = async (userEmail, authToken = null) => {
  try {
    console.log("🔄 Fetching user details for:", userEmail);

    const endpoint = USE_PROXY
      ? `/api/getUserDetails?userEmail=${encodeURIComponent(userEmail)}`
      : `${API_URL}/user/getDependantDetails?userEmail=${encodeURIComponent(
          userEmail
        )}`;

    // Don't send authorization header as backend doesn't support it yet
    const response = await axios.get(endpoint, {
      timeout: 10000,
    });

    console.log("✅ User details fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching user details:", error);
    console.error("❌ Error response:", error.response?.data);
    return null;
  }
};
