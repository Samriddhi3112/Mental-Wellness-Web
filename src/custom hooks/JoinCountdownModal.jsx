import { useEffect, useState } from "react";

export default function JoinCountdownModal({ joinFrom, joinTo, onClose, onJoin }) {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, Math.ceil((new Date(joinFrom).getTime() - Date.now()) / 1000));
      setSecondsLeft(diff);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [joinFrom]);

  const canJoin = secondsLeft === 0;

  const fmt = (isoStr) => {
    if (!isoStr) return "--";
    const d = new Date(isoStr.replace("Z", ""));
    const h = d.getUTCHours();
    const m = d.getUTCMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    return `${String(h % 12 || 12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  // HH:MM:SS ya MM:SS
  const totalMins = Math.floor(secondsLeft / 60);
  const hrs = Math.floor(totalMins / 60);
  const mins = String(totalMins % 60).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");
  const timeDisplay = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}:${secs}`;

  return (
    <div style={S.backdrop}>
      <div style={S.card}>
        <div style={{ ...S.iconRing, background: canJoin ? "linear-gradient(135deg, #462297, #7631b2)" : "linear-gradient(135deg, #462297, #7631b2)", border: `1.5px solid ${canJoin ? "rgba(52,168,83,0.3)" : "rgba(251,188,4,0.3)"}` }}>
          {canJoin ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#81c995" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fdd663" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          )}
        </div>

        <h2 style={S.title}>{canJoin ? "Ready to join!" : "Session starts soon"}</h2>
        <p style={S.subtitle}>
          {canJoin
            ? "Your join window is open. Click below to enter."
            : "You can join 5 minutes before the session starts."}
        </p>

        {!canJoin && (
          <>
            <div style={S.countdownBox}>
              <div style={S.countdownNum}>{timeDisplay}</div>
              <div style={S.countdownLabel}>
                {hrs > 0 ? "until join window opens" : "minutes remaining"}
              </div>
            </div>
            <p style={{ color: "#9aa0a6", fontSize: 12, margin: "0 0 20px", textAlign: "center" }}>
              You can join from{" "}
              <span style={{ color: "#e8eaed", fontWeight: 500 }}>{fmt(joinFrom)}</span>
            </p>
          </>
        )}

        {canJoin && (
          <button style={S.joinBtn} onClick={onJoin}>
            Join session now
          </button>
        )}

        <button style={S.cancelBtn} onClick={onClose}>
          {canJoin ? "Maybe later" : "Got it"}
        </button>
      </div>
    </div>
  );
}

const S = {
  backdrop: { position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.72)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" },
  card: { background: "#1c1e21", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "32px 28px 24px", width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", alignItems: "center" },
  iconRing: { width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  title: { color: "#e8eaed", fontSize: 18, fontWeight: 500, margin: "0 0 6px" },
  subtitle: { color: "#9aa0a6", fontSize: 13, textAlign: "center", lineHeight: 1.5, margin: "0 0 16px", maxWidth: 260 },
  countdownBox: { background: "linear-gradient(135deg, #462297, #7631b2)", border: "#fff", borderRadius: 12, padding: "18px 28px", marginBottom: 14, textAlign: "center", width: "100%" },
  countdownNum: { fontSize: 32, fontWeight: 500, color: "#fdd663", letterSpacing: 2, fontVariantNumeric: "tabular-nums" },
  countdownLabel: { fontSize: 11, color: "#9aa0a6", marginTop: 4 },
  joinBtn: { background: "#4285f4", border: "none", borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: 500, padding: "11px 0", cursor: "pointer", width: "100%", marginBottom: 8 },
  cancelBtn: { background: "none", border: "none", color: "#9aa0a6", fontSize: 13, cursor: "pointer", padding: "4px 0", textDecoration: "underline", textUnderlineOffset: 3 },
};