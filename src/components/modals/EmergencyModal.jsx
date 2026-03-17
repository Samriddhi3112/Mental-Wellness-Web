import React, { useEffect } from "react";
import emergencyarrowicon from "../../assets/images/emergengy-arrow-icon.svg";

const EmergencyModal = ({ show, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  if (!show) return null;

  return (
    <>
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body text-center p-4">
              <div className="mb-3">
                <img src={emergencyarrowicon} alt="" />
              </div>

              <h2 className="title">Immediate Support</h2>

              <p className="sub-title">
                If you are in crisis or feel you need immediate support,
                please reach out. You are not alone.
              </p>

              <button className="btn-primary-orange mb-3">
                1800-891-8999
              </button>

              <button className="btn-secondary">
                Book a consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default EmergencyModal;