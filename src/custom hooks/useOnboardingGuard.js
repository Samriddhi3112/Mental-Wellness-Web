import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useOnboardingGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // user login nahi hai

    const lastShown = localStorage.getItem("onboarding_last_shown");

    const now = Date.now();
    // const DAY_24 = 24 * 60 * 60 * 1000; //24hrs
    const DAY_24 = 60 * 1000; // 1 min

    const neverDone = !lastShown;
    const expired = lastShown && now - lastShown > DAY_24;

    if ((neverDone || expired) && location.pathname !== "/screen1") {
      navigate("/screen1", { replace: true });
    }
  }, [location.pathname, navigate]);
};

export default useOnboardingGuard;