import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";

export const fetchFaqs = createAsyncThunk(
  "faq/fetchFaqs",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.get(`${credAndUrl.BASE_URL}/admin/faqs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Axios automatically parses JSON
      return response.data.data.faqs; // data should contain your FAQs array
    } catch (err) {
      // err.response.data.message is usually where backend error message is
      const message =
        err.response?.data?.message || err.message || "Failed to fetch FAQs";
      return rejectWithValue(message);
    }
  }
);

const faqSlice = createSlice({
  name: "faq",
  initialState: {
    faqs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = action.payload;
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default faqSlice.reducer;