import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { credAndUrl } from "../../utils/config";

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  loading: false,
};

export const getOnboardingQuestions = createAsyncThunk(
  "questions/getOnboardingQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${credAndUrl.BASE_URL}/admin/onboarding-questions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("API RESPONSE:", res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const submitAnswers = createAsyncThunk(
  "questions/submitAnswers",
  async (allResponses, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${credAndUrl.BASE_URL}/user/onboarding-answers`,
        {
          responses: allResponses,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState,

  reducers: {
    resetQuestionIndex: (state) => {
      state.currentQuestionIndex = 0;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },

    prevQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOnboardingQuestions.pending, (state) => {
        state.loading = true;
      })

      .addCase(getOnboardingQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.data;
      })

      .addCase(getOnboardingQuestions.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { nextQuestion, prevQuestion, resetQuestionIndex  } = questionsSlice.actions;

export default questionsSlice.reducer;
