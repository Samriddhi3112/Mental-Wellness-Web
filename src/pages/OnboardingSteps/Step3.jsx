import React, { useState } from "react";
import logo from "../../assets/images/logo-dark.svg";
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
  const [errors, setErrors] = useState({});

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

    // remove error when user fixes it
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!consent.privacy_policy) {
      newErrors.privacy_policy = "You must accept the Privacy Policy";
    }

    if (!consent.ai_consent) {
      newErrors.ai_consent = "AI consent is required to continue";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    navigate("/step-language");
  };

  // const handleSubmit = async () => {
  //   if (!consent.privacy_policy || !consent.ai_consent) {
  //     toast.error("Please accept Privacy Policy and AI Consent to continue");
  //     return;
  //   }

  //   try {
  //     await dispatch(updateUserProfile()).unwrap();

  //     toast.success("Profile updated successfully");
  //     navigate("/screen1");
  //   } catch (error) {
  //     const message = error?.message || "";

  //     const errors = message.split(",");

  //     errors.forEach((err) => {
  //       toast.error(err.trim());
  //     });
  //   }
  // };

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

                <div
                  className="mb-4 p-3 border rounded-3"
                  style={{
                    border: errors.privacy_policy ? "1px solid #ff4d4f" : "",
                    background: errors.privacy_policy ? "#fff5f5" : "",
                  }}
                >
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

                      <NavLink
                        to="/guest-settings/loginPrivacy"
                        className="privacy-text-link"
                      >
                        Read the full Privacy Policy
                      </NavLink>
                    </label>
                    {errors.privacy_policy && (
                      <p
                        style={{
                          color: "#ff4d4f",
                          fontSize: "12px",
                          marginTop: "6px",
                        }}
                      >
                        {errors.privacy_policy}
                      </p>
                    )}
                  </div>
                </div>

                {/* AI Consent */}

                <div
                  className="mb-4 p-3 border rounded-3"
                  style={{
                    border: errors.ai_consent ? "1px solid #ff4d4f" : "",
                    background: errors.ai_consent ? "#fff5f5" : "",
                  }}
                >
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

                      <NavLink
                        to="/guest-settings/loginTermsOfServices"
                        className="privacy-text-link"
                      >
                        Learn more about AI Safety
                      </NavLink>
                    </label>
                    {errors.ai_consent && (
                      <p
                        style={{
                          color: "#ff4d4f",
                          fontSize: "12px",
                          marginTop: "6px",
                        }}
                      >
                        {errors.ai_consent}
                      </p>
                    )}
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
                  // onClick={()=> navigate('/step-language')}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Continue"}
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
