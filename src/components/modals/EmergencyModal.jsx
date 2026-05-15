import React, { useEffect } from "react";
import emergencyImg from "../../assets/images/emergency-logo-top.svg"
import { useNavigate } from "react-router-dom";

const EmergencyModal = ({ show, onClose }) => {
  const navigate = useNavigate()
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  if (!show) return null; 

  const handleNext = () => {
    navigate('/therapy-session')
  }

  return (
    <div className="custom-modal-overlay" >
      <div className="custom-modal" style={{width:"390px"}}>
        
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="text-center p-4">
          <div className="mb-3">
            <img src={emergencyImg} alt="" />
          </div>

          <h2 className="title" style={{textAlign:"center"}}>Immediate Support</h2>

          <p className="sub-title">
            If you are in crisis or feel you need immediate support, please reach out. You are not alone.
          </p>

          <button className="btn-primary-orange mb-3">
            📞 1800-891-8999
          </button>

          <button className="btn-secondary" onClick={handleNext}>
            📅 Book a consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyModal;