import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultErrorMessage } from "../../../utils/constants";
import { getUserByEmail } from "../../../signin/signinServices";

const API_WEB_URL = process.env.NEXT_PUBLIC_API_WEB_BASE_URL;

// Initial state
const initialState = {
  userData: null,
  email: '',
  profileImage: null,
  loading: false,
  error: null,
  name: null,
  contactStatus: null, 
};

// Async thunk - Fetch user data by email
export const fetchUserDataByEmail = createAsyncThunk("user/fetchUserDataByEmail", async (email, { rejectWithValue }) => {
  try {
    const response = await getUserByEmail(email);
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(defaultErrorMessage);
    }
  }
});

// Define userSlice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserDataByEmail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserDataByEmail.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profileImage = action.payload.profileImage;
      state.userData = action.payload;      
    });
    builder.addCase(fetchUserDataByEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

     
  },
});

// Export reducer
export default userSlice.reducer;
