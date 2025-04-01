import { createSlice } from "@reduxjs/toolkit";
import { fetchAddressCollection } from "./addressCollectionApi";

const addressCollectionSlice = createSlice({
  name: "addressCollection",
  initialState: {
    addressCollection: [],
    loading: false, 
    error: null,
  },
  reducers: {
    removeAddressCollection: (state) => {
      state.addressCollection = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddressCollection.fulfilled, (state, action) => {
        state.loading = false,
        state.addressCollection = action.payload.collectionDay
      })
      .addCase(fetchAddressCollection.rejected, (state, action) => {
        state.loading = false,
        state.error = action.error.message;
      })
  } 
})

export const {removeAddressCollection} = addressCollectionSlice.actions
export default addressCollectionSlice.reducer