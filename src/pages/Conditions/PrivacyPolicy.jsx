import React, { useEffect } from "react";
import { getPrivacyPolicy } from "../../features/services/serviceSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../layout/Header";

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const { privacyPolicy, loading } = useSelector(
    (state) => state.services || {},
  );
  console.log(privacyPolicy);
  

  useEffect(() => {
    dispatch(getPrivacyPolicy());
  }, []);

  return (
    <div>
      <Header/>
      <div className="main-content">
        <div className="document-container">
          <div className="document-card">
            <div className="document-header">
              <div className="document-label">Agreement</div>
              <h1 className="document-title">
                {privacyPolicy?.data.title || "Privacy Policy"}
              </h1>
              <div className="document-date">
                Last updated on{" "}
                {privacyPolicy?.data.updatedAt
                  ? new Date(privacyPolicy.data.updatedAt).toLocaleDateString()
                  : "-"}
              </div>
            </div>
            <div className="document-section">
              <p className="section-content">{privacyPolicy?.data.content || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h3 className="offcanvas-title" id="offcanvasRightLabel" />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="px-4">
            <div className="text-center mb-4">
              <p className="mini-sub-title mb-4 pb-3">Your Companion</p>
              <h2 className="title">Meet Kai, your guide</h2>
              <p className="sub-title">
                We've selected a friendly companion for your journey. You can
                change this anytime in settings.
              </p>
              <img src="images/offcanvas-image-one.svg" alt />
            </div>
          </div>
        </div>
        <div className="notification-footer border-top">
          <div className="text-center">
            <button
              className="btn-primary-orange mb-3"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRightSecond"
              aria-controls="offcanvasRight"
            >
              Continue
            </button>
            <button className="btn-secondary">Change Avatar</button>
          </div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasRightSecond"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h3 className="offcanvas-title" id="offcanvasRightLabel" />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="px-2">
            <div className="text-center mb-4 mt-4">
              <img src="images/offcanvas-image-two.svg" alt />
              <h2 className="title">Meet Kai, your guide</h2>
              <p className="sub-title">
                Customize your companion's voice and language.
              </p>
            </div>
            <form>
              {/* Voice Selection */}
              <div className="mb-4">
                <label className="form-label">Companion's Voice</label>
                <div className="voice-option active">
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="radio"
                      name="voice"
                      defaultValue="aura"
                      defaultChecked
                      className="form-check-input m-0"
                      style={{ cursor: "pointer" }}
                    />
                    <span>Aura (Default)</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#FF5722",
                    }}
                  >
                    <img src="images/play-icon.png" alt />
                  </button>
                </div>
                <div className="voice-option">
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="radio"
                      name="voice"
                      defaultValue="echo"
                      className="form-check-input m-0"
                      style={{ cursor: "pointer" }}
                    />
                    <span>Echo</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#FF5722",
                    }}
                  >
                    <img src="images/play-icon.png" alt />
                  </button>
                </div>
                <div className="voice-option">
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="radio"
                      name="voice"
                      defaultValue="nova"
                      className="form-check-input m-0"
                      style={{ cursor: "pointer" }}
                    />
                    <span>Nova</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#FF5722",
                    }}
                  >
                    <img src="images/play-icon.png" alt />
                  </button>
                </div>
              </div>
              {/* Language Selection */}
              <div className="mb-4">
                <label className="form-label">Language</label>
                <select className="form-control">
                  <option selected>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Hindi</option>
                </select>
              </div>
              {/* Background Music Toggle */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center form-control">
                  <div>
                    <div className="form-label mb-1">Background Music</div>
                    <small className="text-muted" style={{ fontSize: 13 }}>
                      Calm music during sessions
                    </small>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="bgMusic"
                      defaultChecked
                      style={{ width: 50, height: 26, cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="notification-footer border-top">
          <div className="text-center">
            <button type="button" className="btn-primary-orange">
              Save &amp; Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
