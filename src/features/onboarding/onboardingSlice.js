import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { credAndUrl } from "../../utils/config";
import axios from "axios";

export const updateUserProfile = createAsyncThunk(
  "onboarding/updateUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { step1, step2, consent } = getState().onboarding;

      const payload = {
        ...step1,
        ...step2,
        ...consent,
      };

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${credAndUrl.BASE_URL}/user/update-profile`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Something went wrong",
      );
    }
  },
);

const initialState = {
  step1: {
    name: "",
    age: "",
    gender: "",
    bodyWeight: "",
    height: "",
    educationLevel: "",
    occupation: "",
  },

  step2: {
    placeOfResidence: "",
    maritalStatus: "",
    familyType: "",
    livingArrangement: "",
    motherTongue: "",
    mainFocus: "",
  },

  consent: {
    privacy_policy: false,
    ai_consent: false,
  },

  loading: false,
  error: null,
  success: false,
};

const onboardingSlice = createSlice({
  name: "onboarding",

  initialState,

  reducers: {
    saveStep1: (state, action) => {
      state.step1 = action.payload;
    },

    saveStep2: (state, action) => {
      state.step2 = action.payload;
    },

    saveConsent: (state, action) => {
      state.consent = action.payload;
    },

    resetOnboarding: () => initialState,
  },

  extraReducers: (builder) => {
    builder

      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateUserProfile.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { saveStep1, saveStep2, saveConsent, resetOnboarding } =
  onboardingSlice.actions;

export default onboardingSlice.reducer;
