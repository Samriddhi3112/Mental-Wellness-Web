import { Outlet } from "react-router-dom";
import Sidenav from "./Sidenav";
import Header from "./Header";
import useOnboardingGuard from "../custom hooks/useOnboardingGuard";

const AppLayout = () => {
  useOnboardingGuard();
  
  return (
    <div className="AppLayout">
      <Sidenav />
      <div className="MainWrapper">
        <Header />
        <main className="ContentArea">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
