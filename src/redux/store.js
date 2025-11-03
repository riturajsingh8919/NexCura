"use client"; // must be a client module

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";

// persist config
const authPersistReducer = persistReducer({ key: "auth", storage }, authReducer);
const cartPersistReducer = persistReducer({ key: "cart", storage }, cartReducer);
const userPersistReducer = persistReducer({ key: "user", storage }, userReducer);

export const store = configureStore({
  reducer: {
    auth: authPersistReducer,
    cart: cartPersistReducer,
    user: userPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/FLUSH",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// ⚠️ Lazy initialize persistor only on client
export let persistor;
if (typeof window !== "undefined") {
  persistor = persistStore(store);
}
