import React from "react";
import logo from "../assets/images/Swastii.svg";
import homeIcon from "../assets/images/home-icon.svg";
import SettingIcon from "../assets/images/setting-icon.svg";
import SidenavImage from "../assets/images/side-nav-bottom-image.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Sidenav = () => {
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
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" />
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
          className="btn"
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
