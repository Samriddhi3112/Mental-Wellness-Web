export default function CallEndedModal({ startedAt, endedAt, onClose }) {
  const fmt = (utcStr) => {
    if (!utcStr) return "--";
    const d = new Date(utcStr);
    const h = d.getUTCHours();
    const m = d.getUTCMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    return `${String(h % 12 || 12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  const getDuration = () => {
    if (!startedAt || !endedAt) return "--";
    const diff = Math.floor((new Date(endedAt) - new Date(startedAt)) / 1000);
    const m = Math.floor(diff / 60);
    const s = diff % 60;
    return m > 0 ? `${m} min ${s} sec` : `${s} sec`;
  };

  return (
    <div style={S.backdrop}>
      <div style={S.card}>
        <div style={S.iconRing}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#81c995" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>

        <h2 style={S.title}>Session completed</h2>
        <p style={S.subtitle}>Your session has ended. Here's a summary:</p>

        <div style={S.durationBox}>
          <div style={S.durationNum}>{getDuration()}</div>
          <div style={S.durationMeta}>Duration · Ended at {fmt(endedAt)}</div>
        </div>

        <div style={S.metaRow}>
          <div style={S.metaCell}>
            <div style={S.metaLabel}>Started</div>
            <div style={S.metaVal}>{fmt(startedAt)}</div>
          </div>
          <div style={S.metaCell}>
            <div style={S.metaLabel}>Ended</div>
            <div style={S.metaVal}>{fmt(endedAt)}</div>
          </div>
        </div>

        <button style={S.btn} onClick={onClose}>Back to sessions</button>
      </div>
    </div>
  );
}

const S = {
  backdrop: { position: "fixed", inset: 0, zIndex: 10001, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" },
  card: { background: "#1c1e21", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "32px 28px 24px", width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", alignItems: "center" },
  iconRing: { width: 56, height: 56, borderRadius: "50%", background: "rgba(52,168,83,0.12)", border: "1.5px solid rgba(52,168,83,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  title: { color: "#e8eaed", fontSize: 18, fontWeight: 500, margin: "0 0 6px" },
  subtitle: { color: "#9aa0a6", fontSize: 13, textAlign: "center", margin: "0 0 16px" },
  durationBox: { background: "rgba(52,168,83,0.08)", border: "1px solid rgba(52,168,83,0.2)", borderRadius: 12, padding: "16px 24px", marginBottom: 12, textAlign: "center", width: "100%" },
  durationNum: { fontSize: 22, fontWeight: 500, color: "#81c995" },
  durationMeta: { fontSize: 12, color: "#9aa0a6", marginTop: 4 },
  metaRow: { display: "flex", gap: 8, width: "100%", marginBottom: 16 },
  metaCell: { flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 10, textAlign: "center" },
  metaLabel: { fontSize: 11, color: "#9aa0a6" },
  metaVal: { fontSize: 13, color: "#e8eaed", marginTop: 2 },
  btn: { background: "#4285f4", border: "none", borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: 500, padding: "11px 0", cursor: "pointer", width: "100%" },
};