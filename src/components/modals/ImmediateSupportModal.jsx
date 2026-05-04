import React from "react";

const ImmediateSupportModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box text-center">
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="mb-3">
          <div className="support-icon">💙</div>
        </div>

        <h4>Immediate Support</h4>
        <p>
          If you are in crisis or feel you need immediate support, please reach
          out. You are not alone.
        </p>

        <button className="btn-primary-orange w-100 mb-2">
          📞 1800-89**-8999
        </button>

        <button className="btn border w-100">
          Book a consultation
        </button>
      </div>
    </div>
  );
};

export default ImmediateSupportModal;