import { useState } from "react";
import SessionModeModal from "../../components/modals/SessionModeModal";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .serene-app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: 'Nunito', sans-serif;
    background: #f0f2f8;
    overflow: hidden;
  }

  /* MAIN CONTENT */
  .main-content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
    display: flex;
    gap: 18px;
    align-items: flex-start;
  }
  .content-col { flex: 1; display: flex; flex-direction: column; gap: 18px; }

  /* HEADER CARD */
  .header-card {
    background: #fff;
    border-radius: 16px;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .therapist-avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #f0e8f8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }
  .card-title { font-size: 18px; font-weight: 800; color: #1a1a2e; margin-bottom: 7px; }
  .card-desc { font-size: 13px; color: #6b7280; line-height: 1.6; }

  /* DURATION */
  .section-label { font-size: 14px; font-weight: 700; color: #1a1a2e; margin-bottom: 12px; }
  .duration-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .duration-card {
    background: #fff;
    border-radius: 16px;
    padding: 18px 20px;
    cursor: pointer;
    border: 2px solid transparent;
    position: relative;
    transition: border 0.2s, box-shadow 0.2s;
  }
  .duration-card:hover { border: 2px solid #c4bef7; }
  .duration-card.selected { border: 2px solid #6c63ff; }
  .radio-wrap {
    position: absolute; top: 16px; right: 16px;
    width: 18px; height: 18px; border-radius: 50%;
    border: 2px solid #ccc;
    display: flex; align-items: center; justify-content: center;
    transition: border 0.2s;
  }
  .duration-card.selected .radio-wrap { border: 2px solid #6c63ff; }
  .radio-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #6c63ff; display: none;
  }
  .duration-card.selected .radio-dot { display: block; }
  .icon-wrap {
    width: 38px; height: 38px; border-radius: 10px;
    background: #eef0ff;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 12px;
  }
  .icon-wrap.purple { background: #f3eeff; }
  .dur-title { font-size: 15px; font-weight: 800; color: #1a1a2e; margin-bottom: 6px; }
  .dur-desc { font-size: 12px; color: #6b7280; line-height: 1.5; margin-bottom: 10px; }
  .dur-rec { font-size: 11px; color: #b0b8cc; }

  /* CONTINUE BTN */
  .continue-btn {
    background: #e2e5ef;
    color: #a0a8c0;
    border: none;
    border-radius: 14px;
    padding: 15px;
    font-size: 15px;
    font-weight: 700;
    width: 100%;
    cursor: not-allowed;
    font-family: 'Nunito', sans-serif;
    transition: background 0.2s, color 0.2s;
  }
  .continue-btn.active {
    background: linear-gradient(135deg, #6c63ff 0%, #a78bfa 100%);
    color: #fff;
    cursor: pointer;
  }

  /* INFO CARD */
  .info-card {
    width: 230px;
    flex-shrink: 0;
    background: #1e2235;
    border-radius: 16px;
    padding: 20px;
  }
  .info-hdr { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
  .info-dot {
    width: 22px; height: 22px; border-radius: 50%;
    background: #e8501a;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800; color: #fff; flex-shrink: 0;
  }
  .info-hdr-text { font-size: 13px; font-weight: 700; color: #fff; }
  .info-body { font-size: 12px; color: #8a93b0; line-height: 1.6; margin-bottom: 14px; }
  .info-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .info-list li { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #c0c8e0; }
  .chk { color: #7c83f5; font-size: 13px; }
`;

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

  return (
    <>
      <style>{styles}</style>
      <div className="serene-app">
        {/* BODY */}
        <div className="body">
          {/* MAIN */}
          <main className="main-content">
            <div className="content-col">
              {/* Header Card */}
              <div className="header-card">
                <div className="therapist-avatar">
                  <TherapistSVG />
                </div>
                <div>
                  <div className="card-title">Speak with a Professional</div>
                  <div className="card-desc">
                    Our certified therapists are here to support your journey.
                    Book a session
                    <br />
                    that fits your schedule and needs. Choose the duration that
                    works best
                    <br />
                    for your consultation.
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div>
                <div className="section-label">Select Duration</div>
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
                    <div className="dur-title">30 Minutes</div>
                    <div className="dur-desc">
                      Standard check-in session perfect for routine
                      consultations and quick assessments.
                    </div>
                    <div className="dur-rec">
                      Recommended for: Quick check-ins
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
                      <svg
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
                      </svg>
                    </div>
                    <div className="dur-title">60 Minutes</div>
                    <div className="dur-desc">
                      Deep-dive therapy session for comprehensive discussions
                      and detailed treatment planning.
                    </div>
                    <div className="dur-rec">
                      Recommended for: In-depth sessions
                    </div>
                  </div>
                </div>
              </div>

              <button
                className={`continue-btn${selected ? " active" : ""}`}
                disabled={!selected}
                onClick={() => setShowModal(true)}
              >
                Continue
              </button>
            </div>

            {/* Info Card */}
            <div className="info-card">
              <div className="info-hdr">
                <div className="info-dot">i</div>
                <div className="info-hdr-text">Important Information</div>
              </div>
              <div className="info-body">
                You can reschedule or cancel your appointment up to 24 hours
                before the scheduled time without any fees.
              </div>
              <ul className="info-list">
                <li>
                  <span className="chk">✓</span> Free cancellation up to 24h
                </li>
                <li>
                  <span className="chk">✓</span> Secure video consultation
                </li>
                <li>
                  <span className="chk">✓</span> Licensed professionals only
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
