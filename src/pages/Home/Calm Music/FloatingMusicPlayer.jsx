import React from "react";
import musicIcon from "../../../assets/images/music-play.svg";
import { useMusicPlayer } from "../../../context/MusicPlayerContext";

const FloatingMusicPlayer = () => {
  const { currentTrack, isPlaying, pauseMusic, resumeMusic, stopMusic } =
    useMusicPlayer();

  if (!currentTrack) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {/* Music Button */}
      <div
        onClick={isPlaying ? pauseMusic : resumeMusic}
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #462297, #7631B2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 8px 25px rgba(91, 157, 255, 0.4)",
          animation: isPlaying ? "pulse 2s infinite" : "none",
          position: "relative",
          transition: "0.3s ease",
        }}
      >
        <img
          src={musicIcon}
          alt=""
          style={{
            width: "32px",
            height: "32px",
            objectFit: "contain",
          }}
        />

        {/* Play Pause Overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "-5px",
            right: "-5px",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          {isPlaying ? "❚❚" : "▶"}
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={stopMusic}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "none",
          background: "#fff",
          color: "#333",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ✕
      </button>

      {/* Animation */}
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.08);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default FloatingMusicPlayer;
