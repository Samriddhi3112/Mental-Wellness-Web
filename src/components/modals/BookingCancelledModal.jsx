import React from "react";

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    background: "rgba(0,0,0,0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    fontFamily: "'Nunito', sans-serif",
  },

  modal: {
    width: "320px",
    background: "#021238",
    borderRadius: "0 0 18px 18px",
    padding: "22px 18px 16px",
    position: "relative",
  },

  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "14px",
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    lineHeight: 1,
  },

  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "10px",
    marginTop: "24px",
  },

  desc: {
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
    fontSize: "13px",
    lineHeight: "1.7",
    marginBottom: "18px",
  },

  summaryCard: {
    border: "1px solid rgba(255,255,255,0.45)",
    borderRadius: "12px",
    padding: "16px 14px",
    marginBottom: "44px",
  },

  summaryHeading: {
    color: "#fff",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.8px",
    marginBottom: "18px",
  },

  row: {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
  },

  iconBox: {
    width: "28px",
    height: "28px",
    borderRadius: "8px",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "12px",
    flexShrink: 0,
  },

  label: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "11px",
    marginBottom: "2px",
  },

  value: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "700",
  },

  button: {
    width: "100%",
    height: "40px",
    border: "none",
    borderRadius: "6px",
    background: "linear-gradient(90deg, #5B2DBD 0%, #8B36D9 100%)",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "14px",
  },

  support: {
    textAlign: "center",
    fontSize: "12px",
    color: "rgba(255,255,255,0.65)",
  },

  supportLink: {
    color: "#fff",
    fontWeight: "700",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

const CalendarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FF6B57"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#5A6BFF"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function BookingCancelledModal({ onClose }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Close */}
        <button style={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        {/* Title */}
        <h2 style={styles.title}>Booking Cancelled</h2>

        {/* Description */}
        <p style={styles.desc}>
          Are you sure you want to cancel your
          <br />
          session? This action cannot be undone.
        </p>

        {/* Summary Card */}
        <div style={styles.summaryCard}>
          <div style={styles.summaryHeading}>CONSULTATION SUMMARY</div>

          {/* Date */}
          <div style={styles.row}>
            <div style={styles.iconBox}>
              <CalendarIcon />
            </div>

            <div>
              <div style={styles.label}>Date</div>
              <div style={styles.value}>Monday, May 24, 2024</div>
            </div>
          </div>

          {/* Time */}
          <div style={{ ...styles.row, marginBottom: 0 }}>
            <div style={styles.iconBox}>
              <ClockIcon />
            </div>

            <div>
              <div style={styles.label}>Slot & Duration</div>
              <div style={styles.value}>10:00 AM • 45 Minutes</div>
            </div>
          </div>
        </div>

        {/* Button */}
        <button style={styles.button}>
          Back to My Consultations
        </button>

        {/* Footer */}
        <div style={styles.support}>
          Need help?{" "}
          <span style={styles.supportLink}>
            Contact Support
          </span>
        </div>
      </div>
    </div>
  );
}