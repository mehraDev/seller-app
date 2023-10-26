import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "app/components/features/ProductManager/services";
import { IProduct } from "app/interfaces";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await getProducts();
  return response;
});

export type ProductsState = {
  list: IProduct[];
  isLoading: boolean;
};

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    isLoading: false,
  } as ProductsState,
  reducers: {
    updateProducts: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        // Handle error if needed
      });
  },
});

export const { updateProducts } = productSlice.actions; // Export the new action

export const productsReducer = productSlice.reducer;
