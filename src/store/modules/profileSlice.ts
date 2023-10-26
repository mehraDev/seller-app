import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ISellerProfile } from "app/interfaces";
import { getSellerProfile } from "app/services/Shop";

export const fetchProfile = createAsyncThunk("profile/fetchProfile", async () => {
  const response = await getSellerProfile();
  return response;
});

export type ProfileState = {
  profile: ISellerProfile | null;
  isLoading: boolean;
};

const profileSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    isLoading: false,
  } as ProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const profileReducer = profileSlice.reducer;
