import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSellerUserName } from "app/services/Shop";

export const fetchSellerUsername = createAsyncThunk("seller/fetchSellerUsername", async () => {
  try {
    const username = await getSellerUserName();
    return username;
  } catch (error) {
    throw new Error("Failed to fetch seller username");
  }
});

const sellerSlice = createSlice({
  name: "sellerRoot",
  initialState: {
    username: "",
    isLoading: false,
    error: null as string | null, // Initialize error as null or string
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerUsername.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error when pending
      })
      .addCase(fetchSellerUsername.fulfilled, (state, action) => {
        state.isLoading = false;
        state.username = action.payload || ""; // Handle possible null value
      })
      .addCase(fetchSellerUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const sellerRootReducer = sellerSlice.reducer;
