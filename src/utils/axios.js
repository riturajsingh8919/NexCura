import Axios from "axios";
// import { store } from "../redux/store";

export const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const axios = Axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// axios.interceptors.request.use((config) => {
//   // Adding token before sending if logged in
//   const user = store.getState().auth.loggedInUser;
//   if (user) {
//     config.headers["Authorization"] = "Bearer " + user.token;
//   } else {
//     config.headers["Authorization"] = null;
//   }
//   return config;
// });

// axios.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const prevReq = err?.config;
//   }
// );

export { axios };