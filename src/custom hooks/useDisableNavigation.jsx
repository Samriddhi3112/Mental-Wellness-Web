import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useDisableNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Push current page again → stack lock
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      navigate(0); // reload same page (back block)
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);
};

export default useDisableNavigation;