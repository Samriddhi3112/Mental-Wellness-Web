import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";
import { isLoggedIn } from "../../utils/utils";

const initialState = {
  user: null,
  jwtToken: null,
  loading: false,
  error: null,
};

export const checkUserExists = createAsyncThunk(
  "auth/checkUserExists",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${credAndUrl.BASE_URL}/user/check-user-exists`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

// Verify OTP API Call
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${credAndUrl.BASE_URL}/user/verify-otp`,
        data,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${credAndUrl.BASE_URL}/user/validate-otp-and-register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${credAndUrl.BASE_URL}/user/user-login`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${credAndUrl.BASE_URL}/user/check-user-exists`,
        payload,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to resend OTP",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const response = await axios.post(
        `${credAndUrl.BASE_URL}/user/user-logout`,
        {
          userId: userId,
        },
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload?.data?.user;
      state.jwtToken = action.payload.token;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userData", action.payload.user);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.user = action.payload?.userData;
        state.jwtToken = action.payload?.token;

        if (action.payload?.token) {
          localStorage.setItem("token", action.payload.token);
        }

        if (action.payload?.userData?._id) {
          localStorage.setItem("userId", action.payload.userData._id);
        }
        if (action.payload?.data?.user?.name) {
          localStorage.setItem("userName", action.payload.data.user.name);
        }

        // 👇 IMPORTANT (header fix)
        localStorage.setItem(
          "userData",
          JSON.stringify(action.payload.data.user),
        );
      })
      // .addCase(verifyOTP.fulfilled, (state, action) => {
      //   state.jwtToken = action.payload.token;
      //   localStorage.setItem("token", action.payload.token);
      // })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload?.userData;
        state.jwtToken = action.payload?.token;

        if (action.payload?.token) {
          localStorage.setItem("token", action.payload.token);
        }

        if (action.payload?.userData?._id) {
          localStorage.setItem("userId", action.payload.userData._id);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload?.data?.user;
        state.jwtToken = action.payload?.data?.token;

        if (action.payload?.data?.token) {
          localStorage.setItem("token", action.payload.data.token);
        }

        if (action.payload?.data?.user?._id) {
          localStorage.setItem("userId", action.payload.data.user._id);
        }
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.jwtToken = null;

        localStorage.removeItem("token");
        localStorage.removeItem("userData");
      })

      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;

        // even if API fails we still logout locally
        state.user = null;
        state.jwtToken = null;

        localStorage.removeItem("token");
        localStorage.removeItem("UserData");
      });
  },
});

export default authSlice.reducer;
