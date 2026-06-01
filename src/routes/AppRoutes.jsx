import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import { useSelector } from "react-redux";
import Login from "../pages/Login/Login";
import OTPVerify from "../pages/OTPVerify/OTPVerify";
import ProtectedRoutes from "./ProtectedRoutes";
import HereToHelp from "../pages/HereToHelp/HereToHelp";
import TermsOfServices from "../pages/Conditions/TermsOfServices";
import PrivacyPolicy from "../pages/Conditions/PrivacyPolicy";
import Step1 from "../pages/OnboardingSteps/Step1";
import Step2 from "../pages/OnboardingSteps/Step2";
import Step3 from "../pages/OnboardingSteps/Step3";
import Screen1 from "../pages/OnboardingQuestionsScreens/screen1";
import Home from "../pages/Home/home";
import SettingOptions from "../pages/Settings/settingOptions";
import FaqPage from "../pages/Conditions/FaqPage";
import ProfileDetail from "../pages/Profile/profileDetail";
import GuestSettingOptions from "../pages/Settings/GuestSettingOptions";
import LoginPrivacy from "../pages/Conditions/LoginPrivacy";
import LoginTermsOfServices from "../pages/Conditions/LoginTermsOfServices";
import Language from "../pages/Profile/language";
import GetMindfulGames from "../pages/Home/Mindful Games/GetMindfulGames";
import MoviesHome from "../pages/Home/Movies/MoviesHome";
import MoviesDetail from "../pages/Home/Movies/MoviesDetail";
import CalmMusicListing from "../pages/Home/Calm Music/CalmMusicListing";
import WiseYogiListing from "../pages/Home/Wise Yogi/WiseYogiListing";
import WiseYogiDetail from "../pages/Home/Wise Yogi/WiseYogiDetail";
import Step4ThanksForSharing from "../pages/OnboardingSteps/Step4ThanksForSharing";
import ChatSidebar from "../pages/Home/Chat/ChatSidebar";
import ChatHomeScreen from "../pages/Home/Chat/ChatHomeScreen";
import ChatToText from "../pages/Home/Chat/ChatToText";
import Step5Language from "../pages/OnboardingSteps/Step5Language";
import ChatToVoice from "../pages/Home/Chat/ChatToVoice";
import ChatHistory from "../pages/Home/Chat/ChatHistory";
import TherapySessionUI from "../pages/Consultation Booking/SereneApp";
import SereneApp from "../pages/Consultation Booking/SereneApp";
import SelectSlot from "../pages/Consultation Booking/SelectSlot";
import MyConsultations from "../pages/Consultation Booking/MyConsultations";
import BookingDetails from "../pages/Consultation Booking/BookingDetails";
import SecretJournal from "../pages/Home/Secret Journal/SecretJournal";
// import MemoryGame from "../pages/Home/Mindful Games/MemoryGame";
// import BreathingGame from "../pages/Home/Mindful Games/BreathingGames";

const AppRoutes = () => {
  const { jwtToken } = useSelector((state) => state.auth);
  const isGuest = !jwtToken;
  // const isGuest = localStorage.getItem("isGuest") === "true";
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otpVerify" element={<OTPVerify />} />
      <Route path="/hereToHelp" element={<HereToHelp />} />

      <Route path="/onboarding1" element={<Step1 />} />
      <Route path="/onboarding2" element={<Step2 />} />
      <Route path="/onboarding3" element={<Step3 />} />
      <Route path="/screen1" element={<Screen1 />} />
      <Route path="/step-4" element={<Step4ThanksForSharing />} />
      <Route path="/step-language" element={<Step5Language />} />
      <Route path="/guest-settings/loginPrivacy" element={<LoginPrivacy />} />
      <Route
        path="/guest-settings/loginTermsOfServices"
        element={<LoginTermsOfServices />}
      />
      <Route path="/guest-settings" element={<GuestSettingOptions />} />
      <Route path="/here-to-help" element={<HereToHelp />} />
      {/* <Route path="/therapy-session" element={<SereneApp />} />
      <Route path="/select-slot" element={<SelectSlot />} />
      <Route path="/my-consultation" element={<MyConsultations />} />
      <Route path="/booking-details" element={<BookingDetails />} /> */}

      <Route element={<ProtectedRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          {/* <Route
            path="/settingOption"
            element={isGuest ? <GuestSettingOptions /> : <SettingOptions />}
          /> */}

          <Route path="/settingOption" element={<SettingOptions />} />
          <Route
            path="/settingOption/termsOfServices"
            element={<TermsOfServices />}
          />
          <Route
            path="/settingOption/privacyPolicy"
            element={<PrivacyPolicy />}
          />
          <Route path="/settingOption/faq" element={<FaqPage />} />
          <Route
            path="/settingOption/profileDetail"
            element={<ProfileDetail />}
          />
          <Route path="/settingOption/language" element={<Language />} />
          <Route path="/home/mindfulGames" element={<GetMindfulGames />} />
          <Route path="/home/moviesHome" element={<MoviesHome />} />
          <Route path="/home/musicHome" element={<CalmMusicListing />} />
          <Route path="/home/wiseYogi" element={<WiseYogiListing />} />
          <Route
            path="/home/moviesHome/moviesDetail"
            element={<MoviesDetail />}
          />
          <Route
            path="/home/wiseyogiHome/wiseyogiDetail"
            element={<WiseYogiDetail />}
          />
          {/* <Route path="/chat-home" element={<ChatHomeScreen />} /> */}
          {/* <Route path="/chat-text" element={<ChatToText />} /> */}
          <Route path="/chat-sidebar" element={<ChatSidebar />} />
          <Route path="/chat" element={<ChatHomeScreen />} />
          <Route path="/chat-text/:chatId" element={<ChatToText />} />
          <Route path="/chat-voice/:chatId" element={<ChatToVoice />} />
          <Route path="/chat-history/:chatId" element={<ChatHistory />} />
          {/* <Route path="/therapy-session" element={<SereneApp />} />
          <Route path="/select-slot" element={<SelectSlot />} />
          <Route path="/my-consultation" element={<MyConsultations />} />
          <Route path="/booking-details" element={<BookingDetails />} /> */}
          <Route path="/home/secret-journal" element={<SecretJournal />} />
          {/* <Route path="/home/memory-game" element={<MemoryGame />} />
          <Route path="/home/breathing-game" element={<BreathingGame />} /> */}
          <Route path="/therapy-session" element={<SereneApp />} />
          <Route path="/select-slot" element={<SelectSlot />} />
          <Route path="/my-consultation" element={<MyConsultations />} />
          <Route path="/booking-details/:id" element={<BookingDetails />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
