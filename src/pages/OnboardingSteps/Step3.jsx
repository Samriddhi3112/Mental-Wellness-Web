import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/back-icon.svg";
import meditation from "../../assets/images/meditation-two.png";
import privacy from "../../assets/images/privacy-poilicy-icon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  saveConsent,
  updateUserProfile,
} from "../../features/onboarding/onboardingSlice";
import { toast } from "react-toastify";

const Step3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success } = useSelector((state) => state.onboarding);

  const [consent, setConsent] = useState({
    privacy_policy: false,
    ai_consent: false,
  });

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;

    setConsent({
      ...consent,
      [name]: checked,
    });
  };

  const handleSubmit = async () => {
    if (!consent.privacy_policy || !consent.ai_consent) {
      toast.error("Please accept Privacy Policy and AI Consent to continue");
      return;
    }

    try {
      await dispatch(updateUserProfile()).unwrap();

      toast.success("Profile updated successfully");
      navigate("/screen1");
    } catch (error) {
      const message = error?.message || "";

      const errors = message.split(",");

      errors.forEach((err) => {
        toast.error(err.trim());
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* LEFT SECTION */}

        <div className="col-lg-6 b">
          <div className="login-left">
            <div className="logo-container">
              <div className="logo-icon">
                <img src={logo} alt="Logo" />
              </div>
            </div>

            <NavLink to="/onboarding2" className="back-btn">
              <img src={backIcon} alt="back-icon" />
              Back
            </NavLink>

            <div className="text-center">
              <div className="meditation-illustration">
                <img src={meditation} alt="meditation" />
              </div>

              <p className="copyright">
                © 2026 Serene Wellness App. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}

        <div className="col-lg-6 d-flex align-items-center justify-content-center absolute">
          <div className="login-right">
            <div className="w-100 fade-in" style={{ maxWidth: 350 }}>
              <p className="welcome-mini-sub-title">Privacy & Consent</p>

              <h2 className="welcome-title text-start">
                Your privacy is our priority.
              </h2>

              <p className="welcome-description text-start">
                To provide you with personalized support, we need your consent
                for the following. Please read carefully and agree to continue.
              </p>

              <form>
                {/* Privacy Policy */}

                <div className="mb-4 p-3 border rounded-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="privacy_policy"
                      checked={consent.privacy_policy}
                      onChange={handleCheckbox}
                    />

                    <label className="form-check-label">
                      <p className="welcome-mini-sub-title text-start">
                        I agree to the Privacy Policy
                      </p>

                      <p className="welcome-description text-start">
                        This explains how we collect, use, and protect your
                        personal data.
                      </p>

                      <a href="#" className="privacy-text-link">
                        Read the full Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>

                {/* AI Consent */}

                <div className="mb-4 p-3 border rounded-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="ai_consent"
                      checked={consent.ai_consent}
                      onChange={handleCheckbox}
                    />

                    <label className="form-check-label">
                      <p className="welcome-mini-sub-title text-start">
                        I consent to AI & Voice Interaction
                      </p>

                      <p className="welcome-description text-start">
                        To use the AI companion we process text and audio
                        inputs.
                      </p>

                      <a href="#" className="privacy-text-link">
                        Learn more about AI Safety
                      </a>
                    </label>
                  </div>
                </div>

                {/* INFO BOX */}

                <div
                  className="mb-4 p-3 border rounded-3"
                  style={{ backgroundColor: "#F5F5F5" }}
                >
                  <div className="row">
                    <div className="col-1">
                      <img src={privacy} alt="" />
                    </div>

                    <div className="col-11">
                      <p className="welcome-mini-sub-title text-start">
                        You are in control
                      </p>

                      <p className="welcome-description text-start">
                        You can change these permissions anytime from settings.
                      </p>
                    </div>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}

                <button
                  type="button"
                  className="btn-primary-orange"
                  onClick={handleSubmit}
                  disabled={
                    loading
                  }
                >
                  {loading ? "Submitting..." : "Agree & Continue"}
                </button>

                <p className="text-center mt-3 footer-text">
                  By continuing, you confirm you are over 18 years old.
                </p>
              </form>
            </div>

            <p className="text-center english">English (US)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
