import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../../utils/config";

// ─────────────────────────────────────────────────────────────
// FETCH JOURNALS
// ─────────────────────────────────────────────────────────────
export const fetchJournals = createAsyncThunk(
  "secretJournal/fetchJournals",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${credAndUrl.BASE_URL}/user/journals?page=1&limit=10&search=`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data.journals;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

// ─────────────────────────────────────────────────────────────
// ADD JOURNAL
// ─────────────────────────────────────────────────────────────
export const addJournal = createAsyncThunk(
  "secretJournal/addJournal",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${credAndUrl.BASE_URL}/user/journals`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

// ─────────────────────────────────────────────────────────────
// DELETE JOURNAL
// ─────────────────────────────────────────────────────────────
export const deleteJournal = createAsyncThunk(
  "secretJournal/deleteJournal",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${credAndUrl.BASE_URL}/user/journals/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

// ─────────────────────────────────────────────────────────────
// SLICE
// ─────────────────────────────────────────────────────────────
const secretJournalSlice = createSlice({
  name: "secretJournal",

  initialState: {
    entries: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchJournals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJournals.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
      })
      .addCase(fetchJournals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addJournal.pending, (state) => {
        state.loading = true;
      })
      .addCase(addJournal.fulfilled, (state, action) => {
        state.loading = false;
        state.entries.unshift(action.payload);
      })
      .addCase(addJournal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteJournal.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJournal.fulfilled, (state, action) => {
        state.loading = false;

        state.entries = state.entries.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteJournal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default secretJournalSlice.reducer;