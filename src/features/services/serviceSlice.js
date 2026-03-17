import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";

const initialState = {
  privacyPolicy: null,
  termsConditions: null,
  loading: false,
  error: null,
};

export const getPrivacyPolicy = createAsyncThunk(
  "pages/getPrivacyPolicy",
  async (_, { rejectWithValue }) => {
    try {

      const response = await axios.get(
        `${credAndUrl.BASE_URL}/pages/privacy`
      );

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch privacy policy"
      );
    }
  }
);

export const getTermsConditions = createAsyncThunk(
  "pages/getTermsConditions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${credAndUrl.BASE_URL}/pages/terms`,
      );

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch terms and conditions"
      );
    }
  }
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