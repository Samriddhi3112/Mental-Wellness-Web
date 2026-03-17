import React from "react";
import talktoaileft from "../../assets/images/talk-to-ai-left-modal.png";
import playIcon from "../../assets/images/play-icon.png";

const TalkToAiSettingsModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <>
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content height-75">
            <div className="modal-body" style={{ padding: 0 }}>
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

                    <div className="text-center mb-4 mt-4">
                      <h2 className="title">Meet Kai, your guide</h2>
                      <p className="sub-title">
                        Customize your companion's voice and language.
                      </p>
                    </div>

                    <form>
                      <div className="mb-4">
                        <label className="form-label">Companion's Voice</label>

                        <div className="voice-option active">
                          <div className="d-flex align-items-center gap-3">
                            <input
                              type="radio"
                              name="voice"
                              defaultChecked
                              className="form-check-input m-0"
                            />
                            <span>Aura (Default)</span>
                          </div>

                          <button
                            type="button"
                            className="btn btn-sm"
                            style={{
                              background: "transparent",
                              border: "none",
                            }}
                          >
                            <img src={playIcon} alt="" />
                          </button>
                        </div>
                        <div className="voice-option active">
                          <div className="d-flex align-items-center gap-3">
                            <input
                              type="radio"
                              name="voice"
                              defaultChecked
                              className="form-check-input m-0"
                            />
                            <span>Echo</span>
                          </div>

                          <button
                            type="button"
                            className="btn btn-sm"
                            style={{
                              background: "transparent",
                              border: "none",
                            }}
                          >
                            <img src={playIcon} alt="" />
                          </button>
                        </div>
                        <div className="voice-option active">
                          <div className="d-flex align-items-center gap-3">
                            <input
                              type="radio"
                              name="voice"
                              defaultChecked
                              className="form-check-input m-0"
                            />
                            <span>Nova</span>
                          </div>

                          <button
                            type="button"
                            className="btn btn-sm"
                            style={{
                              background: "transparent",
                              border: "none",
                            }}
                          >
                            <img src={playIcon} alt="" />
                          </button>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label">Language</label>

                        <select className="form-control">
                          <option>English (US)</option>
                          {/* <option>Spanish</option>
                          <option>Hindi</option> */}
                        </select>
                      </div>

                      <button className="btn-primary-orange">
                        Save & Continue
                      </button>
                    </form>
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

export default TalkToAiSettingsModal;
