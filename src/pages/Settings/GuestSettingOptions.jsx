import React from "react";
import profileIcon from "../../assets/images/my-profile-img.svg";
import languageIcon from "../../assets/images/language-img.svg";
import premiumIcon from "../../assets/images/upgrade-to-premium-img.svg";
import exportDataIcon from "../../assets/images/export-my-data-img.svg";
import deleteIcon from "../../assets/images/delete-img.svg";
import termsIcon from "../../assets/images/terms-and-service.svg";
import privacyIcon from "../../assets/images/privacy-policy-img.svg";
import arrowIcon from "../../assets/images/right-arrow-icon.svg";
import { FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidenav from "../../layout/Sidenav";
import Header from "../../layout/Header";
import { toast } from "react-toastify";


const GuestSettingOptions = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    toast.error("Please log in to access this feature.")
    navigate("/");
  };

  const handleService = () => {
    navigate("/guest-settings/loginTermsOfServices");
  };
  const handlePolicy = () => {
    navigate("/guest-settings/loginPrivacy");
  };

  return (
    <div className="main-content">
      <Sidenav/>
      <Header/>
      <div className="settings-container">
        {/* Account */}
        <div className="section-header">Account</div>

        <div className="settings-section">
          <div className="setting-item" onClick={goToLogin}>
            <div className="setting-item-left">
              <div className="setting-icon icon-profile">
                <img src={profileIcon} alt="" />
              </div>
              <div className="setting-info">
                <h4>My Profile</h4>
              </div>
            </div>
            <span className="setting-arrow">
              <img src={arrowIcon} alt="" />
            </span>
          </div>

          <div className="setting-item" onClick={goToLogin}>
            <div className="setting-item-left">
              <div className="setting-icon icon-language">
                <img src={languageIcon} alt="" />
              </div>
              <div className="setting-info">
                <h4>Language</h4>
              </div>
            </div>
            <span className="setting-arrow">
              <img src={arrowIcon} alt="" />
            </span>
          </div>

          <div className="setting-item" onClick={goToLogin}>
            <div className="setting-item-left">
              <div className="setting-icon icon-premium">
                <img src={premiumIcon} alt="" />
              </div>
              <div className="setting-info">
                <h4>Upgrade to Premium</h4>
              </div>
            </div>
            <span className="setting-arrow">
              <img src={arrowIcon} alt="" />
            </span>
          </div>
        </div>

        {/* Data & Privacy */}

        {/* <div className="section-header">Data & Privacy</div>

        <div className="settings-section">

          <div className="setting-item" onClick={goToLogin}>
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

          <div className="setting-item" onClick={goToLogin}>
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

        </div> */}

        {/* About */}

        <div className="section-header">About</div>

        <div className="settings-section">
          {/* Terms of Service */}
          <div className="setting-item" onClick={handleService}>
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
          </div>

          {/* Privacy Policy */}
          <div className="setting-item" onClick={handlePolicy}>
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
          </div>

          {/* FAQ */}
          <div className="setting-item" onClick={goToLogin}>
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
          </div>
        </div>

        <button className="logout-btn" onClick={goToLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default GuestSettingOptions;
