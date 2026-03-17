import React from "react";
// import user from "../assets/images/profile-image.svg";
import leftBack from "../assets/images/left-back-icon.png";
import notification from "../assets/images/notification-bing.svg";
import user from "../assets/images/admin.png"
import { NavLink } from "react-router-dom";

const Header = () => {
  const userData = JSON.parse(localStorage.getItem("userName"));
  const userName = userData?.name || "User";
  console.log(userData);
  

  return (
    <div className="header">
      <div className="header-left">
        {/* <NavLink to="/" className="back-btn">
          <img src={leftBack} alt="Left Back" />
        </NavLink> */}
        <h3>Good Morning, {userName} 👋</h3>
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
        <img src={user} alt="User" className="user-avatar" style={{width:"45px"}} />
      </div>
    </div>
  );
};

export default Header;
