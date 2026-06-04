// features/call/callSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";

const BASE = credAndUrl.BASE_URL;

// Helper to get auth header — bookingSlice jaisa "token" key use karta hai
const getHeaders = (isAdmin = false) => {
  const token = isAdmin
    ? localStorage.getItem("adminToken")   // admin ke liye alag key (future use)
    : localStorage.getItem("token");        // user token — bookingSlice wali key
  return { Authorization: `Bearer ${token}` };
};

// ─── Thunks ───────────────────────────────────────────────────────────────────

// GET call info (canJoin, channelName, mode, callStatus, joinWindow)
export const getCallInfo = createAsyncThunk(
  "call/getCallInfo",
  async ({ bookingId, isAdmin = false }, { rejectWithValue }) => {
    try {
      const prefix = isAdmin ? "admin" : "user";
      const res = await axios.get(
        `${BASE}/${prefix}/bookings/${bookingId}/call`,
        { headers: getHeaders(isAdmin) }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// POST generate RTC token
export const generateCallToken = createAsyncThunk(
  "call/generateCallToken",
  async ({ bookingId, isAdmin = false }, { rejectWithValue }) => {
    try {
      const prefix = isAdmin ? "admin" : "user";
      const res = await axios.post(
        `${BASE}/${prefix}/bookings/${bookingId}/call/token`,
        {},
        { headers: getHeaders(isAdmin) }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// POST start call
export const startCall = createAsyncThunk(
  "call/startCall",
  async ({ bookingId, isAdmin = false }, { rejectWithValue }) => {
    try {
      const prefix = isAdmin ? "admin" : "user";
      const res = await axios.post(
        `${BASE}/${prefix}/bookings/${bookingId}/call/start`,
        {},
        { headers: getHeaders(isAdmin) }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// POST end call
export const endCall = createAsyncThunk(
  "call/endCall",
  async ({ bookingId, isAdmin = false }, { rejectWithValue }) => {
    try {
      const prefix = isAdmin ? "admin" : "user";
      const res = await axios.post(
        `${BASE}/${prefix}/bookings/${bookingId}/call/end`,
        {},
        { headers: getHeaders(isAdmin) }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// GET call status (poll karne ke liye)
export const getCallStatus = createAsyncThunk(
  "call/getCallStatus",
  async ({ bookingId, isAdmin = false }, { rejectWithValue }) => {
    try {
      const prefix = isAdmin ? "admin" : "user";
      const res = await axios.get(
        `${BASE}/${prefix}/bookings/${bookingId}/call/status`,
        { headers: getHeaders(isAdmin) }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState = {
  // Call info
  callInfo: null,         // { canJoin, channelName, mode, callStatus, joinWindow, ... }
  callInfoLoading: false,
  callInfoError: null,

  // Token
  tokenData: null,        // { appId, channelName, token, uid, expiresIn, mode }
  tokenLoading: false,
  tokenError: null,

  // Call status
  callStatus: null,       // "not_started" | "in_progress" | "ended"
  callStatusLoading: false,

  // Active call state (local UI state managed via actions)
  isInCall: false,
  isMuted: false,
  isVideoOff: false,
  remoteUsers: [],        // [{ uid, hasVideo, hasAudio }]

  // Current booking ID being called
  activeBookingId: null,

  // Errors
  error: null,
};

const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    // Set active booking
    setActiveBooking(state, action) {
      state.activeBookingId = action.payload;
    },

    // Agora local state
    setInCall(state, action) {
      state.isInCall = action.payload;
    },
    toggleMute(state) {
      state.isMuted = !state.isMuted;
    },
    toggleVideo(state) {
      state.isVideoOff = !state.isVideoOff;
    },

    // Remote users (from Agora SDK callbacks)
    addRemoteUser(state, action) {
      const exists = state.remoteUsers.find((u) => u.uid === action.payload.uid);
      if (!exists) state.remoteUsers.push(action.payload);
    },
    removeRemoteUser(state, action) {
      state.remoteUsers = state.remoteUsers.filter(
        (u) => u.uid !== action.payload
      );
    },
    updateRemoteUser(state, action) {
      const idx = state.remoteUsers.findIndex(
        (u) => u.uid === action.payload.uid
      );
      if (idx !== -1) state.remoteUsers[idx] = { ...state.remoteUsers[idx], ...action.payload };
    },

    // Clear token (on leave)
    clearTokenData(state) {
      state.tokenData = null;
      state.tokenError = null;
    },

    // Reset full call state
    resetCallState(state) {
      return { ...initialState };
    },

    clearCallError(state) {
      state.error = null;
      state.tokenError = null;
      state.callInfoError = null;
    },
  },
  extraReducers: (builder) => {
    // getCallInfo
    builder
      .addCase(getCallInfo.pending, (state) => {
        state.callInfoLoading = true;
        state.callInfoError = null;
      })
      .addCase(getCallInfo.fulfilled, (state, action) => {
        state.callInfoLoading = false;
        // API returns nested under data or directly
        state.callInfo = action.payload.data || action.payload;
      })
      .addCase(getCallInfo.rejected, (state, action) => {
        state.callInfoLoading = false;
        state.callInfoError = action.payload?.message || "Failed to get call info";
      });

    // generateCallToken
    builder
      .addCase(generateCallToken.pending, (state) => {
        state.tokenLoading = true;
        state.tokenError = null;
      })
      .addCase(generateCallToken.fulfilled, (state, action) => {
        state.tokenLoading = false;
        state.tokenData = action.payload.data || action.payload;
      })
      .addCase(generateCallToken.rejected, (state, action) => {
        state.tokenLoading = false;
        state.tokenError = action.payload?.message || "Token generation failed";
      });

    // startCall
    builder
      .addCase(startCall.fulfilled, (state) => {
        state.callStatus = "in_progress";
        if (state.callInfo) state.callInfo.callStatus = "in_progress";
      });

    // endCall
    builder
      .addCase(endCall.fulfilled, (state) => {
        state.callStatus = "ended";
        state.isInCall = false;
        if (state.callInfo) state.callInfo.callStatus = "ended";
      });

    // getCallStatus
    builder
      .addCase(getCallStatus.pending, (state) => {
        state.callStatusLoading = true;
      })
      .addCase(getCallStatus.fulfilled, (state, action) => {
        state.callStatusLoading = false;
        const d = action.payload.data || action.payload;
        state.callStatus = d.callStatus;
      })
      .addCase(getCallStatus.rejected, (state) => {
        state.callStatusLoading = false;
      });
  },
});

export const {
  setActiveBooking,
  setInCall,
  toggleMute,
  toggleVideo,
  addRemoteUser,
  removeRemoteUser,
  updateRemoteUser,
  clearTokenData,
  resetCallState,
  clearCallError,
} = callSlice.actions;

export default callSlice.reducer;