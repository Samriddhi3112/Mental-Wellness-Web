import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import img1 from "../../../assets/images/mindful-one.png";
import img2 from "../../../assets/images/mindful-two.png";
import img3 from "../../../assets/images/mindful-three.png";
import img4 from "../../../assets/images/mindful-four.png";
import img5 from "../../../assets/images/mindful-five.png";

const BASE_URL = "http://15.206.16.230:7374/api/v1";



// 🔹 Open game thunk
export const openGame = createAsyncThunk(
  "games/openGame",
  async (endpoint, { rejectWithValue }) => {
    try {
      const url = `${BASE_URL}${endpoint}`;

      // Direct open (backend redirect karega)
      window.open(url, "_blank");

      return url;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  games: [
    {
      id: 1,
      title: "2048",
      desc: "Classic Puzzle Game",
    //   image: "images/mindful-one.png",
      endpoint: "/games/tap-game",
    },
    {
      id: 2,
      title: "Memory Match",
      desc: "Pairs Game",
    //   image: "images/mindful-two.png",
      endpoint: "/games/memory-game",
    },
    {
      id: 3,
      title: "Breathing",
      desc: "Relaxation Game",
    //   image: "images/mindful-three.png",
      endpoint: "/games/breathing-game",
    },
    {
      id: 4,
      title: "Simple Zen",
      desc: "Drawing Game",
    //   image: "images/mindful-four.png",
      endpoint: "/games/color-flash-game",
    },
    {
      id: 5,
      title: "Block Puzzle",
      desc: "Puzzle Game",
    //   image: "images/mindful-five.png",
      endpoint: "/games/sequence-memory-game",
    },
  ],
  loading: false,
  error: null,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(openGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(openGame.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(openGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default gamesSlice.reducer;