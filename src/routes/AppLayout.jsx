import useOnboardingGuard from "./hooks/useOnboardingGuard";

const AppLayout = ({ children }) => {
  useOnboardingGuard();
  return children;
};

export default AppLayout;