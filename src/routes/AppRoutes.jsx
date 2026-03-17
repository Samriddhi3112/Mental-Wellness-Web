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
      <Route path="/guest-settings/loginPrivacy" element={<LoginPrivacy />} />
      <Route path="/guest-settings/loginTermsOfServices" element={<LoginTermsOfServices />} />
      <Route path="/guest-settings" element={<GuestSettingOptions />} />

      

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
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
