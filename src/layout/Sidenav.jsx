import React from "react";
import logo from "../assets/images/logo1.png";
import homeIcon from "../assets/images/home-icon.svg";
import SettingIcon from "../assets/images/setting-icon.svg";
import SidenavImage from "../assets/images/side-nav-bottom-image.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import consultation from "../assets/images/consultation.svg";

const Sidenav = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const token = localStorage.getItem("token");
  const { jwtToken, user } = useSelector((state) => state.auth);
  const isGuest = !token;

  console.log("Token", token);
  console.log("Guest", isGuest);

  // const isGuest = localStorage.getItem("isGuest") === "true";
  console.log("Token", token);
  console.log("Guest", isGuest);

  return (
    // <div className="sidebar">
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="sidebar-close" onClick={() => setSidebarOpen(false)}>
        ✕
      </div>
      <div
        style={{
          marginTop: "5px",
          borderBottom: "1px solid #FFFFFF1A",
          // borderBottom: "1px solid #ffffff21",
        }}
      >
        <img src={logo} alt="Logo" style={{ marginBottom: "10px" }} />
      </div>

      <NavLink
        to="/home"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <span>
          <img src={homeIcon} alt="Home Icon" />
        </span>
        <span>{t("home")}</span>
      </NavLink>
      <NavLink
        to="/my-consultation"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <span>
          <img src={consultation} alt="Consultation Icon" />
        </span>
        <span>{t("myConsultations")}</span>
      </NavLink>
      {/* <NavLink
        to="/therapy-session"
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <span>
          <img src={homeIcon} alt="Home Icon" />
        </span>
        <span>{t("ConsulationBooking")}</span>
      </NavLink> */}

      <NavLink
        to={isGuest ? "/guest-settings" : "/settingOption"}
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <span>
          <img src={SettingIcon} alt="Setting Icon" />
        </span>
        <span>{t("settings")}</span>
      </NavLink>

      <div className="companion-card">
        <img src={SidenavImage} alt="Sidenav Image" />
        <h4>{t("talkToKai")}</h4>
        <p>{t("kaiDescription")}</p>
        <a
          className="btn no-hover start-chat-btn"
          onClick={() => navigate("/chat")}
          style={{ cursor: "pointer" }}
        >
          {t("startConversation")}
        </a>
      </div>
    </div>
  );
};

export default Sidenav;
