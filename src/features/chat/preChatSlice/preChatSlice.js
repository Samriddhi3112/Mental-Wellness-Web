import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://15.206.16.230:7374/api/v1"

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// Helper: user ke age se matching age group code find karo
const getAgeGroupFromAge = (age, ageGroups) => {
  if (!age || !ageGroups?.length) return null;
  return ageGroups.find((g) => {
    const min = g.minAge ?? 0;
    const max = g.maxAge ?? Infinity;
    return age >= min && age <= max;
  }) || null;
};

// Thunks
export const fetchAgeGroups = createAsyncThunk(
  "preChat/fetchAgeGroups",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/pre-chat-questions/age-groups`,
        { headers: getAuthHeader() }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchBotheringOptions = createAsyncThunk(
  "preChat/fetchBotheringOptions",
  async (ageGroup, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/pre-chat-questions/bothering-options`,
        { params: { ageGroup }, headers: getAuthHeader() }
      );
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchQuestionFlow = createAsyncThunk(
  "preChat/fetchQuestionFlow",
  async ({ ageGroup, option }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/pre-chat-questions/question-flow`,
        { params: { ageGroup, option }, headers: getAuthHeader() }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const preChatSlice = createSlice({
  name: "preChat",
  initialState: {
    step: "bothering", // 'bothering' | 'questions'
    ageGroups: [],
    botheringOptions: [],
    questionFlow: [],
    selectedAgeGroup: null,  // auto-set from user.age
    selectedBothering: null,
    answers: {},
    showThankYou: false,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedBothering(state, action) {
      state.selectedBothering = action.payload;
    },
    setAnswer(state, action) {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    goToBothering(state) {
      state.step = "bothering";
      state.answers = {};
    },
    showThankYouModal(state) {
      state.showThankYou = true;
    },
    hideThankYouModal(state) {
      state.showThankYou = false;
    },
    resetPreChat(state) {
      state.step = "bothering";
      state.selectedBothering = null;
      state.questionFlow = [];
      state.answers = {};
      state.showThankYou = false;
    },
  },
  extraReducers: (builder) => {
    // fetchAgeGroups: fetch karo aur user.age se auto-match karo
    builder
      .addCase(fetchAgeGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgeGroups.fulfilled, (state, action) => {
        state.loading = false;
        const groups = action.payload?.data || action.payload || [];
        state.ageGroups = groups;

        // localStorage se user ka age nikalo aur group match karo
        try {
          const userData = JSON.parse(localStorage.getItem("userData") || "{}");
          const userAge = userData?.age;
          if (userAge) {
            const matched = getAgeGroupFromAge(userAge, groups);
            state.selectedAgeGroup = matched || groups[0] || null;
          } else {
            // age nahi mili toh pehla group default
            state.selectedAgeGroup = groups[0] || null;
          }
        } catch {
          state.selectedAgeGroup = groups[0] || null;
        }
      })
      .addCase(fetchAgeGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetchBotheringOptions
    builder
      .addCase(fetchBotheringOptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBotheringOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.botheringOptions = action.payload?.data;
      })
      .addCase(fetchBotheringOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetchQuestionFlow
    builder
      .addCase(fetchQuestionFlow.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestionFlow.fulfilled, (state, action) => {
        state.loading = false;
        state.questionFlow = action.payload?.data || action.payload || [];
        state.step = "questions";
      })
      .addCase(fetchQuestionFlow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedBothering,
  setAnswer,
  goToBothering,
  showThankYouModal,
  hideThankYouModal,
  resetPreChat,
} = preChatSlice.actions;

export default preChatSlice.reducer;