import { Outlet } from "react-router-dom";
import Sidenav from "./Sidenav";
import Header from "./Header";
import useOnboardingGuard from "../custom hooks/useOnboardingGuard";
import { useState } from "react";

const AppLayout = () => {
  useOnboardingGuard();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="AppLayout">
      {sidebarOpen && (
      <div
        className="sidebar-overlay"
        onClick={() => setSidebarOpen(false)}
      />
    )}
      <Sidenav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="MainWrapper">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="ContentArea">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
