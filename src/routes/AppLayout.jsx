import useOnboardingGuard from "./hooks/useOnboardingGuard";

const AppLayout = ({ children }) => {
  useOnboardingGuard(); // 👈 bas yaha call karo

  return children;
};

export default AppLayout;