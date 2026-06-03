import React from "react";
// import user from "../assets/images/profile-image.svg";
import leftBack from "../assets/images/left-back-icon.png";
import notification from "../assets/images/notification-bing.svg";
import userImg from "../assets/images/admin.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearChat } from "../features/chat/chatSlice";
import { useTranslation } from "react-i18next";
import buttonIcon from "../assets/images/button 1.svg";
import { FiMenu } from "react-icons/fi";

const Header = ({ setSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const reduxUser = useSelector((state) => state.profile.user);
  console.log(window.history.length);

  const localUser = JSON.parse(localStorage.getItem("userData")) || {};
  const user = reduxUser && reduxUser.name ? reduxUser : localUser;
  // const user = reduxUser || localUser;

  const userName = user?.name;
  console.log(userData);

  const handleBack = () => {
    console.log("BACK CLICKED");

    navigate(-1);
  };

  // const handleBack = () => {
  //   if (
  //     location.pathname.startsWith("/chat-text") ||
  //     location.pathname.startsWith("/chat-voice")
  //   ) {
  //     dispatch(clearChat());
  //   }

  //   navigate(-1);
  // };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return t("goodMorning");
    if (hour < 18) return t("goodAfternoon");
    return t("goodEvening");
  };

  return (
    <div className="header">
      <div
        className="d-flex align-items-center gap-2"
        style={{
          position: "relative",
          zIndex: 99999,
          marginLeft: "30px",
        }}
      >
        <div className="mobile-menu-btn">
          <FiMenu
            size={24}
            color="#fff"
            style={{ cursor: "pointer" }}
            onClick={() => setSidebarOpen((prev) => !prev)}
          />
        </div>
        <img
          src={leftBack}
          alt="back"
          style={{ cursor: "pointer", width: "20px" }}
          onClick={handleBack}
        />
        <h3 style={{ margin: 0, color: "white" }}>
          {getGreeting()} {userName}
        </h3>
      </div>
      <div className="d-flex align-items-center gap-3">
        <img
          src={buttonIcon}
          alt="button"
          style={{
            width: "60px",
            height: "45px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/my-consultation/therapy-session")}
        />
        <div
          className="notification-bell"
          id="notificationBell"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          {" "}
          <img src={notification} alt="notification" />
        </div>
        <img
          src={user?.profilePic || user?.profileImage || userImg}
          alt="User"
          className="user-avatar"
          style={{
            width: "40px",
            height: "45px",
            borderRadius: "50%",
            objectFit: "cover",
            width: "45px",
            cursor: "pointer",
          }}
          onClick={() => {
            const token = localStorage.getItem("token");

            if (!token) {
              console.log("Guest user - navigation blocked");
              return;
            }

            navigate("/settingOption/profileDetail");
          }}
          // onClick={() => navigate("/settingOption/profileDetail")}
        />
      </div>
    </div>
  );
};

export default Header;
