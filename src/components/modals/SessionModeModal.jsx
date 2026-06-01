import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import callIcon from "../../assets/images/.call-img.png";
import videoIcon from "../../assets/images/video-icon.png";
import secureIcon from "../../assets/images/secure.png";

export default function SessionModeModal({ onClose }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState("video");

  const handleContinue = () => {
    localStorage.setItem("selectedMode", mode);
    navigate("/select-slot");
  };

  const cardStyle = (cardMode) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px",
    borderRadius: "12px",
    border: mode === cardMode
      ? "1.5px solid #7c3aed"
      : "1.5px solid rgba(255,255,255,0.08)",
    background: mode === cardMode
      ? "rgba(124, 58, 237, 0.15)"
      : "rgba(255,255,255,0.03)",
    marginBottom: "12px",
    cursor: "pointer",
    transition: "border 0.2s ease, background 0.2s ease",
  });

  const titleColor = (cardMode) => ({
    margin: 0,
    fontSize: "14px",
    fontWeight: 500,
    color: mode === cardMode ? "#e2d9f3" : "#cbd5e1",
  });

  const descColor = (cardMode) => ({
    margin: "3px 0 0",
    fontSize: "12px",
    color: mode === cardMode ? "#c4b5d9" : "#64748b",
  });

  const radioStyle = (cardMode) => ({
    marginLeft: "auto",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    border: mode === cardMode ? "2px solid #7c3aed" : "2px solid rgba(255,255,255,0.2)",
    background: mode === cardMode ? "#7c3aed" : "transparent",
    flexShrink: 0,
    transition: "all 0.2s ease",
  });

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: "390px",
          background: "#030f25",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "18px",
          padding: "22px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600, fontSize: "15px", color: "#94a3b8" }}>
            Join Session
          </span>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "8px",
              width: "30px", height: "30px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              color: "#94a3b8",
              fontSize: "16px",
            }}
          >
            ✕
          </button>
        </div>

        <h2 style={{ marginTop: "12px", marginBottom: "4px", fontSize: "22px", fontWeight: 700, color: "#f1f5f9" }}>
          Choose your mode
        </h2>
        <p style={{ fontSize: "13px", marginBottom: "18px", color: "#64748b", marginTop: 0 }}>
          How would you like to connect with today?
        </p>

        {/* Voice Card */}
        <div onClick={() => setMode("voice")} style={cardStyle("voice")}>
          <div
            style={{
              width: "42px", height: "42px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img src={callIcon} alt="Call" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={titleColor("voice")}>Voice Call</p>
            <p style={descColor("voice")}>Perfect for private, focused audio-only conversations.</p>
          </div>
          <div style={radioStyle("voice")} />
        </div>

        {/* Video Card */}
        <div onClick={() => setMode("video")} style={cardStyle("video")}>
          <div
            style={{
              width: "42px", height: "42px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img src={videoIcon} alt="Video" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={titleColor("video")}>Video Call</p>
            <p style={descColor("video")}>Face-to-face connection for a more personal experience.</p>
          </div>
          <div style={radioStyle("video")} />
        </div>

        {/* Info Box */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "12px 14px",
            borderRadius: "10px",
            fontSize: "12px",
            color: "#64748b",
            marginBottom: "16px",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            lineHeight: "1.6",
          }}
        >
          <img src={secureIcon} alt="Secure" style={{ width: "15px", height: "15px", flexShrink: 0, marginTop: "1px", opacity: 0.7 }} />
          <span>All sessions are end-to-end encrypted and private. Your data and conversations are never recorded without consent.</span>
        </div>

        {/* CTA Button */}
        <button
          style={{
            width: "100%",
            padding: "13px",
            border: "none",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #462297, #7631B2)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.01em",
          }}
          onClick={handleContinue}
        >
          Continue to Session
        </button>
      </div>
    </div>
  );
}