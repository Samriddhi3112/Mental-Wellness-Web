import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookingById } from "../../features/booking/bookingSlice";
import CancelBookingModal from "../../components/modals/CancelBookingModal";

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

const formatFullDate = (utcString) => {
  if (!utcString) return "--";
  return new Date(utcString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

const formatTime = (utcString) => {
  if (!utcString) return "--";
  return new Date(utcString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
};

export default function BookingDetails() {
  const { id } = useParams(); // /booking-details/:id
  const dispatch = useDispatch();
  const { bookingDetails, detailsLoading } = useSelector(
    (state) => state.booking,
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) dispatch(getBookingById(id));
  }, [id, dispatch]);

  if (detailsLoading) {
    return (
      <>
        <div className="serene-app">
          <div className="body">
            <main
              className="main-content"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <div style={{ color: "#9ca3af" }}>Loading booking details...</div>
            </main>
          </div>
        </div>
      </>
    );
  }

  const isUpcoming =
    bookingDetails?.status === "pending_assignment" ||
    bookingDetails?.status === "assigned";

  return (
    <>
      <div className="serene-app">
        <div className="body">
          <main className="main-content1">
            <div className="left-col">
              {/* Top row — Date + Time */}
              <div className="top-row">
                <div className="info-card">
                  <div className="info-icon-box orange">
                    <svg
                      width="18"
                      height="18"
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
                    <div className="info-field-label">Appointment Date</div>
                    <div className="info-field-val">
                      {formatFullDate(bookingDetails?.startAt)}
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon-box blue">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4f6ef7"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="info-field-label">Time Slot</div>
                    <div className="info-field-val">
                      {formatTime(bookingDetails?.startAt)} –{" "}
                      {formatTime(bookingDetails?.endAt)}
                    </div>
                    <div className="info-field-sub">
                      Duration: {bookingDetails?.durationMinutes ?? "--"}{" "}
                      minutes
                    </div>
                  </div>
                </div>
              </div>

              {/* Session Type */}
              <div className="session-type-card">
                <div className="info-icon-box purple">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" />
                  </svg>
                </div>
                <div>
                  <div className="info-field-label">Session Type</div>
                  <div className="info-field-val">
                    {bookingDetails?.mode === "video"
                      ? "Video Consultation"
                      : "Voice Consultation"}
                  </div>
                  <div className="info-field-sub">
                    Secure end-to-end encrypted
                  </div>
                </div>
              </div>

              {/* Guidelines */}
              <div className="guidelines-card">
                <div className="guide-hdr">
                  <div className="guide-dot">i</div>
                  <div className="guide-title">
                    Session Preparation Guidelines
                  </div>
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
              {isUpcoming && (
                <>
                  <button className="btn-join">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" />
                    </svg>
                    Join Session
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={() => setShowModal(true)}
                  >
                    <svg
                      width="16"
                      height="16"
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
                    Cancel Booking
                  </button>
                </>
              )}
              {!isUpcoming && (
                <div
                  style={{
                    fontSize: "13px",
                    color: "#9ca3af",
                    textAlign: "center",
                    padding: "10px 0",
                  }}
                >
                  Status:{" "}
                  <span
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                      textTransform: "capitalize",
                    }}
                  >
                    {bookingDetails?.status?.replace("_", " ")}
                  </span>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {showModal && (
        <CancelBookingModal
          bookingId={id}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
