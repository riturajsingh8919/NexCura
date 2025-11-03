import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_APP_BASE_URL;
const apiEndPoint = `${API_URL}/user/createUser`;

export const createUser = async (payload) => {
  const encodedURI = window.encodeURI(apiEndPoint);
  let status;
  await axios
    .post(encodedURI, payload)
    .then((response) => {
      status = response.status;
    })
    .catch((error) => {
      console.error("Error posting contact us form", error);
    });
  return status;
};
