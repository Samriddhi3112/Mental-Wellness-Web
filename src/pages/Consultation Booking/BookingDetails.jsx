import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .serene-app { display: flex; flex-direction: column; height: 100vh; font-family: 'Nunito', sans-serif; background: #f0f2f8; overflow: hidden; }

  .header { height: 56px; background: #181c2e; display: flex; align-items: center; justify-content: space-between; padding: 0 20px 0 0; z-index: 100; flex-shrink: 0; }
  .header-left { display: flex; align-items: center; width: 160px; padding-left: 16px; }
  .logo-box { width: 32px; height: 32px; background: #e8501a; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 10px; flex-shrink: 0; }
  .logo-name { font-size: 16px; font-weight: 800; color: #fff; }
  .header-center { display: flex; align-items: center; flex: 1; justify-content: center; }
  .back-btn { background: none; border: none; color: #a0a8c0; cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 14px; font-family: 'Nunito', sans-serif; font-weight: 600; padding: 6px 10px; border-radius: 8px; transition: background 0.15s; }
  .back-btn:hover { background: rgba(255,255,255,0.07); color: #fff; }
  .header-right { display: flex; align-items: center; gap: 14px; }
  .notif-btn { background: none; border: none; cursor: pointer; color: #a0a8c0; display: flex; align-items: center; padding: 4px; border-radius: 8px; }
  .avatar-circle { width: 34px; height: 34px; border-radius: 50%; background: #3d4263; border: 2px solid #4a5070; display: flex; align-items: center; justify-content: center; cursor: pointer; }

  .body { display: flex; flex: 1; overflow: hidden; }

  .sidenav { width: 160px; background: #181c2e; display: flex; flex-direction: column; justify-content: space-between; padding: 16px 12px; flex-shrink: 0; }
  .nav-top { display: flex; flex-direction: column; gap: 6px; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 600; color: #a0a8c0; transition: background 0.15s, color 0.15s; }
  .nav-item:hover { background: rgba(255,255,255,0.06); color: #fff; }
  .nav-item.active { background: #e8501a; color: #fff; }
  .nav-bottom { background: #22273d; border-radius: 14px; padding: 16px 12px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .kai-avatar { width: 52px; height: 52px; border-radius: 50%; background: #e8f0ff; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .kai-name { font-size: 14px; font-weight: 800; color: #fff; text-align: center; }
  .kai-desc { font-size: 11px; color: #8a93b0; text-align: center; line-height: 1.4; }
  .start-btn { background: #e8501a; color: #fff; border: none; border-radius: 10px; padding: 9px 14px; font-size: 12px; font-weight: 700; cursor: pointer; width: 100%; font-family: 'Nunito', sans-serif; }
  .start-btn:hover { background: #c44214; }

  .main-content { flex: 1; padding: 22px 24px; overflow-y: auto; display: flex; gap: 20px; align-items: flex-start; }
  .left-col { flex: 1; display: flex; flex-direction: column; gap: 14px; min-width: 0; }

  /* TOP ROW — date + time */
  .top-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .info-card { background: #fff; border-radius: 14px; padding: 18px 20px; display: flex; align-items: flex-start; gap: 14px; }
  .info-icon-box { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
  .info-icon-box.orange { background: #fff3ee; }
  .info-icon-box.blue { background: #eef3ff; }
  .info-icon-box.purple { background: #f3eeff; }
  .info-field-label { font-size: 11px; color: #9ca3af; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 4px; }
  .info-field-val { font-size: 17px; font-weight: 800; color: #1a1a2e; }
  .info-field-sub { font-size: 12px; color: #9ca3af; font-weight: 600; margin-top: 5px; }

  /* SESSION TYPE CARD */
  .session-type-card { background: #fff; border-radius: 14px; padding: 18px 20px; display: flex; align-items: flex-start; gap: 14px; }

  /* GUIDELINES CARD */
  .guidelines-card { background: #fff9f5; border: 1.5px solid #fde0cc; border-radius: 14px; padding: 18px 20px; }
  .guide-hdr { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .guide-dot { width: 24px; height: 24px; border-radius: 50%; background: #e8501a; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 13px; font-weight: 800; color: #fff; }
  .guide-title { font-size: 14px; font-weight: 800; color: #1a1a2e; }
  .guide-list { display: flex; flex-direction: column; gap: 9px; padding-left: 4px; }
  .guide-item { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: #4b5563; line-height: 1.5; }
  .bullet { width: 6px; height: 6px; border-radius: 50%; background: #e8501a; flex-shrink: 0; margin-top: 6px; }

  /* RIGHT — Session Actions */
  .actions-col { width: 220px; flex-shrink: 0; display: flex; flex-direction: column; gap: 12px; }
  .actions-title { font-size: 16px; font-weight: 800; color: #1a1a2e; margin-bottom: 4px; }
  .btn-join { width: 100%; background: #e8501a; color: #fff; border: none; border-radius: 12px; padding: 14px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Nunito', sans-serif; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.15s; }
  .btn-join:hover { background: #c44214; }
  .btn-cancel { width: 100%; background: #fff; color: #e8501a; border: 1.5px solid #e5e7eb; border-radius: 12px; padding: 13px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Nunito', sans-serif; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.15s, border 0.15s; }
  .btn-cancel:hover { background: #fff3ee; border-color: #e8501a; }
`;

const KaiSVG = () => (
  <svg width="48" height="48" viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="40" fill="#e8f0ff"/>
    <ellipse cx="40" cy="68" rx="22" ry="18" fill="#5c8af0"/>
    <ellipse cx="40" cy="30" rx="13" ry="13" fill="#f4c7a0"/>
    <ellipse cx="34" cy="27" rx="3" ry="4" fill="#2a1a0e" opacity="0.85"/>
    <ellipse cx="46" cy="27" rx="3" ry="4" fill="#2a1a0e" opacity="0.85"/>
    <path d="M35 35 Q40 39 45 35" stroke="#c97b5a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M28 20 Q35 12 52 20" stroke="#2a3a6e" strokeWidth="3" strokeLinecap="round" fill="#3a5acc" opacity="0.8"/>
  </svg>
);

export default function BookingDetails() {
  return (
    <>
      <style>{styles}</style>
      <div className="serene-app">

        <div className="body">
          {/* MAIN */}
          <main className="main-content">
            <div className="left-col">

              {/* Top row — Date + Time */}
              <div className="top-row">
                <div className="info-card">
                  <div className="info-icon-box orange">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8501a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <div>
                    <div className="info-field-label">Appointment Date</div>
                    <div className="info-field-val">Monday, May 24, 2024</div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon-box blue">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f6ef7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <div className="info-field-label">Time Slot</div>
                    <div className="info-field-val">10:00 AM – 11:00 AM</div>
                    <div className="info-field-sub">Duration: 60 minutes</div>
                  </div>
                </div>
              </div>

              {/* Session Type */}
              <div className="session-type-card">
                <div className="info-icon-box purple">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
                  </svg>
                </div>
                <div>
                  <div className="info-field-label">Session Type</div>
                  <div className="info-field-val">Video Consultation</div>
                  <div className="info-field-sub">Secure end-to-end encrypted</div>
                </div>
              </div>

              {/* Guidelines */}
              <div className="guidelines-card">
                <div className="guide-hdr">
                  <div className="guide-dot">i</div>
                  <div className="guide-title">Session Preparation Guidelines</div>
                </div>
                <div className="guide-list">
                  {[
                    "Please ensure you're in a quiet, private space with a stable internet connection",
                    "The consultation room will be available 5 minutes before the scheduled time",
                    "Have your notes and any relevant documents ready for discussion",
                    "Test your camera and microphone beforehand for the best experience",
                  ].map((text, i) => (
                    <div className="guide-item" key={i}>
                      <div className="bullet" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* SESSION ACTIONS */}
            <div className="actions-col">
              <div className="actions-title">Session Actions</div>
              <button className="btn-join">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
                </svg>
                Join Session
              </button>
              <button className="btn-cancel">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8501a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Cancel Booking
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
