import { useState } from "react";
import SessionModeModal from "../../components/modals/SessionModeModal";
import img from "../../assets/images/booking-img.svg";
import timer from "../../assets/images/timer.png";
import { useTranslation } from "react-i18next";

const TherapistSVG = () => (
  <svg width="64" height="64" viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="40" fill="#f0e8f8" />
    <ellipse cx="40" cy="68" rx="22" ry="18" fill="#b57be0" />
    <ellipse cx="40" cy="30" rx="13" ry="13" fill="#f4c7d4" />
    <ellipse cx="34" cy="27" rx="3" ry="4" fill="#2a1a4e" opacity="0.85" />
    <ellipse cx="46" cy="27" rx="3" ry="4" fill="#2a1a4e" opacity="0.85" />
    <path
      d="M35 35 Q40 39 45 35"
      stroke="#c97b8a"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M28 22 Q35 14 40 18 Q45 14 52 22"
      stroke="#4a2060"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="#7b3fa0"
      opacity="0.7"
    />
    <path
      d="M28 22 Q22 26 24 34"
      stroke="#7b3fa0"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M52 22 Q58 26 56 34"
      stroke="#7b3fa0"
      strokeWidth="2"
      fill="none"
    />
    <ellipse cx="30" cy="31" rx="2" ry="1.5" fill="#f7c1c1" opacity="0.6" />
    <ellipse cx="50" cy="31" rx="2" ry="1.5" fill="#f7c1c1" opacity="0.6" />
  </svg>
);

export default function SereneApp() {
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const handleContinue = () => {
    localStorage.setItem("selectedDuration", selected);
    setShowModal(true);
  };

  return (
    <>
      <div className="serene-app">
        {/* BODY */}
        <div className="body">
          {/* MAIN */}
          <main className="main-content1">
            <div className="content-col">
              {/* Header Card */}
              <div className="header-card">
                <div className="therapist-avatar">
                  <img
                    src={img}
                    alt="Therapist"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div>
                  <div className="card-title" style={{ color: "#fff" }}>
                    {t("speakWithProfessional")}
                  </div>

                  <div className="card-desc">
                    {t("professionalDescription")}
                  </div>
                </div>
                {/* <div>
                  <div className="card-title" style={{color:"#fff"}}>Speak with a Professional</div>
                  <div className="card-desc">
                    Our certified therapists are here to support your journey.
                    Book a session
                    <br />
                    that fits your schedule and needs. Choose the duration that
                    works best
                    <br />
                    for your consultation.
                  </div>
                </div> */}
              </div>

              {/* Duration */}
              <div>
                <div className="section-label">{t("selectDuration")}</div>
                <div className="duration-grid">
                  <div
                    className={`duration-card${selected === "30" ? " selected" : ""}`}
                    onClick={() => setSelected("30")}
                  >
                    <div className="radio-wrap">
                      <div className="radio-dot" />
                    </div>
                    <div className="icon-wrap">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6c63ff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div className="dur-title">{t("minutes30")}</div>
                    <div className="dur-desc">{t("duration30Description")}</div>
                    <hr style={{ color: "#fff" }}></hr>
                    <div className="dur-rec">
                      {t("recommendedQuickCheckins")}
                    </div>
                  </div>
                  <div
                    className={`duration-card${selected === "60" ? " selected" : ""}`}
                    onClick={() => setSelected("60")}
                  >
                    <div className="radio-wrap">
                      <div className="radio-dot" />
                    </div>
                    <div className="icon-wrap purple">
                      <img
                        src={timer}
                        alt="Timer"
                        style={{ width: "100%", height: "100%" }}
                      />
                      {/* <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="5" y="2" width="14" height="20" rx="2" />
                        <line x1="12" y1="6" x2="12" y2="10" />
                        <line x1="10" y1="8" x2="14" y2="8" />
                        <line x1="9" y1="14" x2="15" y2="14" />
                        <line x1="9" y1="17" x2="13" y2="17" />
                      </svg> */}
                    </div>
                    <div className="dur-title">{t("minutes60")}</div>
                    <div className="dur-desc">{t("duration60Description")}</div>
                    <hr style={{ color: "#fff" }}></hr>
                    <div className="dur-rec">
                      {t("recommendedInDepthSessions")}
                    </div>
                  </div>
                </div>
              </div>

              <button
                className={`continue-btn${selected ? " active" : ""}`}
                disabled={!selected}
                onClick={handleContinue}
              >
                {t("continue")}
              </button>
            </div>

            {/* Info Card */}
            <div className="info-card">
              <div className="info-hdr">
                <div className="info-dot">i</div>
                <div className="info-hdr-text">{t("importantInformation")}</div>
              </div>
              <div className="info-body">{t("appointmentInfo")}</div>
              <ul className="info-list" style={{ paddingLeft: "none" }}>
                <li>
                  <span className="chk">✓</span> {t("freeCancellation")}
                </li>
                <li>
                  <span className="chk">✓</span> {t("secureVideoConsultation")}
                </li>
                <li>
                  <span className="chk">✓</span>{" "}
                  {t("licensedProfessionalsOnly")}
                </li>
              </ul>
            </div>
          </main>
        </div>
        {showModal && <SessionModeModal onClose={() => setShowModal(false)} />}
      </div>
    </>
  );
}
