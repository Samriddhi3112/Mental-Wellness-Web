// // components/CallScreen.jsx
// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useAgoraCall } from "../../custom hooks/useAgoraCall";
// import {
//   generateCallToken,
//   getCallInfo,
//   toggleMute,
//   toggleVideo,
// } from "../../features/call/callSlice";
// import { useTranslation } from "react-i18next";

// // ─── Icons ────────────────────────────────────────────────────────────────────
// const MicIcon = ({ muted }) => (
//   <svg
//     width="22"
//     height="22"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={muted ? "#ef4444" : "#fff"}
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     {muted ? (
//       <>
//         <line x1="1" y1="1" x2="23" y2="23" />
//         <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
//         <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
//         <line x1="12" y1="19" x2="12" y2="23" />
//         <line x1="8" y1="23" x2="16" y2="23" />
//       </>
//     ) : (
//       <>
//         <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
//         <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//         <line x1="12" y1="19" x2="12" y2="23" />
//         <line x1="8" y1="23" x2="16" y2="23" />
//       </>
//     )}
//   </svg>
// );

// const CamIcon = ({ off }) => (
//   <svg
//     width="22"
//     height="22"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={off ? "#ef4444" : "#fff"}
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     {off ? (
//       <>
//         <line x1="1" y1="1" x2="23" y2="23" />
//         <path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34" />
//         <circle cx="12" cy="13" r="3" />
//       </>
//     ) : (
//       <>
//         <path d="M23 7l-7 5 7 5V7z" />
//         <rect x="1" y="5" width="15" height="14" rx="2" />
//       </>
//     )}
//   </svg>
// );

// const PhoneOffIcon = () => (
//   <svg
//     width="22"
//     height="22"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#fff"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 1 3.18 2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72c.13.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.68 8.91" />
//     <line x1="1" y1="1" x2="23" y2="23" />
//   </svg>
// );

// const UserIcon = () => (
//   <svg
//     width="48"
//     height="48"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#94a3b8"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//     <circle cx="12" cy="7" r="4" />
//   </svg>
// );

// // ─── CallTimer ────────────────────────────────────────────────────────────────
// function CallTimer({ startedAt }) {
//   const [elapsed, setElapsed] = useState(0);

//   useEffect(() => {
//     const base = startedAt ? new Date(startedAt).getTime() : Date.now();
//     const interval = setInterval(() => {
//       setElapsed(Math.floor((Date.now() - base) / 1000));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [startedAt]);

//   const h = Math.floor(elapsed / 3600);
//   const m = Math.floor((elapsed % 3600) / 60)
//     .toString()
//     .padStart(2, "0");
//   const s = (elapsed % 60).toString().padStart(2, "0");
//   return (
//     <span style={{ fontVariantNumeric: "tabular-nums" }}>
//       {h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`}
//     </span>
//   );
// }

// // ─── Main CallScreen ──────────────────────────────────────────────────────────
// export default function CallScreen({ bookingId, isAdmin = false, onCallEnd }) {
//   const dispatch = useDispatch();
//   const { t } = useTranslation();

//   const {
//     tokenData,
//     callInfo,
//     tokenLoading,
//     tokenError,
//     isMuted,
//     isVideoOff,
//     remoteUsers,
//     isInCall,
//   } = useSelector((state) => state.call);

//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);

//   const mode = tokenData?.mode || callInfo?.mode || "video";
//   const isVoiceOnly = mode === "voice";

//   const { joinCall, leaveCall, toggleMicMute, toggleCameraOff } = useAgoraCall({
//     bookingId,
//     isAdmin,
//     localVideoRef,
//     remoteVideoRef,
//   });

//   const [joining, setJoining] = useState(false);
//   const [callStartedAt] = useState(() => new Date().toISOString());
//   const hasRemote = remoteUsers.length > 0;

//   // Step 1: Token fetch karo, then join karo
//   useEffect(() => {
//     const init = async () => {
//       setJoining(true);
//       try {
//         const result = await dispatch(
//           generateCallToken({ bookingId, isAdmin }),
//         ).unwrap();

//         const td = result.data || result;
//         // generateCallToken ke baad log karo
//         console.log(
//           "[Token] channelNameiiiiiiiiiiiiiiiiiiiiiiiiiii:",
//           td.channelName,
//         );
//         console.log("[Token] uidiiiiiiiiiiiiiiii:", td.uid);
//         console.log("[Token] appIdiiiiiiiiiiiiiiiiiiiiiiiii:", td.appId);
//         await joinCall(td);
//       } catch (err) {
//         console.error("[CallScreen] Init failed:", err);
//       } finally {
//         setJoining(false);
//       }
//     };
//     init();
//   }, [bookingId]);

//   // Mic toggle
//   const handleMicToggle = async () => {
//     dispatch(toggleMute());
//     await toggleMicMute(!isMuted);
//   };

//   // Camera toggle
//   const handleCamToggle = async () => {
//     if (isVoiceOnly) return;
//     dispatch(toggleVideo());
//     await toggleCameraOff(!isVideoOff);
//   };

//   // End call
//   const handleLeave = async () => {
//     await leaveCall();
//     onCallEnd?.();
//   };

//   // ─── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <div style={styles.overlay}>
//       <div style={styles.container}>
//         {/* Header */}
//         <div style={styles.header}>
//           <div style={styles.headerLeft}>
//             <div style={styles.liveDot} />
//             <span style={styles.liveText}>
//               {joining
//                 ? t("connecting") || "Connecting..."
//                 : isInCall
//                   ? t("liveSession") || "Live Session"
//                   : t("callEnded") || "Call Ended"}
//             </span>
//           </div>
//           {isInCall && (
//             <div style={styles.timer}>
//               <CallTimer startedAt={callStartedAt} />
//             </div>
//           )}
//         </div>

//         {/* Error */}
//         {tokenError && <div style={styles.errorBanner}>{tokenError}</div>}

//         {/* Video Area */}
//         <div style={styles.videoArea}>
//           {/* Remote video / avatar */}
//           <div style={styles.remoteContainer}>
//   {/* remoteVideoRef hamesha render karo */}
//   <div 
//     ref={remoteVideoRef} 
//     style={{
//       ...styles.remoteVideo,
//       display: isVoiceOnly ? "none" : "block"  // voice mode mein hide karo
//     }} 
//   />
  
//   {/* Avatar sirf tab dikhao jab remote user nahi hai */}
//   {(!hasRemote || isVoiceOnly) && (
//     <div style={{...styles.avatarContainer, position: "absolute"}}>
//       <div style={styles.avatar}>
//         <UserIcon />
//       </div>
//       <p style={styles.waitingText}>
//         {isVoiceOnly ? "Voice Call Active" : "Waiting for Counselor..."}
//       </p>
//       {isVoiceOnly && hasRemote && (
//         <div style={styles.audioIndicator}>
//           {[1, 2, 3].map((i) => (
//             <div key={i} style={{ ...styles.audioBar, animationDelay: `${i * 0.15}s` }} />
//           ))}
//         </div>
//       )}
//     </div>
//   )}
// </div>

//           {/* Local video (video mode only) */}
//           {!isVoiceOnly && (
//             <div style={styles.localVideoWrapper}>
//               {isVideoOff ? (
//                 <div style={styles.localVideoOff}>
//                   <svg
//                     width="18"
//                     height="18"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="#94a3b8"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//                     <circle cx="9" cy="7" r="4" />
//                   </svg>
//                 </div>
//               ) : (
//                 <div ref={localVideoRef} style={styles.localVideo} />
//               )}
//             </div>
//           )}
//         </div>

//         {/* Controls */}
//         <div style={styles.controls}>
//           {/* Mic */}
//           <button
//             style={{ ...styles.ctrlBtn, ...(isMuted ? styles.ctrlBtnOff : {}) }}
//             onClick={handleMicToggle}
//             title={isMuted ? t("unmute") || "Unmute" : t("mute") || "Mute"}
//           >
//             <MicIcon muted={isMuted} />
//             <span style={styles.ctrlLabel}>
//               {isMuted ? t("unmute") || "Unmute" : t("mute") || "Mute"}
//             </span>
//           </button>

//           {/* Camera (only for video mode) */}
//           {!isVoiceOnly && (
//             <button
//               style={{
//                 ...styles.ctrlBtn,
//                 ...(isVideoOff ? styles.ctrlBtnOff : {}),
//               }}
//               onClick={handleCamToggle}
//               title={
//                 isVideoOff
//                   ? t("startVideo") || "Start Video"
//                   : t("stopVideo") || "Stop Video"
//               }
//             >
//               <CamIcon off={isVideoOff} />
//               <span style={styles.ctrlLabel}>
//                 {isVideoOff
//                   ? t("startVideo") || "Camera"
//                   : t("stopVideo") || "Camera"}
//               </span>
//             </button>
//           )}

//           {/* End Call */}
//           <button style={styles.endCallBtn} onClick={handleLeave}>
//             <PhoneOffIcon />
//             <span style={styles.ctrlLabel}>{t("endCall") || "End Call"}</span>
//           </button>
//         </div>
//       </div>

//       {/* Audio wave animation (voice mode) */}
//       {isVoiceOnly && isInCall && !isMuted && (
//         <style>{`
//           @keyframes audioWave {
//             0%, 100% { height: 8px; }
//             50% { height: 28px; }
//           }
//         `}</style>
//       )}
//     </div>
//   );
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const styles = {
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     backgroundColor: "rgba(0,0,0,0.92)",
//     zIndex: 9999,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontFamily: "'Segoe UI', sans-serif",
//   },
//   container: {
//     width: "100%",
//     maxWidth: 700,
//     minHeight: 520,
//     backgroundColor: "#0f172a",
//     borderRadius: 20,
//     display: "flex",
//     flexDirection: "column",
//     overflow: "hidden",
//     boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
//     margin: "0 16px",
//   },
//   header: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "16px 20px",
//     borderBottom: "1px solid rgba(255,255,255,0.08)",
//   },
//   headerLeft: {
//     display: "flex",
//     alignItems: "center",
//     gap: 8,
//   },
//   liveDot: {
//     width: 8,
//     height: 8,
//     borderRadius: "50%",
//     backgroundColor: "#22c55e",
//     animation: "pulse 1.5s infinite",
//   },
//   liveText: {
//     color: "#e2e8f0",
//     fontSize: 14,
//     fontWeight: 600,
//     letterSpacing: 0.3,
//   },
//   timer: {
//     color: "#94a3b8",
//     fontSize: 14,
//     fontWeight: 500,
//     backgroundColor: "rgba(255,255,255,0.06)",
//     padding: "4px 12px",
//     borderRadius: 20,
//   },
//   errorBanner: {
//     backgroundColor: "rgba(239,68,68,0.15)",
//     borderLeft: "3px solid #ef4444",
//     color: "#fca5a5",
//     padding: "10px 20px",
//     fontSize: 13,
//   },
//   videoArea: {
//     flex: 1,
//     position: "relative",
//     backgroundColor: "#0a0f1e",
//     minHeight: 340,
//   },
// // remoteVideo div ka style ye karo
// remoteVideo: {
//   width: "100%",
//   height: "100%",
//   minHeight: 340,
//   objectFit: "cover",
//   backgroundColor: "#000",
//   position: "absolute",
//   top: 0,
//   left: 0,
// },

// // remoteContainer ka style ye karo  
// remoteContainer: {
//   width: "100%",
//   height: "100%",
//   minHeight: 340,
//   position: "relative",   // ← ye add karo
//   backgroundColor: "#000",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// },
//   avatarContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: 14,
//   },
//   avatar: {
//     width: 96,
//     height: 96,
//     borderRadius: "50%",
//     backgroundColor: "rgba(255,255,255,0.06)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "2px solid rgba(255,255,255,0.12)",
//   },
//   waitingText: {
//     color: "#64748b",
//     fontSize: 14,
//     margin: 0,
//   },
//   audioIndicator: {
//     display: "flex",
//     alignItems: "center",
//     gap: 4,
//     height: 32,
//   },
//   audioBar: {
//     width: 4,
//     height: 8,
//     backgroundColor: "#1db96a",
//     borderRadius: 2,
//     animation: "audioWave 0.8s ease-in-out infinite",
//   },
//   localVideoWrapper: {
//     position: "absolute",
//     bottom: 14,
//     right: 14,
//     width: 120,
//     height: 90,
//     borderRadius: 10,
//     overflow: "hidden",
//     border: "2px solid rgba(255,255,255,0.15)",
//     backgroundColor: "#1e293b",
//     boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
//   },
//   localVideo: {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//   },
//   localVideoOff: {
//     width: "100%",
//     height: "100%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#1e293b",
//   },
//   controls: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 16,
//     padding: "18px 20px",
//     borderTop: "1px solid rgba(255,255,255,0.08)",
//   },
//   ctrlBtn: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: 6,
//     backgroundColor: "rgba(255,255,255,0.08)",
//     border: "none",
//     borderRadius: 14,
//     padding: "12px 20px",
//     cursor: "pointer",
//     transition: "background 0.2s",
//     color: "#fff",
//     minWidth: 70,
//   },
//   ctrlBtnOff: {
//     backgroundColor: "rgba(239,68,68,0.15)",
//   },
//   endCallBtn: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: 6,
//     backgroundColor: "#dc2626",
//     border: "none",
//     borderRadius: 14,
//     padding: "12px 24px",
//     cursor: "pointer",
//     color: "#fff",
//     minWidth: 80,
//     boxShadow: "0 4px 14px rgba(220,38,38,0.4)",
//   },
//   ctrlLabel: {
//     fontSize: 11,
//     fontWeight: 500,
//     opacity: 0.85,
//     letterSpacing: 0.3,
//   },
// };
// CallScreen.jsx — Google Meet style UI
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAgoraCall } from "../../custom hooks/useAgoraCall";
import {
  generateCallToken,
  toggleMute,
  toggleVideo,
} from "../../features/call/callSlice";
import { toast } from "react-toastify";

const MicOnIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);
const MicOffIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);
const CamOnIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 7l-7 5 7 5V7z" />
    <rect x="1" y="5" width="15" height="14" rx="2" />
  </svg>
);
const CamOffIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const EndCallIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 1 3.18 2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72c.13.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const MinimizeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="10" y1="14" x2="3" y2="21" />
    <line x1="21" y1="3" x2="14" y2="10" />
  </svg>
);
const MaximizeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);
const PersonIcon = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

function CallTimer() {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const base = Date.now();
    const id = setInterval(
      () => setElapsed(Math.floor((Date.now() - base) / 1000)),
      1000,
    );
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(elapsed / 3600);
  const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
  const s = String(elapsed % 60).padStart(2, "0");
  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`}
    </span>
  );
}

function AvatarTile({ label, subtitle, large = false }) {
  const size = large ? 80 : 52;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #3c4043 0%, #5f6368 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        <PersonIcon />
      </div>
      {label && (
        <span
          style={{
            color: "#e8eaed",
            fontSize: large ? 14 : 12,
            fontWeight: 500,
          }}
        >
          {label}
        </span>
      )}
      {subtitle && (
        <span style={{ color: "#9aa0a6", fontSize: 12 }}>{subtitle}</span>
      )}
    </div>
  );
}

export default function CallScreen({ bookingId, isAdmin = false, onCallEnd }) {
  const dispatch = useDispatch();
  const { tokenData, tokenError, isMuted, isVideoOff, remoteUsers, isInCall } =
    useSelector((s) => s.call);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const controlsTimerRef = useRef(null);

  const mode = tokenData?.mode || "video";
  const isVoiceOnly = mode === "voice";
  const hasRemote = remoteUsers.length > 0;

  const [minimized, setMinimized] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [joining, setJoining] = useState(true);
  const [callStarted, setCallStarted] = useState(false);
  const remoteJoinedToastShown = useRef(false);

  const {
    joinCall,
    leaveCall,
    toggleMicMute,
    toggleCameraOff,
    localTracksRef,
    clientRef
  } = useAgoraCall({
    bookingId,
    isAdmin,
    localVideoRef,
    remoteVideoRef,
  });

  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  useEffect(() => {
    resetControlsTimer();
    return () => {
      if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const init = async () => {
      setJoining(true);
      try {
        const result = await dispatch(
          generateCallToken({ bookingId, isAdmin }),
        ).unwrap();
        const td = result.data || result;
        await joinCall(td);
        setCallStarted(true);
      } catch (err) {
        toast.error(err?.message || "Failed to join call", {
          position: "top-center",
        });
      } finally {
        setJoining(false);
      }
    };
    init();
  }, [bookingId]);

  // Toast when remote user joins
  useEffect(() => {
    if (hasRemote && callStarted && !remoteJoinedToastShown.current) {
      remoteJoinedToastShown.current = true;
      toast.success(
        isAdmin
          ? "Patient has joined the call"
          : "Counselor has joined the call",
        { position: "top-center", autoClose: 3000 },
      );
    }
    if (!hasRemote) {
      remoteJoinedToastShown.current = false;
    }
  }, [hasRemote, callStarted]);

  const handleMinimize = () => {
  setMinimized(true);
};

const handleMaximize = () => {
  setMinimized(false);
  setTimeout(() => {
    // Local video re-attach
    if (localVideoRef.current && localTracksRef?.current?.videoTrack) {
      localTracksRef.current.videoTrack.play(localVideoRef.current);
    }
    // Remote video re-attach
    if (remoteVideoRef.current && remoteUsers.length > 0) {
      // useAgoraCall ke client se remote tracks dobara play karo
      replayRemoteVideo();
    }
  }, 150);
};

const replayRemoteVideo = useCallback(() => {
  if (!clientRef?.current || !remoteVideoRef.current) return;
  const remoteUsersMap = clientRef.current.remoteUsers;
  remoteUsersMap?.forEach((user) => {
    if (user.videoTrack) {
      user.videoTrack.play(remoteVideoRef.current);
      console.log("[Agora] Remote video re-attached after maximize");
    }
  });
}, [clientRef, remoteVideoRef]);

  const handleMicToggle = async () => {
    dispatch(toggleMute());
    await toggleMicMute(!isMuted);
  };

  const handleCamToggle = async () => {
    if (isVoiceOnly) return;
    dispatch(toggleVideo());
    await toggleCameraOff(!isVideoOff);
  };

  const handleLeave = async () => {
    await leaveCall();
    onCallEnd?.();
  };

  // ─── Minimized PiP ────────────────────────────────────────────────────────
  if (minimized) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 220,
          height: 130,
          borderRadius: 12,
          overflow: "hidden",
          background: "#202124",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.1)",
          cursor: "pointer",
        }}
        onClick={() => setMinimized(false)}
      >
        {!isVoiceOnly ? (
          <div
            ref={localVideoRef}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#2d2e30",
            }}
          >
            <AvatarTile />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(transparent, rgba(0,0,0,0.75))",
            padding: "8px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: "#fff", fontSize: 11, fontWeight: 500 }}>
            {isInCall ? <CallTimer /> : "Connecting..."}
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize(); 
              }}
              style={pipBtnStyle}
            >
              <MaximizeIcon />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLeave();
              }}
              style={{ ...pipBtnStyle, background: "#ea4335", border: "none" }}
            >
              <EndCallIcon />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Full screen ──────────────────────────────────────────────────────────
  return (
    <div
      style={S.overlay}
      onMouseMove={resetControlsTimer}
      onClick={resetControlsTimer}
    >
      {/* Remote video area */}
      <div style={S.remoteArea}>
        <div ref={remoteVideoRef} style={S.remoteVideo} />

        {/* Waiting overlay */}
        {!hasRemote && !joining && (
          <div style={S.waitingOverlay}>
            <div style={S.avatarCircle}>
              <PersonIcon />
            </div>
            <p style={S.waitingTitle}>
              {isAdmin ? "Waiting for patient..." : "Waiting for counselor..."}
            </p>
            <p style={S.waitingSubtitle}>They will join shortly</p>
            <div
              style={{
                position: "relative",
                width: 56,
                height: 56,
                marginTop: 8,
              }}
            >
              <div style={{ ...S.pulseRing }} />
              <div style={{ ...S.pulseRing, animationDelay: "0.6s" }} />
            </div>
          </div>
        )}

        {/* Joining loader */}
        {joining && (
          <div style={S.joiningOverlay}>
            <div style={S.spinner} />
            <p
              style={{
                color: "#e8eaed",
                fontSize: 14,
                marginTop: 16,
                fontWeight: 400,
              }}
            >
              Joining call...
            </p>
          </div>
        )}
      </div>

      {/* Top bar */}
      <div style={{ ...S.topBar, opacity: showControls ? 1 : 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isInCall && (
            <div style={S.liveBadge}>
              <div style={S.liveDot} />
              <CallTimer />
            </div>
          )}
          {!hasRemote && isInCall && (
            <div style={S.waitingChip}>
              {isAdmin ? "Patient not joined" : "Counselor not joined"}
            </div>
          )}
        </div>
        <button
          style={S.topBtn}
          onClick={handleMinimize}
          title="Minimize to corner"
        >
          <MinimizeIcon />
        </button>
      </div>

      {/* Local PiP */}
      {!isVoiceOnly && (
        <div style={S.localPip}>
          {isVideoOff ? (
            <div style={S.pipOff}>
              <PersonIcon />
            </div>
          ) : (
            <div
              ref={localVideoRef}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
          <span style={S.pipLabel}>You</span>
        </div>
      )}

      {/* Bottom controls */}
      <div style={{ ...S.bottomBar, opacity: showControls ? 1 : 0 }}>
        <div style={S.controlsRow}>
          {/* Mic */}
          <div style={S.ctrlGroup}>
            <button
              style={{
                ...S.ctrlBtn,
                background: isMuted ? "#ea4335" : "#3c4043",
              }}
              onClick={handleMicToggle}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOffIcon /> : <MicOnIcon />}
            </button>
            <span style={S.ctrlLabel}>{isMuted ? "Unmute" : "Mute"}</span>
          </div>

          {/* Camera */}
          {!isVoiceOnly && (
            <div style={S.ctrlGroup}>
              <button
                style={{
                  ...S.ctrlBtn,
                  background: isVideoOff ? "#ea4335" : "#3c4043",
                }}
                onClick={handleCamToggle}
                title={isVideoOff ? "Start video" : "Stop video"}
              >
                {isVideoOff ? <CamOffIcon /> : <CamOnIcon />}
              </button>
              <span style={S.ctrlLabel}>
                {isVideoOff ? "Start video" : "Stop video"}
              </span>
            </div>
          )}

          {/* End */}
          <div style={S.ctrlGroup}>
            <button style={S.endBtn} onClick={handleLeave} title="Leave call">
              <EndCallIcon />
            </button>
            <span style={S.ctrlLabel}>Leave</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseOut {
          0% { transform: scale(0.9); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes liveBlink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
      `}</style>
    </div>
  );
}

const S = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background: "#202124",
    fontFamily: "'Google Sans', 'Roboto', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  remoteArea: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    background: "#2d2e30",
  },
  remoteVideo: {
    width: "100%",
    height: "100%",
    position: "absolute",
    inset: 0,
    objectFit: "cover",
  },
  waitingOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    background: "#2d2e30",
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3c4043, #5f6368)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255,255,255,0.5)",
    border: "2px solid rgba(255,255,255,0.1)",
  },
  waitingTitle: { color: "#e8eaed", fontSize: 16, fontWeight: 500, margin: 0 },
  waitingSubtitle: { color: "#9aa0a6", fontSize: 13, margin: 0 },
  pulseRing: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    border: "2px solid rgba(138,180,248,0.5)",
    animation: "pulseOut 2s ease-out infinite",
  },
  joiningOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(32,33,36,0.9)",
    backdropFilter: "blur(6px)",
  },
  spinner: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "3px solid rgba(255,255,255,0.1)",
    borderTopColor: "#8ab4f8",
    animation: "spin 0.8s linear infinite",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: "14px 18px",
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "opacity 0.3s",
  },
  liveBadge: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(0,0,0,0.45)",
    backdropFilter: "blur(8px)",
    borderRadius: 20,
    padding: "5px 12px",
    color: "#e8eaed",
    fontSize: 13,
    fontWeight: 500,
    border: "1px solid rgba(255,255,255,0.08)",
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#34a853",
    animation: "liveBlink 1.5s ease-in-out infinite",
  },
  waitingChip: {
    background: "rgba(251,188,4,0.15)",
    border: "1px solid rgba(251,188,4,0.3)",
    borderRadius: 20,
    padding: "4px 12px",
    color: "#fdd663",
    fontSize: 12,
    fontWeight: 500,
  },
  topBtn: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: "7px 10px",
    cursor: "pointer",
    color: "#e8eaed",
    display: "flex",
    alignItems: "center",
  },
  localPip: {
    position: "absolute",
    bottom: 96,
    right: 16,
    zIndex: 10,
    width: 168,
    height: 120,
    borderRadius: 10,
    overflow: "hidden",
    border: "2px solid rgba(255,255,255,0.15)",
    boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
    background: "#3c4043",
  },
  pipOff: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255,255,255,0.35)",
  },
  pipLabel: {
    position: "absolute",
    bottom: 6,
    left: 8,
    color: "#e8eaed",
    fontSize: 11,
    fontWeight: 500,
    textShadow: "0 1px 4px rgba(0,0,0,0.6)",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: "12px 16px 28px",
    background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.3s",
  },
  controlsRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    background: "rgba(32,33,36,0.88)",
    backdropFilter: "blur(16px)",
    borderRadius: 18,
    padding: "10px 18px",
    border: "1px solid rgba(255,255,255,0.07)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
  },
  ctrlGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  ctrlBtn: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    border: "none",
    color: "#e8eaed",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s, transform 0.1s",
  },
  endBtn: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    border: "none",
    background: "#ea4335",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 10px rgba(234,67,53,0.45)",
    transition: "transform 0.1s",
  },
  ctrlLabel: {
    color: "#9aa0a6",
    fontSize: 11,
    fontWeight: 400,
    whiteSpace: "nowrap",
  },
};

const pipBtnStyle = {
  background: "rgba(255,255,255,0.15)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 6,
  padding: "4px 7px",
  cursor: "pointer",
  color: "#fff",
  display: "flex",
  alignItems: "center",
};
