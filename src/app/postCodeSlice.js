import { createSlice } from "@reduxjs/toolkit";
import { fetchPostCode } from "./postCodeApi";

const postCodeSlice = createSlice({
  name: "postCode",
  initialState: {
    postCode: [],
    loading: false, 
    error: null,
  },
  reducers: {
    removePostCode: (state) => {
      state.postCode = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostCode.fulfilled, (state, action) => {
        state.loading = false,
        state.postCode = action.payload.ADDRESS
      })
      .addCase(fetchPostCode.rejected, (state, action) => {
        state.loading = false,
        state.error = action.error.message;
      })
  }
})

export const {removePostCode} = postCodeSlice.actions
export default postCodeSlice.reducer