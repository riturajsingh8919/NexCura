import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearCart } from "../cart/cartSlice";
import { signIn, signOut } from "@/components/cognitoServices";

// Initial state
const initialState = {
  loggedInUser: {},
  isLoggedIn: false,
  loading: false,
  error: null,
  email: "",
  guid: "",
  initial: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    const { email, password } = data;
    console.log("🔄 Redux Login Thunk started for:", email);
    try {
      const user = await signIn(email, password);
      console.log("📦 Cognito SignIn returned:", user);

      const guid = user?.username || "";
      const tokens = user?.signInUserSession?.idToken?.jwtToken || null;

      if (typeof window !== "undefined") {
        const initial = email.charAt(0).toUpperCase();
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userInitial", initial);

        const returnData = { email, initial, guid, token: tokens };
        console.log("✅ Redux Login Success - Returning:", returnData);
        return returnData;
      }

      const returnData = { email, guid, initial: "" };
      console.log(
        "✅ Redux Login Success (no window) - Returning:",
        returnData
      );
      return returnData;
    } catch (error) {
      console.error("❌ Redux Login Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { email } = getState().auth;

      await signOut(email);

      if (typeof window !== "undefined") {
        // Clear auth-related data but preserve cart
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userInitial");
        localStorage.removeItem("persist:auth");
        localStorage.removeItem("persist:user");
        sessionStorage.clear();
        // Note: Cart data is preserved in localStorage
      }

      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refresh: (state, action) => {
      state.isLoggedIn = true;
      state.loggedInUser = action.payload.user;
      state.email = action.payload.email;
      state.initial = action.payload.initial;
      state.guid = action.payload.guid;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.loggedInUser = {
        email: action.payload.email,
        guid: action.payload.guid,
      };
      state.email = action.payload.email;
      state.initial = action.payload.initial;
      state.guid = action.payload.guid;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.loggedInUser = {};
      state.isLoggedIn = false;
      state.error = action.payload || action.error.message;
      state.email = "";
      state.guid = "";
      state.initial = "";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loggedInUser = {};
      state.isLoggedIn = false;
      state.email = "";
      state.initial = "";
      state.guid = "";
      state.loading = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload || action.error.message;
      state.loading = false;
    });
  },
});

export const { refresh, clearError } = authSlice.actions;
export default authSlice.reducer;
