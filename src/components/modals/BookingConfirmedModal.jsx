import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import confirmedImg from "../../assets/images/confirm-tick.png";
import bulb from "../../assets/images/bulb.png";

const formatDisplayDate = (dateUtc) => {
  if (!dateUtc) return "--";
  const [yyyy, mm, dd] = dateUtc.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[parseInt(mm) - 1]} ${parseInt(dd)}, ${yyyy}`;
};

const handleHome = () => navigate("/home");
const handleViewConsultation = () => navigate("/my-consultation");

const getModeLabel = (mode) => {
  if (mode === "video") return "🎥 Video Call";
  if (mode === "voice") return "📞 Voice Call";
  return mode;
};

export default function BookingConfirmedModal({ onClose }) {
  const navigate = useNavigate();
  const bookingDetails = useSelector((state) => state.booking.bookingDetails);

  const bookedDate = localStorage.getItem("bookedDate"); // "2026-06-02"
  const bookedTime = localStorage.getItem("bookedTime");

  const handleHome = () => navigate("/home");
  const handleViewConsultation = () => navigate("/my-consultation");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: "360px",
          background: "#030f25",
          borderRadius: "20px",
          padding: "20px",
          position: "relative",
          textAlign: "center",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: "15px",
            top: "15px",
            border: "none",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "8px",
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          ✕
        </button>

        {/* Icon */}
        <div
          style={{
            width: "90px",
            height: "90px",
            margin: "10px auto",
            borderRadius: "24px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={confirmedImg}
            alt="Confirmed"
            style={{ width: "60px", height: "60px", objectFit: "contain" }}
          />
        </div>

        {/* Title */}
        <h2 style={{ margin: "16px 0 5px", fontSize: "20px", color: "#fff" }}>
          Booking Confirmed!
        </h2>
        <p style={{ fontSize: "13px", color: "#C2C2C2", marginBottom: "15px" }}>
          Your session is successfully scheduled. <br />
          We've sent the details to your email.
        </p>

        {/* Details Card */}
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "12px",
            textAlign: "left",
            marginBottom: "15px",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          {/* Date row header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "11px",
              marginBottom: "8px",
            }}
          >
            <span style={{ color: "#64748b" }}>DATE & TIME</span>
            <span
              style={{
                background: "rgba(34,197,94,0.12)",
                color: "#22c55e",
                padding: "2px 8px",
                borderRadius: "10px",
                fontSize: "10px",
                fontWeight: 500,
              }}
            >
              UPCOMING
            </span>
          </div>

          {/* Date & Time values */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              marginBottom: "12px",
              color: "#fff",
            }}
          >
            <span>📅 {formatDisplayDate(bookedDate)}</span>
            <span>⏰ {bookedTime || "--"}</span>
          </div>

          {/* Duration & Mode labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "11px",
              marginBottom: "5px",
              color: "#64748b",
            }}
          >
            <span>DURATION</span>
            <span>TYPE</span>
          </div>

          {/* Duration & Mode values */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              color: "#fff",
            }}
          >
            <span>⏳ {bookingDetails?.durationMinutes ?? "--"} Minutes</span>
            <span>{getModeLabel(bookingDetails?.mode)}</span>
          </div>
        </div>

        {/* Pro Tip */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            padding: "12px",
            borderRadius: "12px",
            textAlign: "left",
            fontSize: "12px",
            color: "#cbd5e1",
            marginBottom: "15px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "4px",
            }}
          >
            <img
              src={bulb}
              alt="Pro Tip"
              style={{ width: "16px", height: "16px", objectFit: "contain" }}
            />
            <b style={{ color: "#fff", fontSize: "13px" }}>Pro Tip</b>
          </div>
          <div style={{ color: "#94a3b8", lineHeight: "1.5" }}>
            Find a quiet, comfortable space 5 minutes before your session
            begins.
          </div>
        </div>

        {/* Buttons */}
        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #462297, #7631B2)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: "10px",
          }}
          onClick={handleViewConsultation}
        >
          View My Consultations
        </button>

        <div
          style={{ fontSize: "12px", color: "#64748b", cursor: "pointer" }}
          onClick={handleHome}
        >
          Back to Home
        </div>
      </div>
    </div>
  );
}
