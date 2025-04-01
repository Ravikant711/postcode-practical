import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_COLLECTIONDAY_URL;

export const addressCollectionAPI = async (postData) => {
  try {
    const response = await axios.post(API_URL, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error in API call:", error);
    throw error.response?.data?.message || "An error occurred"; 
  }
};

export const fetchAddressCollection = createAsyncThunk(
  "addressCollection/fetchAddressCollection",
  async (postData, { rejectWithValue }) => {
    try {
      return await addressCollectionAPI(postData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);