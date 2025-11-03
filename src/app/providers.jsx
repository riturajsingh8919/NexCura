"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkCartExpiration } from "@/redux/features/cart/cartSlice";

// Component to check cart expiration on app load
function CartExpirationChecker({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check cart expiration when app loads
    dispatch(checkCartExpiration());
  }, [dispatch]);

  return children;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CartExpirationChecker>
          {children}
        </CartExpirationChecker>
      </PersistGate>
    </Provider>
  );
}
