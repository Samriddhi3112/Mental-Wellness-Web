import React, { useEffect } from "react";
import emergencyImg from "../../assets/images/emergency-logo-top.svg";
import { useNavigate } from "react-router-dom";

const EmergencyModal = ({ show, onClose }) => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  if (!show) return null;

  const handleNext = () => {
    navigate("/therapy-session");
  };

  return (
    <div className="custom-modal-overlay">
      <div
        className="custom-modal"
        style={{ width: "390px", background: "#030f25" }}
      >
        <button
          className="close-btn"
          onClick={onClose}
          style={{
            color: "#fff",
            background: "transparent",
            border: "none",
          }}
        >
          ✕
        </button>

        <div className="text-center p-4">
          <div className="mb-3">
            <img src={emergencyImg} alt="" />
          </div>

          <h2 className="title" style={{ textAlign: "center", color: "#fff" }}>
            Your well-being is important
          </h2>

          <p className="sub-title" style={{color:"#fff"}}>
            It seems like you're going through a very difficult time. Please
            consider reaching out for immediate help
          </p>

          <button className="btn-primary-orange mb-3">📞 1800-891-8999</button>

          <button className="btn-secondary mb-3" onClick={handleNext}>
            📅 Book a consultation
          </button>

          <div
            onClick={onClose}
            style={{
              color: "#fff",
              textAlign: "center",
              cursor: "pointer",
              marginTop: "12px",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            Continue with AI support
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyModal;
