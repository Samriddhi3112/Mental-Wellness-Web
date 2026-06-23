export default function SessionExpiredModal({ startAt, endAt, onClose }) {
  const fmtTime = (isoStr) => {
    if (!isoStr) return "--";
    const d = new Date(isoStr.replace("Z", ""));
    const h = d.getHours();
    const m = d.getMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    return `${String(h % 12 || 12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  const fmtDate = (isoStr) => {
    if (!isoStr) return "--";
    const d = new Date(isoStr.replace("Z", ""));
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return "Today";
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
  };

  return (
    <div style={SE.backdrop}>
      <div style={SE.card}>
        {/* Icon */}
        <div style={SE.iconRing}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f28b82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>

        <h2 style={SE.title}>Session time passed</h2>
        <p style={SE.subtitle}>This session has already ended and can no longer be joined.</p>

        {/* Date chip */}
        <div style={SE.dateChip}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span>{fmtDate(startAt)}</span>
        </div>

        {/* Time row */}
        <div style={SE.metaRow}>
          <div style={SE.metaCell}>
            <div style={SE.metaLabel}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Started
            </div>
            <div style={SE.metaVal}>{fmtTime(startAt)}</div>
          </div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.07)", margin: "8px 0" }} />
          <div style={SE.metaCell}>
            <div style={SE.metaLabel}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
                <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              Ended
            </div>
            <div style={SE.metaVal}>{fmtTime(endAt)}</div>
          </div>
        </div>

        {/* Info note */}
        <div style={SE.infoBox}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8ab4f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>Book a new session to connect with a counselor.</span>
        </div>

        <button style={SE.btn} onClick={onClose}>Got it</button>
      </div>
    </div>
  );
}

const SE = {
  backdrop: { position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" },
  card: { background: "#1c1e21", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "32px 24px 24px", width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", alignItems: "center" },
  iconRing: { width: 56, height: 56, borderRadius: "50%", background: "rgba(234,67,53,0.12)", border: "1.5px solid rgba(234,67,53,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  title: { color: "#e8eaed", fontSize: 18, fontWeight: 500, margin: "0 0 6px" },
  subtitle: { color: "#9aa0a6", fontSize: 13, textAlign: "center", lineHeight: 1.5, margin: "0 0 16px", maxWidth: 260 },
  dateChip: { display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "5px 14px", fontSize: 12, color: "#9aa0a6", marginBottom: 14 },
  metaRow: { display: "flex", width: "100%", background: "rgba(255,255,255,0.04)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", marginBottom: 14, overflow: "hidden" },
  metaCell: { flex: 1, padding: "12px 10px", textAlign: "center" },
  metaLabel: { fontSize: 11, color: "#9aa0a6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 },
  metaVal: { fontSize: 15, color: "#e8eaed", fontWeight: 500, fontVariantNumeric: "tabular-nums" },
  infoBox: { display: "flex", alignItems: "flex-start", gap: 8, background: "rgba(138,180,248,0.08)", border: "1px solid rgba(138,180,248,0.15)", borderRadius: 10, padding: "10px 14px", width: "100%", marginBottom: 18, fontSize: 12, color: "#8ab4f8", lineHeight: 1.5 },
  btn: { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "#e8eaed", fontSize: 13, fontWeight: 500, padding: "11px 0", cursor: "pointer", width: "100%" },
};