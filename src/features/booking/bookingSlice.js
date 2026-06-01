import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";

// Book Slot
export const bookSlot = createAsyncThunk(
  "booking/bookSlot",
  async ({ slotId, dateUtc, mode, durationMinutes }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${credAndUrl.BASE_URL}/user/bookings`,
        {
          slotId,
          dateUtc,
          mode,
          durationMinutes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to book slot",
      );
    }
  },
);

// Get My Bookings
export const getMyBookings = createAsyncThunk(
  "booking/getMyBookings",
  async ({ page = 1, limit = 20 }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${credAndUrl.BASE_URL}/user/bookings?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data?.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch bookings",
      );
    }
  },
);

// Get Booking By Id
export const getBookingById = createAsyncThunk(
  "booking/getBookingById",
  async (bookingId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${credAndUrl.BASE_URL}/user/bookings/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data?.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch booking details",
      );
    }
  },
);

// Cancel Booking
export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async ({ bookingId, cancellationReason }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${credAndUrl.BASE_URL}/user/bookings/${bookingId}/cancel`,
        {
          cancellationReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to cancel booking",
      );
    }
  },
);

// Get Booking Summary
export const getBookingSummary = createAsyncThunk(
  "booking/getBookingSummary",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${credAndUrl.BASE_URL}/user/bookings/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data?.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch booking summary",
      );
    }
  },
);

//available slots
export const getAvailableSlots = createAsyncThunk(
  "booking/getAvailableSlots",
  async ({ dateUtc, durationMinutes }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${credAndUrl.BASE_URL}/user/slots/available?dateUtc=${dateUtc}&durationMinutes=${durationMinutes}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      // slotsByDate[0].slots return karo us date ke liye
      return response.data?.data?.slotsByDate?.[0]?.slots || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to fetch slots",
      );
    }
  },
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    availableSlots: [],
    
    slotsLoading: false,
    bookingDetails: null,
      summary: { upcoming: 0, completed: 0, cancelled: 0, total: 0, loading: false },

    loading: false,
    detailsLoading: false,
    summaryLoading: false,
    cancelLoading: false,
    bookingLoading: false,

    cancelSuccess: false,
    bookingSuccess: false,

    error: null,
  },

  reducers: {
    resetBookingState: (state) => {
      state.cancelSuccess = false;
      state.bookingSuccess = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      //Book Slot
      // Book Slot
      .addCase(bookSlot.pending, (state) => {
        state.bookingLoading = true;
        state.bookingSuccess = false;
        state.error = null;
      })
      .addCase(bookSlot.fulfilled, (state, action) => {
        state.bookingLoading = false;
        state.bookingSuccess = true;

        // agar API booked booking return karti hai
        state.bookingDetails = action.payload?.data || null;
      })
      .addCase(bookSlot.rejected, (state, action) => {
        state.bookingLoading = false;
        state.bookingSuccess = false;
        state.error = action.payload;
      })

      // Get My Bookings
      .addCase(getMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Booking By Id
      .addCase(getBookingById.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.bookingDetails = action.payload;
      })
      .addCase(getBookingById.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload;
      })

      // Cancel Booking
      .addCase(cancelBooking.pending, (state) => {
        state.cancelLoading = true;
        state.cancelSuccess = false;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state) => {
        state.cancelLoading = false;
        state.cancelSuccess = true;
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.cancelLoading = false;
        state.cancelSuccess = false;
        state.error = action.payload;
      })

      // Get Summary
      .addCase(getBookingSummary.pending, (state) => {
        state.summary.loading = true;
      })
      .addCase(getBookingSummary.fulfilled, (state, action) => {
        state.summary.loading = false;
        state.summary.upcoming = action.payload.upcoming;
        state.summary.completed = action.payload.completed;
        state.summary.cancelled = action.payload.cancelled;
        state.summary.total = action.payload.total;
      })
      .addCase(getBookingSummary.rejected, (state) => {
        state.summary.loading = false;
      })

      //Available Slots
      .addCase(getAvailableSlots.pending, (state) => {
        state.slotsLoading = true;
        state.availableSlots = [];
        state.error = null;
      })
      .addCase(getAvailableSlots.fulfilled, (state, action) => {
        state.slotsLoading = false;
        state.availableSlots = action.payload;
      })
      .addCase(getAvailableSlots.rejected, (state, action) => {
        state.slotsLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
