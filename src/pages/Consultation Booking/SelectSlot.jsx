import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingConfirmedModal from "../../components/modals/BookingConfirmedModal";

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
  .back-btn:hover { background: rgba(255,255,255,0.07); color: #fff; }
  .header-right { display: flex; align-items: center; gap: 14px; }
  .notif-btn { background: none; border: none; cursor: pointer; color: #a0a8c0; display: flex; align-items: center; padding: 4px; border-radius: 8px; }
  .avatar-circle { width: 34px; height: 34px; border-radius: 50%; background: #3d4263; border: 2px solid #4a5070; display: flex; align-items: center; justify-content: center; cursor: pointer; }

  /* BODY */
  .body { display: flex; flex: 1; overflow: hidden; }

  /* SIDENAV */
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

  /* MAIN */
  .main-content { flex: 1; padding: 20px; overflow-y: auto; display: flex; gap: 18px; align-items: flex-start; }
  .left-col { flex: 1; display: flex; flex-direction: column; gap: 14px; min-width: 0; }

  /* DURATION BANNER */
  .duration-banner {  border-radius: 14px; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between;border:1px solid #fff }
  .dur-left { display: flex; align-items: center; gap: 14px; }
  .dur-icon { width: 36px; height: 36px; border-radius: 50%; background: rgba(242, 228, 255, 1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .dur-label { font-size: 11px; color: #fff; font-weight: 600; margin-bottom: 2px; }
  .dur-title { font-size: 16px; font-weight: 800; color: #fff; }
  .dur-sub { font-size: 12px; color: #9ca3af; margin-top: 2px; }
  .change-btn { background: rgba(242, 228, 255, 1); color: #000000; border: none; border-radius: 20px; padding: 8px 18px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Nunito', sans-serif; white-space: nowrap; }
  .change-btn:hover { background: #ffe0d0; }

  /* DATE CARD */
  .card { background: none; border-radius: 14px; padding: 18px 20px;border: 1px solid #fff }
  .card-title { font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 14px; }
  .date-grid { display: flex; gap: 10px; flex-wrap: wrap; }
  .date-chip { border: 1.5px solid #e5e7eb; border-radius: 12px; padding: 10px 18px; cursor: pointer; text-align: center; min-width: 80px; transition: all 0.15s; background: #000000; }
  .date-chip:hover { border-color: #462297; }
  .date-chip.selected { background: linear-gradient(135deg, rgba(70, 34, 151, 1), #7631B2)
  ; border-color: #1a1a2e; }
  .date-day { font-size: 11px; color: #fff; font-weight: 600; }
  .date-chip.selected .date-day { color: #a0a8c0; }
  .date-num { font-size: 18px; font-weight: 800; color: #fff; }
  .date-chip.selected .date-num { color: #fff; }

  /* SLOTS CARD */
  .slots-section { display: flex; flex-direction: column; gap: 0; }
  .slot-group { background: none; border-radius: 14px; padding: 16px 20px; margin-bottom: 12px; border: 1px solid #fff}
  .slot-group-hdr { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .slot-icon { font-size: 18px; }
  .slot-group-title { font-size: 12px; font-weight: 800; color: #fff; letter-spacing: 0.8px; text-transform: uppercase; }
  .slots-row { display: flex; flex-wrap: wrap; gap: 10px; }
  .slot-chip { border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 9px 16px; font-size: 13px; font-weight: 700; color: #fff; cursor: pointer; background: none; font-family: 'Nunito', sans-serif; transition: all 0.15s; }
  .slot-chip:hover { border-color: #6c63ff; color: #6c63ff; }
  .slot-chip.selected { background:linear-gradient(135deg,rgba(70, 34, 151, 1), rgba(118, 49, 178, 1)); border-color: #fff; color: #fff; }

  /* BOOKING SUMMARY */
  .summary-col { width: 320px; flex-shrink: 0; }
  .summary-card { background: none; border-radius: 14px; padding: 20px; border: 1px solid #fff }
  .summary-title { font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 18px; }
  .summary-row { display: flex; gap: 12px; margin-bottom: 14px; align-items: flex-start; }
  .summary-icon { width: 28px; height: 28px; border-radius: 50%; background: #fff3ee; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
  .summary-field-label { font-size: 11px; color: #9ca3af; font-weight: 600; margin-bottom: 2px; }
  .summary-field-val { font-size: 13px; font-weight: 700; color: #fff; }
  .summary-field-val.muted { color: #9ca3af; font-weight: 600; }
  .divider { border: none; border-top: 1px solid #f0f0f0; margin: 14px 0; }
  .fee-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .fee-label { font-size: 13px; color: #C2C2C2; }
  .fee-val { font-size: 13px; font-weight: 700; color: #fff; }
  .total-row { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
  .total-label { font-size: 14px; font-weight: 800; color: #fff; }
  .total-val { font-size: 20px; font-weight: 800; color: #fff; }
  .book-btn { width: 100%; background: #e5e7ef; color: #9ca3af; border: none; border-radius: 10px; padding: 12px; font-size: 14px; font-weight: 700; cursor: not-allowed; font-family: 'Nunito', sans-serif; margin-top: 14px; transition: background 0.2s, color 0.2s; }
  .book-btn.active { background: linear-gradient(135deg, #6c63ff, #a78bfa); color: #fff; cursor: pointer; }
  .secure-note { display: flex; align-items: center; gap: 5px; margin-top: 10px; justify-content: center; }
  .secure-note span { font-size: 11px; color: #9ca3af; }
`;

const KaiSVG = () => (
  <svg width="48" height="48" viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="40" fill="#e8f0ff" />
    <ellipse cx="40" cy="68" rx="22" ry="18" fill="#5c8af0" />
    <ellipse cx="40" cy="30" rx="13" ry="13" fill="#f4c7a0" />
    <ellipse cx="34" cy="27" rx="3" ry="4" fill="#2a1a0e" opacity="0.85" />
    <ellipse cx="46" cy="27" rx="3" ry="4" fill="#2a1a0e" opacity="0.85" />
    <path
      d="M35 35 Q40 39 45 35"
      stroke="#c97b5a"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M28 20 Q35 12 52 20"
      stroke="#2a3a6e"
      strokeWidth="3"
      strokeLinecap="round"
      fill="#3a5acc"
      opacity="0.8"
    />
  </svg>
);

const dates = [
  { day: "Today", date: "16 Apr" },
  { day: "Tomorrow", date: "17 Apr" },
  { day: "Friday", date: "18 Apr" },
  { day: "Saturday", date: "19 Apr" },
];

const morningSlots = ["09:00 AM", "10:30 AM", "11:00 AM"];
const afternoonSlots = [
  "01:30 PM",
  "02:00 PM",
  "03:30 PM",
  "04:00 PM",
  "05:30 PM",
];
const eveningSlots = ["07:00 PM", "08:30 PM"];

export default function SelectSlot() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("16 Apr");
  const [selectedSlot, setSelectedSlot] = useState(null);
    const [showModal, setShowModal] = useState(false);

  const displayDate =
    selectedDate === "16 Apr" ? "Today, 16 Apr 2026" : selectedDate + " 2026";

  const handleChange = () => {
    navigate("/therapy-session");
  };

  // const handleSlotBooking = () => {
  //   if (!selectedSlot) return;

  //   navigate("/my-consultation");
  // };

  return (
    <>
      <style>{styles}</style>
      <div className="serene-app">
        <div className="body">
          {/* MAIN */}
          <main className="main-content">
            <div className="left-col">
              {/* Duration Banner */}
              <div className="duration-banner">
                <div className="dur-left">
                  <div className="dur-icon">
                    <svg

                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#030f25"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="dur-label">Selected Duration</div>
                    <div className="dur-title">60 Minutes Session</div>
                    <div className="dur-sub">Standard consultation length</div>
                  </div>
                </div>
                <button className="change-btn" onClick={handleChange}>
                  Change Duration
                </button>
              </div>

              {/* Select Date */}
              <div className="card">
                <div className="card-title">Select Date</div>
                <div className="date-grid">
                  {dates.map((d) => (
                    <div
                      key={d.date}
                      className={`date-chip${selectedDate === d.date ? " selected" : ""}`}
                      onClick={() => setSelectedDate(d.date)}
                    >
                      <div className="date-day">{d.day}</div>
                      <div className="date-num">{d.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Morning Slots */}
              <div className="slot-group">
                <div className="slot-group-hdr">
                  <span className="slot-icon" style={{backgroundColor: "rgba(255, 251, 235, 1)", borderRadius:"8px"}}>☀️</span>
                  <span className="slot-group-title">Morning Slots</span>
                </div>
                <div className="slots-row">
                  {morningSlots.map((s) => (
                    <button
                      key={s}
                      className={`slot-chip${selectedSlot === s ? " selected" : ""}`}
                      onClick={() => setSelectedSlot(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Afternoon Slots */}
              <div className="slot-group">
                <div className="slot-group-hdr">
                  <span className="slot-icon" style={{backgroundColor: "rgba(255, 247, 237, 1)", borderRadius:"8px"}}>🌤️</span>
                  <span className="slot-group-title">Afternoon Slots</span>
                </div>
                <div className="slots-row">
                  {afternoonSlots.map((s) => (
                    <button
                      key={s}
                      className={`slot-chip${selectedSlot === s ? " selected" : ""}`}
                      onClick={() => setSelectedSlot(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Evening Slots */}
              <div className="slot-group">
                <div className="slot-group-hdr">
                  <span className="slot-icon" style={{backgroundColor: "rgba(238, 242, 255, 1)", borderRadius:"8px"}}>🌙</span>
                  <span className="slot-group-title">Evening Slots</span>
                </div>
                <div className="slots-row">
                  {eveningSlots.map((s) => (
                    <button
                      key={s}
                      className={`slot-chip${selectedSlot === s ? " selected" : ""}`}
                      onClick={() => setSelectedSlot(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* BOOKING SUMMARY */}
            <div className="summary-col">
              <div className="summary-card">
                <div className="summary-title">Booking Summary</div>

                <div className="summary-row">
                  <div className="summary-icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#e8501a"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <div className="summary-field-label">Selected Date</div>
                    <div className="summary-field-val">{displayDate}</div>
                  </div>
                </div>

                <div className="summary-row">
                  <div className="summary-icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#e8501a"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="summary-field-label">Selected Time</div>
                    <div
                      className={`summary-field-val${!selectedSlot ? " muted" : ""}`}
                    >
                      {selectedSlot || "Not selected yet"}
                    </div>
                  </div>
                </div>

                <div className="summary-row">
                  <div className="summary-icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#e8501a"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="5" y="2" width="14" height="20" rx="2" />
                      <line x1="12" y1="6" x2="12" y2="10" />
                      <line x1="10" y1="8" x2="14" y2="8" />
                    </svg>
                  </div>
                  <div>
                    <div className="summary-field-label">Duration</div>
                    <div className="summary-field-val">60 Minutes</div>
                  </div>
                </div>

                <hr className="divider" />

                <div className="fee-row">
                  <span className="fee-label">Session Fee</span>
                  <span className="fee-val">$80.00</span>
                </div>
                <div className="fee-row">
                  <span className="fee-label">Platform Fee</span>
                  <span className="fee-val">$5.00</span>
                </div>

                <hr className="divider" />

                <div className="total-row">
                  <span className="total-label">Total Amount</span>
                  <span className="total-val">$85.00</span>
                </div>

                <button
                  className={`book-btn${selectedSlot ? " active" : ""}`}
                  disabled={!selectedSlot}
                  onClick={() => setShowModal(true)}
                >
                  {selectedSlot ? "Confirm Booking" : "Select a time slot"}
                </button>

                <div className="secure-note">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e8501a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>Your booking is secure and protected</span>
                </div>
              </div>
            </div>
          </main>
        </div>
        {showModal && <BookingConfirmedModal onClose={() => setShowModal(false)} />}
      </div>
    </>
  );
}
