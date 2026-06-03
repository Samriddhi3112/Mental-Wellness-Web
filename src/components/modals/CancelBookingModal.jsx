import { useState, useEffect } from "react";
import cancel from "../../assets/images/cancel-booking.png";
import BookingCancelledModal from "./BookingCancelledModal";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelBooking,
  resetBookingState,
} from "../../features/booking/bookingSlice";
import { toast } from "react-toastify";
import BookingDetails from "../../pages/Consultation Booking/BookingDetails";
import { useTranslation } from "react-i18next";

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "2rem 1rem",
    fontFamily: "'Nunito', sans-serif",
  },
  modalCard: {
    background: "#1e1e35",
    borderRadius: "40px",
    padding: "2rem 1.5rem 1.5rem",
    width: "375px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  iconCircle: {
    width: "64px",
    height: "64px",
    background: "#2d2d50",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.2rem",
  },
  iconCalendar: {
    width: "34px",
    height: "34px",
    background: "#e85d5d",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    color: "#f0f0ff",
    fontSize: "20px",
    fontWeight: "800",
    margin: "0 0 0.5rem",
    textAlign: "center",
  },
  modalDesc: {
    color: "#9999bb",
    fontSize: "13px",
    fontWeight: "500",
    textAlign: "center",
    lineHeight: "1.6",
    margin: "0 0 1.2rem",
  },
  policyBox: {
    background: "#FEF2F2",
    border: "1px solid #5a2a2a",
    borderRadius: "12px",
    padding: "0.85rem 1rem",
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "1.4rem",
  },
  policyIcon: {
    width: "18px",
    height: "18px",
    background: "#e85d5d",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: "1px",
    fontSize: "11px",
    color: "white",
    fontWeight: "800",
  },
  policyTextWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  policyHeading: {
    color: "#e85d5d",
    fontSize: "13px",
    fontWeight: "700",
    margin: 0,
  },
  policyBody: {
    color: "#cc8888",
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "1.5",
    margin: 0,
  },
  btnConfirm: {
    width: "100%",
    padding: "14px",
    background: "#7c5cfc",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "15px",
    fontWeight: "700",
    fontFamily: "'Nunito', sans-serif",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "background 0.15s",
  },
  btnCancel: {
    width: "100%",
    padding: "13px",
    background: "transparent",
    border: "1.5px solid #3a3a5a",
    borderRadius: "12px",
    color: "#c0c0e0",
    fontSize: "15px",
    fontWeight: "700",
    fontFamily: "'Nunito', sans-serif",
    cursor: "pointer",
    transition: "border-color 0.15s, background 0.15s",
  },
};

// Calendar X Icon SVG
function CalendarXIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="17" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="9.5" y1="14.5" x2="14.5" y2="19.5" />
      <line x1="14.5" y1="14.5" x2="9.5" y2="19.5" />
    </svg>
  );
}

export default function CancelBookingModal({ onClose, bookingId ,onCancelSuccess}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { cancelLoading, cancelSuccess } = useSelector(
    (state) => state.booking,
  );
  const { bookingDetails } = useSelector((state) => state.booking);

  const [confirmHover, setConfirmHover] = useState(false);
  const [cancelHover, setCancelHover] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");

  useEffect(() => {
  if (cancelSuccess) {
    onCancelSuccess?.({
      booking: bookingDetails,
      cancellationReason,
    });

    dispatch(resetBookingState());
  }
}, [cancelSuccess]);

  // useEffect(() => {
  //   if (cancelSuccess) {
  //     setShowSuccessModal(true);

  //     dispatch(resetBookingState());
  //   }
  // }, [cancelSuccess, dispatch]);

  const handleCancelBooking = () => {
    if (!cancellationReason.trim()) {
      toast.error("Please enter a cancellation reason.");
      return;
    }

    dispatch(
      cancelBooking({
        bookingId,
        cancellationReason,
      }),
    );
  };

  return (
    <>
      <div style={styles.backdrop}>
        <div style={styles.modalCard}>
          {/* Icon */}
          <div>
            <img
              src={cancel}
              alt="Cancel"
              style={{ width: "60%", height: "60%" }}
            />
          </div>

          {/* Title */}
          <p style={styles.modalTitle}>{t("cancelBookingTitle")}</p>

          {/* Description */}
          <p style={styles.modalDesc}>{t("cancelBookingDescription")}</p>

          {/* Policy Box */}
          <div style={styles.policyBox}>
            <div style={styles.policyIcon}>!</div>
            <div style={styles.policyTextWrap}>
              <p style={styles.policyHeading}>{t("cancellationPolicy")}</p>
              <p style={styles.policyBody}>{t("cancellationPolicyText")}</p>
            </div>
          </div>

          <div style={{ width: "100%", marginBottom: "1rem" }}>
            <label
              style={{
                color: "#f0f0ff",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "8px",
                display: "block",
              }}
            >
              {t("reasonForCancellation")}
            </label>

            <textarea
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
                placeholder={t("cancellationPlaceholder")}
              rows={4}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #3a3a5a",
                background: "#2a2a45",
                color: "#fff",
                resize: "none",
                outline: "none",
                fontSize: "14px",
                boxSizing: "border-box",
                fontFamily: "'Nunito', sans-serif",
              }}
            />
          </div>

          {/* 
           Button */}
          <button
            style={{
              ...styles.btnConfirm,
              background: confirmHover ? "#462297" : "#7631B2",
              opacity: cancelLoading ? 0.7 : 1,
            }}
            onMouseEnter={() => setConfirmHover(true)}
            onMouseLeave={() => setConfirmHover(false)}
            onClick={handleCancelBooking}
            disabled={cancelLoading}
          >
            {cancelLoading ? t("cancelling") : t("confirmCancellation")}
          </button>

          {/* Cancel Button */}
          <button
            style={{
              ...styles.btnCancel,
              background: cancelHover ? "#28283f" : "transparent",
              borderColor: cancelHover ? "#5a5a8a" : "#3a3a5a",
            }}
            onMouseEnter={() => setCancelHover(true)}
            onMouseLeave={() => setCancelHover(false)}
            onClick={onClose}
          >
           {t("cancelBookingButton")}
          </button>
        </div>
      </div>
      {/* {showSuccessModal &&
        (console.log("BOOKING DETAILS IN CANCEL MODAL", bookingDetails),
        (
          <BookingCancelledModal
            booking={bookingDetails}
            cancellationReason={cancellationReason}
            onClose={() => setShowSuccessModal(false)}
          />
        ))} */}
    </>
  );
}
