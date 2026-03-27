import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../../utils/config";

// GET MUSIC
export const fetchMusic = createAsyncThunk(
  "music/fetchMusic",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${credAndUrl.BASE_URL}/user/music?page=1&limit=10&search=`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data.music;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

const musicSlice = createSlice({
  name: "music",
  initialState: {
    music: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusic.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMusic.fulfilled, (state, action) => {
        state.loading = false;
        state.music = action.payload;
      })
      .addCase(fetchMusic.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default musicSlice.reducer;