import React, { useState } from "react";
import LogoutModal from "../../components/modals/LogoutModal";
import DeleteModal from "../../components/modals/DeleteModal";
import profileIcon from "../../assets/images/my-profile-img.svg";
import languageIcon from "../../assets/images/language-img.svg";
import premiumIcon from "../../assets/images/upgrade-to-premium-img.svg";
import exportDataIcon from "../../assets/images/export-my-data-img.svg";
import deleteIcon from "../../assets/images/delete-img.svg";
import termsIcon from "../../assets/images/terms-and-service.svg";
// import image from "../../assets/images/admin.png"
import { FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

<div className="setting-item-left">
  <div className="setting-icon icon-faq">
    <FaQuestionCircle size={24} color="#4A4A4A" />{" "}
    {/* size/color adjust kar sakte ho */}
  </div>

  <div className="setting-info">
    <h4>FAQ</h4>
  </div>
</div>;
import privacyIcon from "../../assets/images/privacy-policy-img.svg";
import arrowIcon from "../../assets/images/right-arrow-icon.svg";
import { NavLink } from "react-router-dom";

const SettingOptions = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isGuest = localStorage.getItem("isGuest");
  const isLoggedIn = token || isGuest;

  // const handleProtectedNavigation = (path) => {
  //   if (isLoggedIn) {
  //     navigate(path);
  //   } else {
  //     navigate("/");
  //   }
  // };

  return (
    <div className="main-content">
      <div className="settings-container">
        {/* Account Section */}
        <div className="section-header">Account</div>

        <div className="settings-section">
          <NavLink to="/settingOption/profileDetail" className="setting-item">
            <div className="setting-item-left">
              <div className="setting-icon icon-profile">
                <img src={profileIcon} alt="Profile" />
              </div>

              <div className="setting-info">
                <h4>My Profile</h4>
              </div>
            </div>

            <span className="setting-arrow">
              <img src={arrowIcon} alt="Arrow" />
            </span>
          </NavLink>

          <NavLink to="/settingOption/language" className="setting-item">
            <div className="setting-item-left">
              <div className="setting-icon icon-language">
                <img src={languageIcon} alt="" />
              </div>

              <div className="setting-info">
                <h4>Language</h4>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <span className="setting-value">English</span>

              <span className="setting-arrow">
                <img src={arrowIcon} alt="" />
              </span>
            </div>
          </NavLink>

          <div className="setting-item">
            <a href="#" className="setting-item-left">
              <div className="setting-icon icon-premium">
                <img src={premiumIcon} alt="" />
              </div>

              <div className="setting-info">
                <h4>Upgrade to Premium</h4>
              </div>
            </a>

            <span className="setting-arrow">
              <img src={arrowIcon} alt="" />
            </span>
          </div>
        </div>

        {/* Data & Privacy Section */}

        <div className="section-header">Data & Privacy</div>

        <div className="settings-section">
          <div className="setting-item">
            <div className="setting-item-left">
              <div className="setting-icon icon-export">
                <img src={exportDataIcon} alt="" />
              </div>

              <div className="setting-info">
                <h4>Export My Data</h4>
              </div>
            </div>

            <span className="setting-arrow">
              <img src={arrowIcon} alt="" />
            </span>
          </div>

          <div
            className="setting-item"
            onClick={() => setShowDeleteModal(true)}
          >
            <div className="setting-item-left">
              <div className="setting-icon icon-delete">
                <img src={deleteIcon} alt="" />
              </div>
              <div className="setting-info">
                <h4 className="red">Delete Account</h4>
              </div>
            </div>

            <span className="setting-arrow">
              <img src={arrowIcon} alt="" />
            </span>
          </div>
        </div>

        {/* About Section */}

        <div className="section-header">About</div>

        <div className="settings-section">
          <NavLink to="/settingOption/termsOfServices" className="setting-item">
            <div className="setting-item-left">
              <div className="setting-icon icon-terms">
                <img src={termsIcon} alt="" />
              </div>

              <div className="setting-info">
                <h4>Terms of Service</h4>
              </div>
            </div>

            <span className="setting-arrow">
              <img src={arrowIcon} alt="" />
            </span>
          </NavLink>

          <NavLink to="/settingOption/privacyPolicy" className="setting-item">
            <div className="setting-item-left">
              <div className="setting-icon icon-privacy">
                <img src={privacyIcon} alt="" />
              </div>

              <div className="setting-info">
                <h4>Privacy Policy</h4>
              </div>
            </div>

            <span className="setting-arrow">
              <img src={arrowIcon} alt="" />
            </span>
          </NavLink>
          <NavLink to="/settingOption/faq" className="setting-item">
            <div className="setting-item-left">
              <div className="setting-icon icon-terms">
                <FaQuestionCircle size={18} color="#ff511a" />
              </div>

              <div className="setting-info">
                <h4>FAQ</h4>
              </div>
            </div>

            <span className="setting-arrow">
              <img src={arrowIcon} alt="" />
            </span>
          </NavLink>
        </div>

        {/* Logout Button */}

        <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
          Logout
        </button>

        {/* Logout Modal */}

        <LogoutModal
          show={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
        />
      </div>
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={() => {
          setShowDeleteModal(false);
          console.log("Account deleted!");
        }}
      />
    </div>
  );
};

export default SettingOptions;
