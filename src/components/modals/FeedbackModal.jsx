import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import welldoneIcon from "../../assets/images/weldone-icon.png"; // adjust path

const FeedbackModal = ({ show, handleClose }) => {
  const [selected, setSelected] = useState("Better");

  const options = [
    { label: "Much Better", emoji: "😊" },
    { label: "Better", emoji: "😌" },
    { label: "The Same", emoji: "😐" },
    { label: "A Bit Worse", emoji: "😟" },
  ];

  const handleSubmit = () => {
    console.log("Selected Feedback:", selected);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="feedback-modal"
    >
      <Modal.Header closeButton />
      <Modal.Body className="text-center p-4">
        <div className="modal-custom">
          <div>
            <img src={welldoneIcon} alt="" />
          </div>

          <h2>Well done!</h2>
          <p>
            You've completed the Mindful Breathing activity. How are you feeling
            now?
          </p>

          <div className="emoji-grid">
            {options.map((item) => (
              <div
                key={item.label}
                className={`emoji-option ${
                  selected === item.label ? "selected" : ""
                }`}
                onClick={() => setSelected(item.label)}
                style={{ cursor: "pointer" }}
              >
                <div className="emoji-icon">{item.emoji}</div>
                <div
                  className={`emoji-label ${
                    selected === item.label ? "text-white" : ""
                  }`}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <button className="btn-primary-orange mb-3" onClick={handleSubmit}>
            Submit Feedback
          </button>

          <button className="btn-secondary" onClick={handleClose}>
            Skip
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FeedbackModal;
