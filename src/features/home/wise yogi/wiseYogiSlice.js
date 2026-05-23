// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { credAndUrl } from "../../../utils/config";

// // GET Wise Yogi
// export const fetchWiseYogi = createAsyncThunk(
//   "wiseYogi/fetchWiseYogi",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         `${credAndUrl.BASE_URL}/user/wise-yogi?page=1&limit=10&search=`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return res.data.data.wiseYogis; // 👈 adjust if key different
//     } catch (err) {
//       return rejectWithValue(err.response?.data || "Error");
//     }
//   }
// );

// const wiseYogiSlice = createSlice({
//   name: "wiseYogi",
//   initialState: {
//     wiseYogi: [],
//     loading: false,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWiseYogi.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchWiseYogi.fulfilled, (state, action) => {
//         state.loading = false;
//         state.wiseYogi = action.payload;
//       })
//       .addCase(fetchWiseYogi.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export default wiseYogiSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../../utils/config";

export const getWiseYogiRecommendations = createAsyncThunk(
  "wiseYogi/getRecommendations",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${credAndUrl.BASE_URL}/user/wise-yogi/recommendation`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

// =======================
// MARK EXERCISE DONE
// =======================

export const markExerciseDone = createAsyncThunk(
  "wiseYogi/markExerciseDone",
  async ({ recommendationId, exerciseId, done }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${credAndUrl.BASE_URL}/user/wise-yogi/recommendation/${recommendationId}/done`,
        {
          exerciseId,
          done,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      return {
        response: response.data,
        recommendationId,
        exerciseId,
        done,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

// =======================
// INITIAL STATE
// =======================

const initialState = {
  recommendations: [],
  loading: false,
  error: null,

  doneLoading: false,
  doneError: null,
};

// =======================
// SLICE
// =======================

const wiseYogiSlice = createSlice({
  name: "wiseYogi",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // =======================
      // GET RECOMMENDATIONS
      // =======================

      .addCase(getWiseYogiRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getWiseYogiRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload;
      })

      .addCase(getWiseYogiRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =======================
      // MARK EXERCISE DONE
      // =======================

      .addCase(markExerciseDone.pending, (state) => {
        state.doneLoading = true;
        state.doneError = null;
      })

      .addCase(markExerciseDone.fulfilled, (state, action) => {
        state.doneLoading = false;

        const { recommendationId, exerciseId, done } = action.payload;

        // Update local state instantly
        const recommendation = state.recommendations?.data?.recommendation;

        if (recommendation?._id === recommendationId) {
          const exercise = recommendation.exercises?.find(
            (ex) => ex.exerciseId === exerciseId,
          );

          if (exercise) {
            exercise.done = done;
          }
        }
        // const recommendation = state.recommendations?.find(
        //   (item) => item._id === recommendationId
        // );

        // if (recommendation?.exercises) {
        //   const exercise = recommendation.exercises.find(
        //     (ex) => ex._id === exerciseId
        //   );

        //   if (exercise) {
        //     exercise.done = done;
        //   }
        // }
      })

      .addCase(markExerciseDone.rejected, (state, action) => {
        state.doneLoading = false;
        state.doneError = action.payload;
      });
  },
});

export default wiseYogiSlice.reducer;
