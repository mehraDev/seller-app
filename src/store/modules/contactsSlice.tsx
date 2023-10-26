import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ISellerContacts } from "app/interfaces";
import { getSellerContacts } from "app/services/Shop";

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
  const response = await getSellerContacts();
  return response;
});

export type ContactState = {
  list: ISellerContacts | null;
  isLoading: boolean;
  error: string | null;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    list: null,
    isLoading: false,
    error: null,
  } as ContactState,
  reducers: {
    updateContacts: (state, action) => {
      state.list = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { updateContacts } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
