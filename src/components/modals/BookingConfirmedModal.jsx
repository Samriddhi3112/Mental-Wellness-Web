import React from "react";
import { useNavigate } from "react-router-dom";
import confirmedImg from "../../assets/images/confirm-tick.png";
import bulb from "../../assets/images/bulb.png";

export default function BookingConfirmedModal({ onClose }) {
    const navigate = useNavigate()
    const handleHome = () =>{
        navigate("/home")
    }

    const handleViewConsultation = () =>{
        navigate("/my-consultation")
    }
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
            background: "none",
            fontSize: "18px",
            cursor: "pointer",
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
            boxShadow: "0 10px 30px rgba(255,90,31,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            color: "#ff5a1f",
          }}
        >
          <img src={confirmedImg} alt="Confirmed" />
        </div>

        {/* Title */}
        <h2 style={{ margin: "50px 0 5px", fontSize: "20px" , color:"#fff"}}>
          Booking Confirmed!
        </h2>

        <p style={{ fontSize: "13px", color: "#C2C2C2", marginBottom: "15px" }}>
          Your session is successfully scheduled. <br />
          We’ve sent the details to your email.
        </p>

        {/* Card */}
        <div
          style={{
            border: "1px solid #eee",
            borderRadius: "12px",
            padding: "12px",
            textAlign: "left",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "11px",
              marginBottom: "8px",
            }}
          >
            <span style={{ color: "#999" }}>DATE</span>
            <span
              style={{
                background: "#e6f9f0",
                color: "#22c55e",
                padding: "2px 8px",
                borderRadius: "10px",
                fontSize: "10px",
              }}
            >
              UPCOMING
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              marginBottom: "10px",
              color: "#fff",
            }}
          >
            <span>📅 16 Apr, 2024</span>
            <span>⏰ 02:00 PM</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "11px",
              marginBottom: "5px",
              color:"#fff",
            }}
          >
            <span>DURATION</span>
            <span>TYPE</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              color: "#fff",
            }}
          >
            <span>⏳ 60 Minutes</span>
            <span>🎥 Video Call</span>
          </div>
        </div>

        {/* Pro tip */}
        <div
          style={{
            background: "none",
            padding: "12px",
            borderRadius: "12px",
            textAlign: "left",
            fontSize: "12px",
            color: "#fff",
            marginBottom: "15px",
            border: "1px solid #fff",
          }}
        >
          <b><img src={bulb} alt="Pro Tip" /> Pro Tip</b>
          <div style={{ marginTop: "4px" }}>
            Find a quiet, comfortable space 5 minutes before your session
            begins.
          </div>
        </div>

        {/* Button */}
        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #462297, #7631B2)",
            color: "#fff",
            fontSize: "14px",
            cursor: "pointer",
            marginBottom: "8px",
          }}
          onClick={handleViewConsultation}
        >
          View My Consultations
        </button>

        <div
          style={{
            fontSize: "12px",
            color: "#666",
            cursor: "pointer",
          }}
          onClick={handleHome}
        >
          Back to Home
        </div>
      </div>
    </div>
  );
}