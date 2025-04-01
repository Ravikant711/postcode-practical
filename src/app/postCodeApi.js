import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_ADDRESS_URL;

export const postCodeAPI = async (postData) => {
  try {
    const response = await axios.post(API_URL, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error) {
    throw error.response?.data?.message; 
  }
};

export const fetchPostCode = createAsyncThunk("postCode/fetchPostCode", async (postData, { rejectWithValue }) => {
  try {
    return await postCodeAPI(postData);
  } catch (error) {
    return rejectWithValue(error); 
  }
});