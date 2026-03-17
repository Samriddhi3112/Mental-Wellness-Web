import React from "react";
import talktoaileft from "../../assets/images/talk-to-ai-left-modal.png";

const TalkToAiModal = ({ show, onClose, onContinue }) => {
  if (!show) return null;

  return (
    <>
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content height-75">
            <div className="modal-body text-center" style={{padding:0}}>
              <div className="row min-vh-70">

                <div
                  className="col-lg-6 d-flex align-items-center justify-content-center p-4"
                  style={{
                    background:
                      "linear-gradient(180deg, #2C3E50 0%, #34495E 100%)",
                  }}
                >
                  <div className="avatar-container">
                    <img src={talktoaileft} alt="" />
                  </div>
                </div>

                <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 bg-white">
                  <div className="w-100 fade-in" style={{ maxWidth: 400 }}>
                    <button
                      className="btn-close btn-close-lg"
                      onClick={onClose}
                    ></button>

                    <div className="text-center mb-4">
                      <p className="mini-sub-title mb-0">Your Companion</p>
                      <h2 className="title">Meet Kai, your guide</h2>
                      <p className="sub-title">
                        Customize your companion's voice and language.
                      </p>
                    </div>

                    <div className="text-center">
                      <button
                        className="btn-primary-orange mb-3"
                        onClick={onContinue}
                      >
                        Continue
                      </button>

                      <button className="btn-secondary">
                        Change Avatar
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default TalkToAiModal;