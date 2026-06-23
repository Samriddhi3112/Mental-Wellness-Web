import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideThankYouModal } from "../../features/chat/preChatSlice/preChatSlice";
import { useNavigate } from "react-router-dom";

export default function ThankYouModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showThankYou } = useSelector((s) => s.preChat);

  if (!showThankYou) return null;

  const handleGotIt = () => {
    dispatch(hideThankYouModal());
    // Navigate to chat screen
    navigate("/chat");
  };

  return (
    <div className="modal-backdrop">
      <div className="thankyou-modal">
        <div className="thankyou-icon">💜</div>
        <h2 className="thankyou-title">Thank you for your answers</h2>
        <p className="thankyou-text">
          I understand what exactly your mental status is. Please feel safe here.
          I will never judge you.
        </p>
        <button className="btn-gotit" onClick={handleGotIt}>
          Got it
        </button>
      </div>
    </div>
  );
}