import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SessionModeModal({ onClose }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState("video");

  const handleContinue=()=>{
    navigate("/select-slot")
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: "380px",
          background: "#fff",
          borderRadius: "16px",
          padding: "20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: "14px" }}>
            Join Session
          </span>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "none",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* Heading */}
        <h2 style={{ marginTop: "10px", fontSize: "20px" }}>
          Choose your mode
        </h2>

        <p style={{ fontSize: "13px", color: "#666", marginBottom: "15px" }}>
          How would you like to connect with{" "}
          <b>Dr. Sarah Jenkins</b> today?
        </p>

        {/* Voice */}
        <div
          onClick={() => setMode("voice")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px",
            borderRadius: "12px",
            border: mode === "voice" ? "1.5px solid #ff5a1f" : "1.5px solid #eee",
            background: mode === "voice" ? "#fff7f4" : "#fff",
            marginBottom: "12px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#f3f4f6",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            📞
          </div>

          <div>
            <h4 style={{ margin: 0, fontSize: "14px" }}>Voice Call</h4>
            <p style={{ margin: 0, fontSize: "12px", color: "#777" }}>
              Perfect for private, focused audio-only conversations.
            </p>
          </div>

          <div
            style={{
              marginLeft: "auto",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              border: "2px solid #ccc",
              background: mode === "voice" ? "#ff5a1f" : "transparent",
            }}
          />
        </div>

        {/* Video */}
        <div
          onClick={() => setMode("video")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px",
            borderRadius: "12px",
            border: mode === "video" ? "1.5px solid #ff5a1f" : "1.5px solid #eee",
            background: mode === "video" ? "#fff7f4" : "#fff",
            marginBottom: "12px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#ffe8e1",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            🎥
          </div>

          <div>
            <h4 style={{ margin: 0, fontSize: "14px" }}>Video Call</h4>
            <p style={{ margin: 0, fontSize: "12px", color: "#777" }}>
              Face-to-face connection for a more personal experience.
            </p>
          </div>

          <div
            style={{
              marginLeft: "auto",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              border: "2px solid #ff5a1f",
              background: "#ff5a1f",
            }}
          />
        </div>

        {/* Info */}
        <div
          style={{
            background: "#f3f4f6",
            padding: "12px",
            borderRadius: "10px",
            fontSize: "12px",
            color: "#555",
            marginBottom: "15px",
          }}
        >
          🔒 All sessions are end-to-end encrypted and private. Your data and
          conversations are never recorded without consent.
        </div>

        {/* Button */}
        <button
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "10px",
            background: "#ff5a1f",
            color: "#fff",
            fontSize: "14px",
            cursor: "pointer",
          }}
          onClick={handleContinue}
        >
          Continue to Session
        </button>
      </div>
    </div>
  );
}