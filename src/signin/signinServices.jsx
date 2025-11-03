import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_APP_BASE_URL;
export const getUserByEmail = async (email) => {
  const apiEndPoint = `${API_URL}/user/getUserWeb?userEmail=${email}`;
  const encodedURI = encodeURI(apiEndPoint);

  try {
    const response = await axios.get(encodedURI);
    return response.data; 
  } catch (error) {
    console.error("Error fetching user data by email:", error);
    throw error; 
  }
};
