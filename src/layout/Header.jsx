import React from "react";
// import user from "../assets/images/profile-image.svg";
import leftBack from "../assets/images/left-back-icon.png";
import notification from "../assets/images/notification-bing.svg";
import user from "../assets/images/admin.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const reduxUser = useSelector((state) => state.profile.user);

  const localUser = JSON.parse(localStorage.getItem("userData")) || {};

  const user = reduxUser || localUser;

  const userName = user?.name || "N/A";
  console.log(userData);

  return (
    <div className="header">
      <div className="header-left">
        {/* <NavLink to="/" className="back-btn">
          <img src={leftBack} alt="Left Back" />
        </NavLink> */}
        <h3>Good Morning, {userName} </h3>
      </div>
      <div className="d-flex align-items-center gap-3">
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
          src={user?.profilePic || user?.profileImage || user}
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
          onClick={() => navigate("/settingOption/profileDetail")}
        />
      </div>
    </div>
  );
};

export default Header;
