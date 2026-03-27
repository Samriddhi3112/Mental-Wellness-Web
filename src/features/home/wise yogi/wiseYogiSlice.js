import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../../utils/config";

// GET Wise Yogi
export const fetchWiseYogi = createAsyncThunk(
  "wiseYogi/fetchWiseYogi",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${credAndUrl.BASE_URL}/user/wise-yogi?page=1&limit=10&search=`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data.wiseYogis; // 👈 adjust if key different
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

const wiseYogiSlice = createSlice({
  name: "wiseYogi",
  initialState: {
    wiseYogi: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWiseYogi.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWiseYogi.fulfilled, (state, action) => {
        state.loading = false;
        state.wiseYogi = action.payload;
      })
      .addCase(fetchWiseYogi.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default wiseYogiSlice.reducer;