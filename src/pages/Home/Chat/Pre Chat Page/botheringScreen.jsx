import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestionFlow,
  setSelectedBothering,
} from "../../../../features/chat/preChatSlice/preChatSlice";
import img1 from "../../../../assets/images/pre-chat.png";

const getOptionIcon = (label = "") => {
  const l = label.toLowerCase();
  if (l.includes("career") || l.includes("study")) return "📚";
  if (l.includes("abuse")) return "🛡️";
  if (l.includes("addiction")) return "💊";
  if (l.includes("relation") || l.includes("love")) return "💝";
  if (l.includes("mental") || l.includes("anxiety")) return "🧠";
  if (l.includes("family")) return "👨‍👩‍👧";
  if (l.includes("grief") || l.includes("loss")) return "🕊️";
  return "💬";
};

const getOptionSubtext = (label = "") => {
  const l = label.toLowerCase();
  if (l.includes("career") || l.includes("study"))
    return "Exams, pressure to perform, marks, concentration, future worries";
  if (l.includes("abuse"))
    return "Physical, emotional, verbal or any kind of abuse or unsafe experiences";
  if (l.includes("addiction"))
    return "Smoking, alcohol, drugs, gaming, social media or any other addiction";
  if (l.includes("relation") || l.includes("love"))
    return "Crush, break-ups, relationship issues, trust, loneliness";
  if (l.includes("anxiety") || l.includes("mental"))
    return "Overthinking, panic, fear, restlessness, worry";
  if (l.includes("family"))
    return "Parent conflicts, sibling issues, family pressure";
  return "Tell us what's on your mind";
};

export default function BotheringScreen() {
  const dispatch = useDispatch();
  const { selectedAgeGroup, botheringOptions, selectedBothering, loading } =
    useSelector((s) => s.preChat);
  console.log("bo", botheringOptions);

  const handleSelect = (opt) => {
    dispatch(setSelectedBothering(opt));
  };

  const handleContinue = () => {
    if (!selectedBothering || !selectedAgeGroup) return;
    dispatch(
      fetchQuestionFlow({
        ageGroup: selectedAgeGroup.code,
        option: selectedBothering.code,
      }),
    );
  };

  return (
    <div className="prechat-wrapper">
      {/* Hero Banner */}
      <div className="prechat-hero">
        <div className="prechat-hero-image">
          <img src={img1} alt="" />
          <div className="hero-overlay" />
        </div>
        <div className="prechat-hero-content">
          <h1 className="hero-title">
            Let's understand what you're going through{" "}
            <span className="heart-icon">🤍</span>
          </h1>
          <p className="hero-subtitle">
            Choose what feels most relevant right now.
          </p>
          {selectedAgeGroup && (
            <div className="age-badge">
              <span className="age-badge-icon">👤</span>
              Age Group: {selectedAgeGroup.label}
            </div>
          )}
        </div>
      </div>

      {/* Question Section */}
      <div className="bothering-section">
        <div className="section-header">
          <span className="sparkle">✦</span>
          <div>
            <h2 className="section-title">What is bothering you the most?</h2>
            <p className="section-hint">You can choose one option</p>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Loading options...</p>
          </div>
        ) : (
          <div className="bothering-grid">
            {botheringOptions?.map((opt) => (
              <button
                key={opt.code}
                className={`bothering-card ${
                  selectedBothering?.code === opt.code ? "selected" : ""
                }`}
                onClick={() => handleSelect(opt)}
              >
                <div className="card-icon">{getOptionIcon(opt.label)}</div>
                <div className="card-title1">{opt.label}</div>
                <div className="card-subtext">
                  {getOptionSubtext(opt.label)}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="privacy-banner">
        <div className="privacy-icon">🔒</div>
        <div className="privacy-text">
          <span className="privacy-title">Your privacy is our priority</span>
          <span className="privacy-sub">
            Everything you share is 100% confidential and safe. You're not
            alone. We're here to support you. 💜
          </span>
        </div>
      </div>

      {/* Continue Button */}
      {selectedBothering && (
        <div className="prechat-footer">
          <button
            className="btn-continue"
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? "Loading..." : "Continue →"}
          </button>
        </div>
      )}
    </div>
  );
}
