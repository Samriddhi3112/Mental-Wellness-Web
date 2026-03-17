import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";

// Thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // JWT from login
      const response = await axios.get(
        `${credAndUrl.BASE_URL}/user/get-user-profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Response structure: { code, success, message, data: { user } }
      return response.data.data; // return the 'data' object
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch profile";

      // Optional: if token invalid/expired, remove token
      if (message === "Invalid or expired token") {
        localStorage.removeItem("userToken");
      }

      return rejectWithValue(message);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${credAndUrl.BASE_URL}/user/update-profile`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // API response: { code, success, message, data }
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to update profile";

      if (message === "Invalid or expired token") {
        localStorage.removeItem("token");
      }

      return rejectWithValue(message);
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data;
      })

      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
