import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import pagesReducer from "../features/services/serviceSlice"
import onboardingReducer from "../features/onboarding/onboardingSlice"
import questionsReducer from "../features/onboardingQuestions/questionsSlice"
import faqReducer from "../features/setting/faqSlice";
import profileReducer from "../features/setting/profileSlice";
import serviceReducer from "../features/services/serviceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    pages: pagesReducer,
    onboarding: onboardingReducer,
    questions: questionsReducer, 
    faq: faqReducer,
    profile: profileReducer,
    services: serviceReducer,
  },
});

export default store;
