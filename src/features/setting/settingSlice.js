import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";

const initialState = {
  privacyPolicy: null,
  termsConditions: null,
  loading: false,
  error: null,
};

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `${credAndUrl.BASE_URL}/user/delete-account`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // PRIVACY POLICY
      .addCase(getPrivacyPolicy.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPrivacyPolicy.fulfilled, (state, action) => {
        state.loading = false;
        state.privacyPolicy = action.payload;
      })
      .addCase(getPrivacyPolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // TERMS & CONDITIONS
      .addCase(getTermsConditions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTermsConditions.fulfilled, (state, action) => {
        state.loading = false;
        state.termsConditions = action.payload;
      })
      .addCase(getTermsConditions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pagesSlice.reducer;
