import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .serene-app { display: flex; flex-direction: column; height: 100vh; font-family: 'Nunito', sans-serif; background: #f0f2f8; overflow: hidden; }

  /* HEADER */
  .header { height: 56px; background: #181c2e; display: flex; align-items: center; justify-content: space-between; padding: 0 20px 0 0; z-index: 100; flex-shrink: 0; }
  .header-left { display: flex; align-items: center; width: 160px; padding-left: 16px; }
  .logo-box { width: 32px; height: 32px; background: #e8501a; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 10px; flex-shrink: 0; }
  .logo-name { font-size: 16px; font-weight: 800; color: #fff; }
  .header-center { display: flex; align-items: center; flex: 1; justify-content: center; }
  .back-btn { background: none; border: none; color: #a0a8c0; cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 14px; font-family: 'Nunito', sans-serif; font-weight: 600; padding: 6px 10px; border-radius: 8px; transition: background 0.15s; }
  // .back-btn:hover { background: rgba(255,255,255,0.07); color: #fff; }
  .header-right { display: flex; align-items: center; gap: 14px; }
  .notif-btn { background: none; border: none; cursor: pointer; color: #a0a8c0; display: flex; align-items: center; padding: 4px; border-radius: 8px; }
  .avatar-circle { width: 34px; height: 34px; border-radius: 50%; background: #3d4263; border: 2px solid #4a5070; display: flex; align-items: center; justify-content: center; cursor: pointer; overflow: hidden; }

  /* BODY */
  .body { display: flex; flex: 1; overflow: hidden; }

  /* SIDENAV */
  .sidenav { width: 160px; background: #181c2e; display: flex; flex-direction: column; justify-content: space-between; padding: 16px 12px; flex-shrink: 0; }
  .nav-top { display: flex; flex-direction: column; gap: 6px; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 600; color: #a0a8c0; transition: background 0.15s, color 0.15s; }
  // .nav-item:hover { background: rgba(255,255,255,0.06); color: #fff; }
  .nav-item.active { background: #e8501a; color: #fff; }
  .nav-bottom { background: #22273d; border-radius: 14px; padding: 16px 12px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .kai-avatar { width: 52px; height: 52px; border-radius: 50%; background: #e8f0ff; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .kai-name { font-size: 14px; font-weight: 800; color: #fff; text-align: center; }
  .kai-desc { font-size: 11px; color: #8a93b0; text-align: center; line-height: 1.4; }
  .start-btn { background: #e8501a; color: #fff; border: none; border-radius: 10px; padding: 9px 14px; font-size: 12px; font-weight: 700; cursor: pointer; width: 100%; font-family: 'Nunito', sans-serif; }
  // .start-btn:hover { background: #c44214; }

  /* MAIN */
  .main-content { flex: 1; padding: 20px 24px; overflow-y: auto; }

  /* STATS */
  .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 22px; }
  .stat-card { background: #20253F; border-radius: 14px; padding: 18px 20px;border:1px solid #F3F4F6 }
  .stat-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
  .stat-icon.green { background: #e8f8ee; }
  .stat-icon.dark { background: #eef0f8; }
  .stat-icon.red { background: #feeee9; }
  .stat-num { font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 4px; }
  .stat-label { font-size: 13px; color: #fff; font-weight: 600; }

  /* ALL SESSIONS */
  .sessions-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .sessions-title { font-size: 16px; font-weight: 800; color: #1a1a2e; }
  .book-new-btn { background: linear-gradient(135deg, #462297, #7631B2); color: #fff; border: none; border-radius: 10px; padding: 9px 16px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Nunito', sans-serif; display: flex; align-items: center; gap: 6px; }
  // .book-new-btn:hover { background: #c44214; }

  .sessions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  /* SESSION CARD */
  .session-card { background: none; border-radius: 14px; padding: 18px 20px; position: relative; overflow: hidden;border:1px solid #fff }
  .badge { position: absolute; top: 0; right: 0; padding: 5px 14px; font-size: 11px; font-weight: 800; border-radius: 0 14px 0 10px; letter-spacing: 0.5px; display: flex; align-items: center; gap: 5px; }
  .badge.upcoming { background: #1db96a; color: #fff; }
  .badge.completed { background: #3d4263; color: #fff; }
  .badge.cancelled { background: #e8501a; color: #fff; }

  .session-date { font-size: 12px; color: #9ca3af; font-weight: 600; margin-bottom: 4px; margin-top: 4px; }
  .session-time { font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 10px; }
  .session-time.dark { color: #1a1a2e; }
  .session-meta { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
  .meta-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #fff; font-weight: 600; }

  .session-actions { display: flex; gap: 10px; }
.btn-join {
  background: linear-gradient(135deg, #462297, #7631B2);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px 16px; /* 👈 height + width feel better */
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: 100%;
  min-width: 250px; /* 👈 ye add karo */
}
  // .btn-join:hover { background: #c44214; }
  .btn-secondary { background: #fff; color: #1a1a2e; border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 10px 16px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Nunito', sans-serif; display: flex; align-items: center; gap: 6px; }
  // .btn-secondary:hover { background: #f5f5f8; }
  .btn-orange-outline { background: #fff; color: #e8501a; border: 1.5px solid #e8501a; border-radius: 10px; padding: 10px 16px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Nunito', sans-serif; display: flex; align-items: center; gap: 6px; }
  // .btn-orange-outline:hover { background: #fff3ee; }

  .scheduled-tag { background: #f0f2f8; border-radius: 10px; padding: 10px; text-align: center; font-size: 13px; font-weight: 700; color: #6b7280; display: flex; align-items: center; justify-content: center; gap: 6px; }

  .cancelled-note { background: #FEF2F2; border-radius: 10px; padding: 10px 14px; font-size: 12px; color: #B91C1C; font-weight: 600; display: flex; align-items: center; gap: 6px; margin-top: 2px; }
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

const IconCal = ({ color = "#1db96a" }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5a6080" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IconX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8501a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);
const IconClock = ({ color = "#6b7280" }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="6" x2="12" y2="10"/><line x1="10" y1="8" x2="14" y2="8"/>
  </svg>
);
const IconVideo = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
  </svg>
);
const IconPhone = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.35 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconNotes = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const IconRefresh = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e8501a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/>
  </svg>
);
const IconCam = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
  </svg>
);

export default function MyConsultations() {
    const navigate = useNavigate();

    const handleDetail =()=>{
        navigate("booking-details")
    }
  return (
    <>
      <style>{styles}</style>
      <div className="serene-app">

        <div className="body">
          {/* MAIN */}
          <main className="main-content">

            {/* STATS */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon green"><IconCal color="#1db96a" /></div>
                <div className="stat-num">3</div>
                <div className="stat-label">Upcoming Sessions</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon dark"><IconCheck /></div>
                <div className="stat-num">12</div>
                <div className="stat-label">Completed Sessions</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon red"><IconX /></div>
                <div className="stat-num">1</div>
                <div className="stat-label">Cancelled Sessions</div>
              </div>
            </div>

            {/* ALL SESSIONS */}
            <div className="sessions-header" >
              <div className="sessions-title">All Sessions</div>
              <button className="book-new-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Book New
              </button>
            </div>

            <div className="sessions-grid" >

              {/* Card 1 — Upcoming, Join Session */}
              <div className="session-card" onClick={() => navigate("/booking-details")}>
                <div className="badge upcoming">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  UPCOMING
                </div>
                <div className="session-date">Tomorrow</div>
                <div className="session-time">02:00 PM</div>
                <div className="session-meta">
                  <div className="meta-item"><IconClock color="#6b7280" /> 60 Minutes</div>
                  <div className="meta-item"><IconVideo /> Video Call</div>
                </div>
                <div className="session-actions">
                  <button className="btn-join"><IconCam /> Join Session</button>
                  {/* <button className="btn-secondary">Reschedule</button> */}
                </div>
              </div>

              {/* Card 2 — Completed */}
              <div className="session-card" onClick={() => navigate("/booking-details")}>
                <div className="badge completed">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  COMPLETED
                </div>
                <div className="session-date">Apr 10</div>
                <div className="session-time dark">03:00 PM</div>
                <div className="session-meta">
                  <div className="meta-item"><IconClock /> 60 Minutes</div>
                  <div className="meta-item"><IconVideo /> Video Call</div>
                </div>
                <div className="session-actions">
                  {/* <button className="btn-secondary"><IconNotes /> View Notes</button> */}
                  <button className="btn-join"><IconRefresh /> Book Again</button>
                </div>
              </div>

              {/* Card 3 — Upcoming, Scheduled */}
              <div className="session-card" onClick={() => navigate("/booking-details")}>
                <div className="badge upcoming">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  UPCOMING
                </div>
                <div className="session-date">Apr 20</div>
                <div className="session-time">11:30 AM</div>
                <div className="session-meta">
                  <div className="meta-item"><IconClock color="#6b7280" /> 45 Minutes</div>
                  <div className="meta-item"><IconPhone /> Audio Call</div>
                </div>
                <div className="scheduled-tag">
                  {/* <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg> */}
                  Cancel
                </div>
              </div>

              {/* Card 4 — Cancelled */}
              <div className="session-card" onClick={() => navigate("/booking-details")}>
                <div className="badge cancelled">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  CANCELLED
                </div>
                <div className="session-date">Apr 5</div>
                <div className="session-time dark">01:00 PM</div>
                <div className="session-meta">
                  <div className="meta-item"><IconClock /> 60 Minutes</div>
                  <div className="meta-item"><IconVideo /> Video Call</div>
                </div>
                <div className="cancelled-note">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8501a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  Cancelled by provider – Full refund processed
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  );
}
