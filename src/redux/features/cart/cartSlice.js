import { createSlice, nanoid } from "@reduxjs/toolkit";

// Helper function to check if cart has expired (24 hours)
const isCartExpired = (lastUpdated) => {
  if (!lastUpdated) return false;
  const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  return Date.now() - lastUpdated > twentyFourHours;
};

const initialState = {
  items: [],
  count: 0,
  lastUpdated: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existing = state.items.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
      );

      state.items.push({
        ...product,
        qty: product.qty || 1,
        cartItemId: nanoid(), 
      });

      state.count = state.items.reduce((acc, item) => acc + item.qty, 0);
      state.lastUpdated = Date.now();
    },

    updateQuantity: (state, action) => {
      const { cartItemId, qty } = action.payload;
      const item = state.items.find((i) => i.cartItemId === cartItemId);
      if (item && qty > 0) {
        item.qty = qty;
      }

      state.count = state.items.reduce((acc, item) => acc + item.qty, 0);
      state.lastUpdated = Date.now();
    },

    removeItem: (state, action) => {
      const { cartItemId } = action.payload;
      state.items = state.items.filter((item) => item.cartItemId !== cartItemId);
      state.count = state.items.reduce((acc, item) => acc + item.qty, 0);
      state.lastUpdated = Date.now();
    },

    clearCart: (state) => {
      console.log("🧹 Clearing cart...");
      state.items = [];
      state.count = 0;
      state.lastUpdated = null;
    },

    checkCartExpiration: (state) => {
      if (isCartExpired(state.lastUpdated)) {
        console.log("🕒 Cart expired, clearing...");
        state.items = [];
        state.count = 0;
        state.lastUpdated = null;
      }
    },
  },
});

export const { addToCart, updateQuantity, removeItem, clearCart, checkCartExpiration } =
  cartSlice.actions;
export default cartSlice.reducer;
