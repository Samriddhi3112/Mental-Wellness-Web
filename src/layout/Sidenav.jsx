import React from "react";
import logo from "../assets/images/logo-2.svg";
import homeIcon from "../assets/images/home-icon.svg";
import SettingIcon from "../assets/images/setting-icon.svg";
import SidenavImage from "../assets/images/side-nav-bottom-image.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidenav = () => {
  const navigate = useNavigate();

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
        <span>Home</span>
      </NavLink>

      <NavLink
        to={isGuest ? "/guest-settings" : "/settingOption"}
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        <span>
          <img src={SettingIcon} alt="Setting Icon" />
        </span>
        <span>Settings</span>
      </NavLink>

      <div className="companion-card">
        <img src={SidenavImage} alt="Sidenav Image" />
        <h4>Talk to Kai</h4>
        <p>Your personal companion is here to listen, judgment-free.</p>
        <a className="btn" href="#">
          Start Conversation
        </a>
      </div>
    </div>
  );
};

export default Sidenav;
