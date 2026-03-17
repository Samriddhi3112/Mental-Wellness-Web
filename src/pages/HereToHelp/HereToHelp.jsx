import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/back-icon.svg";
import meditation from "../../assets/images/meditation-one.png";
import talktoai from "../../assets/images/talk-to-ai.svg";
import calmmusic from "../../assets/images/calm-music.svg";
import guidedmeditation from "../../assets/images/guided-meditation.svg";
import exercise from "../../assets/images/breathing-exercise.svg";
import playIcon from "../../assets/images/play-icon.png";
import talktoaileft from "../../assets/images/talk-to-ai-left-modal.png";
import emergencyarrowicon from "../../assets/images/emergengy-arrow-icon.svg";
import emergencyarrow from "../../assets/images/emergengy-arrow-icon.svg";
import emergency from "../../assets/images/emergengy-help-icon.svg";
import emergencyTop from "../../assets/images/emergency-logo-top.svg";
import EmergencyModal from "../../components/modals/EmergencyModal";
import TalkToAiModal from "../../components/modals/TalkToAiModal";
import TalkToAiSettingsModal from "../../components/modals/TalkToAiSettingsModal";
import { NavLink } from "react-router-dom";

const HereToHelp = () => {

  const [showEmergency, setShowEmergency] = useState(false);
  const [showTalkAi, setShowTalkAi] = useState(false);
  const [showTalkAiSettings, setShowTalkAiSettings] = useState(false);

//   useEffect(() => {
//     setShowEmergencyModal(true);
//   }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 a">
            <div className="login-left">
              <div className="logo-container">
                <div className="logo-icon">
                  <img src={logo} alt="Logo" />
                </div>
              </div>
              <NavLink to="/" className="back-btn">
                <img src={backIcon} alt="back-icon" />
                Back
              </NavLink>
              <div className="text-center">
                <div className="meditation-illustration">
                  <img src={meditation} alt="meditation" />
                </div>
                <div>
                  <p className="copyright">
                    © 2026 Serene Wellness App. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="login-right">
              <h2 className="welcome-title">Here to help</h2>
              <p className="welcome-description">Take a moment for yourself.</p>
              <div className="feature-main-box">
                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <div
                      className="feature-card"
                      onClick={() => setShowTalkAi(true)}
                    >
                      <div className="feature-icon">
                        <img src={talktoai} alt />
                      </div>
                      <div className="feature-title">Talk to AI</div>
                      <div className="feature-subtitle">
                        A safe space to talk
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="feature-card">
                      <div className="feature-icon">
                        <img src={calmmusic} alt />
                      </div>
                      <div className="feature-title">Calm Music</div>
                      <div className="feature-subtitle">Relaxing sounds</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="feature-card">
                      <div className="feature-icon">
                        <img src={guidedmeditation} alt />
                      </div>
                      <div className="feature-title">Guided Meditation</div>
                      <div className="feature-subtitle">Find your calm</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="feature-card">
                      <div className="feature-icon">
                        <img src={exercise} alt />
                      </div>
                      <div className="feature-title">Breathing Exercise</div>
                      <div className="feature-subtitle">
                        A safe space to talk
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="feature-card">
                      <div className="feature-icon">
                        <img src={talktoai} alt />
                      </div>
                      <div className="feature-title">Talk to AI</div>
                      <div className="feature-subtitle">
                        A safe space to talk
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="feature-card">
                      <div className="feature-icon">
                        <img src={calmmusic} alt />
                      </div>
                      <div className="feature-title">Calm Music</div>
                      <div className="feature-subtitle">Relaxing sounds</div>
                    </div>
                  </div>
                </div>
                <button
                  className="emergency-btn"
                  onClick={() => setShowEmergency(true)}
                >
                  <div className="d-flex align-items-center gap-3">
                    <img src={emergency} alt />
                    <div className="text-start">
                      <div>Emergency Help</div>
                      <small
                        style={{
                          fontSize: 13,
                          fontWeight: 400,
                          opacity: "0.9",
                        }}
                      >
                        Get immediate support
                      </small>
                    </div>
                  </div>
                  <img src={emergencyarrow} alt />
                </button>
                {/* <p className="text-center mt-4 footer-text">
                  <a href="#" className="text-link">
                    Login to save your progress
                  </a>
                </p> */}
              </div>
              <p className="text-center english">English (US)</p>
            </div>
          </div>
        </div>
      </div>
      <EmergencyModal
  show={showEmergency}
  onClose={() => setShowEmergency(false)}
/>

<TalkToAiModal
  show={showTalkAi}
  onClose={() => setShowTalkAi(false)}
  onContinue={() => {
    setShowTalkAi(false);
    setShowTalkAiSettings(true);
  }}
/>

<TalkToAiSettingsModal
  show={showTalkAiSettings}
  onClose={() => setShowTalkAiSettings(false)}
/>
    </div>
  );
};

export default HereToHelp;
