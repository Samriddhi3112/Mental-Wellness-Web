// components/CallScreen.jsx
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAgoraCall } from "../../custom hooks/useAgoraCall";
import { generateCallToken, getCallInfo, toggleMute, toggleVideo } from "../../features/call/callSlice";
import { useTranslation } from "react-i18next";

// ─── Icons ────────────────────────────────────────────────────────────────────
const MicIcon = ({ muted }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={muted ? "#ef4444" : "#fff"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {muted ? (
      <>
        <line x1="1" y1="1" x2="23" y2="23" />
        <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
        <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </>
    ) : (
      <>
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </>
    )}
  </svg>
);

const CamIcon = ({ off }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={off ? "#ef4444" : "#fff"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {off ? (
      <>
        <line x1="1" y1="1" x2="23" y2="23" />
        <path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34" />
        <circle cx="12" cy="13" r="3" />
      </>
    ) : (
      <>
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </>
    )}
  </svg>
);

const PhoneOffIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 1 3.18 2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72c.13.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.68 8.91" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const UserIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
    stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// ─── CallTimer ────────────────────────────────────────────────────────────────
function CallTimer({ startedAt }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const base = startedAt ? new Date(startedAt).getTime() : Date.now();
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - base) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startedAt]);

  const h = Math.floor(elapsed / 3600);
  const m = Math.floor((elapsed % 3600) / 60).toString().padStart(2, "0");
  const s = (elapsed % 60).toString().padStart(2, "0");
  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`}
    </span>
  );
}

// ─── Main CallScreen ──────────────────────────────────────────────────────────
export default function CallScreen({ bookingId, isAdmin = false, onCallEnd }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { tokenData, callInfo, tokenLoading, tokenError, isMuted, isVideoOff, remoteUsers, isInCall } =
    useSelector((state) => state.call);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const mode = tokenData?.mode || callInfo?.mode || "video";
  const isVoiceOnly = mode === "voice";

  const { joinCall, leaveCall, toggleMicMute, toggleCameraOff } = useAgoraCall({
    bookingId,
    isAdmin,
    localVideoRef,
    remoteVideoRef,
  });

  const [joining, setJoining] = useState(false);
  const [callStartedAt] = useState(() => new Date().toISOString());
  const hasRemote = remoteUsers.length > 0;

  // Step 1: Token fetch karo, then join karo
  useEffect(() => {
    const init = async () => {
      setJoining(true);
      try {
        const result = await dispatch(generateCallToken({ bookingId, isAdmin })).unwrap();
        const td = result.data || result;
        await joinCall(td);
      } catch (err) {
        console.error("[CallScreen] Init failed:", err);
      } finally {
        setJoining(false);
      }
    };
    init();
  }, [bookingId]);

  // Mic toggle
  const handleMicToggle = async () => {
    dispatch(toggleMute());
    await toggleMicMute(!isMuted);
  };

  // Camera toggle
  const handleCamToggle = async () => {
    if (isVoiceOnly) return;
    dispatch(toggleVideo());
    await toggleCameraOff(!isVideoOff);
  };

  // End call
  const handleLeave = async () => {
    await leaveCall();
    onCallEnd?.();
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.liveDot} />
            <span style={styles.liveText}>
              {joining
                ? (t("connecting") || "Connecting...")
                : isInCall
                ? (t("liveSession") || "Live Session")
                : (t("callEnded") || "Call Ended")}
            </span>
          </div>
          {isInCall && (
            <div style={styles.timer}>
              <CallTimer startedAt={callStartedAt} />
            </div>
          )}
        </div>

        {/* Error */}
        {tokenError && (
          <div style={styles.errorBanner}>
            {tokenError}
          </div>
        )}

        {/* Video Area */}
        <div style={styles.videoArea}>

          {/* Remote video / avatar */}
          <div style={styles.remoteContainer}>
            {isVoiceOnly || !hasRemote ? (
              <div style={styles.avatarContainer}>
                <div style={styles.avatar}>
                  <UserIcon />
                </div>
                <p style={styles.waitingText}>
                  {isVoiceOnly
                    ? (t("voiceCallActive") || "Voice Call Active")
                    : (t("waitingForCounselor") || "Waiting for Counselor...")}
                </p>
                {isVoiceOnly && hasRemote && (
                  <div style={styles.audioIndicator}>
                    {[1, 2, 3].map((i) => (
                      <div key={i} style={{ ...styles.audioBar, animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div ref={remoteVideoRef} style={styles.remoteVideo} />
            )}
          </div>

          {/* Local video (video mode only) */}
          {!isVoiceOnly && (
            <div style={styles.localVideoWrapper}>
              {isVideoOff ? (
                <div style={styles.localVideoOff}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                </div>
              ) : (
                <div ref={localVideoRef} style={styles.localVideo} />
              )}
            </div>
          )}
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          {/* Mic */}
          <button
            style={{ ...styles.ctrlBtn, ...(isMuted ? styles.ctrlBtnOff : {}) }}
            onClick={handleMicToggle}
            title={isMuted ? (t("unmute") || "Unmute") : (t("mute") || "Mute")}
          >
            <MicIcon muted={isMuted} />
            <span style={styles.ctrlLabel}>
              {isMuted ? (t("unmute") || "Unmute") : (t("mute") || "Mute")}
            </span>
          </button>

          {/* Camera (only for video mode) */}
          {!isVoiceOnly && (
            <button
              style={{ ...styles.ctrlBtn, ...(isVideoOff ? styles.ctrlBtnOff : {}) }}
              onClick={handleCamToggle}
              title={isVideoOff ? (t("startVideo") || "Start Video") : (t("stopVideo") || "Stop Video")}
            >
              <CamIcon off={isVideoOff} />
              <span style={styles.ctrlLabel}>
                {isVideoOff ? (t("startVideo") || "Camera") : (t("stopVideo") || "Camera")}
              </span>
            </button>
          )}

          {/* End Call */}
          <button style={styles.endCallBtn} onClick={handleLeave}>
            <PhoneOffIcon />
            <span style={styles.ctrlLabel}>{t("endCall") || "End Call"}</span>
          </button>
        </div>

      </div>

      {/* Audio wave animation (voice mode) */}
      {isVoiceOnly && isInCall && !isMuted && (
        <style>{`
          @keyframes audioWave {
            0%, 100% { height: 8px; }
            50% { height: 28px; }
          }
        `}</style>
      )}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.92)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: 700,
    minHeight: 520,
    backgroundColor: "#0f172a",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
    margin: "0 16px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "#22c55e",
    animation: "pulse 1.5s infinite",
  },
  liveText: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.3,
  },
  timer: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: 500,
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: "4px 12px",
    borderRadius: 20,
  },
  errorBanner: {
    backgroundColor: "rgba(239,68,68,0.15)",
    borderLeft: "3px solid #ef4444",
    color: "#fca5a5",
    padding: "10px 20px",
    fontSize: 13,
  },
  videoArea: {
    flex: 1,
    position: "relative",
    backgroundColor: "#0a0f1e",
    minHeight: 340,
  },
  remoteContainer: {
    width: "100%",
    height: "100%",
    minHeight: 340,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  remoteVideo: {
    width: "100%",
    height: "100%",
    minHeight: 340,
    objectFit: "cover",
    backgroundColor: "#000",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid rgba(255,255,255,0.12)",
  },
  waitingText: {
    color: "#64748b",
    fontSize: 14,
    margin: 0,
  },
  audioIndicator: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    height: 32,
  },
  audioBar: {
    width: 4,
    height: 8,
    backgroundColor: "#1db96a",
    borderRadius: 2,
    animation: "audioWave 0.8s ease-in-out infinite",
  },
  localVideoWrapper: {
    position: "absolute",
    bottom: 14,
    right: 14,
    width: 120,
    height: 90,
    borderRadius: 10,
    overflow: "hidden",
    border: "2px solid rgba(255,255,255,0.15)",
    backgroundColor: "#1e293b",
    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
  },
  localVideo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  localVideoOff: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e293b",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: "18px 20px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  ctrlBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.08)",
    border: "none",
    borderRadius: 14,
    padding: "12px 20px",
    cursor: "pointer",
    transition: "background 0.2s",
    color: "#fff",
    minWidth: 70,
  },
  ctrlBtnOff: {
    backgroundColor: "rgba(239,68,68,0.15)",
  },
  endCallBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#dc2626",
    border: "none",
    borderRadius: 14,
    padding: "12px 24px",
    cursor: "pointer",
    color: "#fff",
    minWidth: 80,
    boxShadow: "0 4px 14px rgba(220,38,38,0.4)",
  },
  ctrlLabel: {
    fontSize: 11,
    fontWeight: 500,
    opacity: 0.85,
    letterSpacing: 0.3,
  },
};