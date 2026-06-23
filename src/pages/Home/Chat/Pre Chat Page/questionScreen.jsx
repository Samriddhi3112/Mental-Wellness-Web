import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAnswer,
  goToBothering,
  showThankYouModal,
} from "../../../../features/chat/preChatSlice/preChatSlice";
import img1 from "../../../../assets/images/pre-chat.png";

const EMOTION_OPTIONS = [
  { emoji: "😨", label: "Scared" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😠", label: "Angry" },
  { emoji: "😶", label: "Numb" },
  { emoji: "😕", label: "Confused" },
];

const getQuestionIcon = (type = "", index = 0) => {
  const icons = ["😟", "🤔", "😔", "😢", "💭", "🧠", "💊", "🛡️"];
  return icons[index % icons.length];
};

export default function QuestionsScreen() {
  const dispatch = useDispatch();
  const {
    selectedAgeGroup,
    selectedBothering,
    questionFlow,
    answers,
    loading,
  } = useSelector((s) => s.preChat);
  console.log("qf",questionFlow)

  const handleAnswer = (questionId, answer) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  const handleContinue = () => {
    dispatch(showThankYouModal());
  };

  const questions = questionFlow?.questions || [];

const allAnswered =
  questions.length > 0 &&
  questions.every((q) => answers[q.id] !== undefined);

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
            Your answers are private and help us support you better. Please answer honestly.
          </p>
          {selectedAgeGroup && (
            <div className="age-badge">
              <span className="age-badge-icon">👤</span>
              Age Group: {selectedAgeGroup.label}
            </div>
          )}
        </div>
      </div>

      {/* Selected Category Header */}
      <div className="questions-container">
        <div className="selected-category-banner">
          <span className="category-icon">
            {selectedBothering?.label?.toLowerCase().includes("abuse")
              ? "🛡️"
              : selectedBothering?.label?.toLowerCase().includes("addiction")
              ? "💊"
              : selectedBothering?.label?.toLowerCase().includes("relation")
              ? "💝"
              : "📚"}
          </span>
          <div>
            <div className="category-title">
              You selected: {selectedBothering?.label}
            </div>
            <div className="category-subtitle">
              Please answer these questions. This will help us understand your
              situation and guide you to the right support.
            </div>
          </div>
        </div>

        {/* Questions List */}
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Loading questions...</p>
          </div>
        ) : (
          <div className="questions-list">
            {questions.map((question, index) => (
              <QuestionItem
                key={question.id}
                question={question}
                index={index}
                answer={answers[question.id]}
                onAnswer={handleAnswer}
              />
            ))}
          </div>
        )}

        {/* Bottom Actions */}
        <div className="questions-footer">
          <button className="btn-back" onClick={() => dispatch(goToBothering())}>
            ← Back
          </button>
          <button className="btn-safe">🛡️ You are safe here</button>
          <button
            className="btn-continue"
            onClick={handleContinue}
            disabled={!allAnswered}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

function QuestionItem({ question, index, answer, onAnswer }) {
  const isEmotionQuestion =
    question.type === "emotion" ||
    question.questionType === "emotion_select" ||
    (question.options && question.options.length > 0 && !question.isBinary);

  const isRadioQuestion =
    question.type === "radio" ||
    question.questionType === "single_choice" ||
    (question.options && question.options.length > 0 && !question.isBinary);

  const isBinary =
    question.isBinary !== false &&
    (!question.options || question.options.length === 0) &&
    question.type !== "emotion";

  return (
    <div
      className={`question-card ${answer !== undefined ? "answered" : ""}`}
    >
      <div className="question-meta">
        <span className="question-emoji">{getQuestionIcon(question.type, index)}</span>
        <span className="question-number">{index + 1}</span>
      </div>
      <div className="question-body">
        <p className="question-text">{question.question || question.text}</p>
        {question.subtitle && (
          <p className="question-sub">
            <span className="info-icon">ℹ️</span> {question.subtitle}
          </p>
        )}

        {/* Emotion chips */}
        {question.type === "emotion" && (
          <div className="emotion-chips">
            {EMOTION_OPTIONS.map((e) => (
              <button
                key={e.label}
                className={`emotion-chip ${answer === e.label ? "selected" : ""}`}
                onClick={() => onAnswer(question.id, e.label)}
              >
                {e.emoji} {e.label}
              </button>
            ))}
          </div>
        )}

        {/* Radio / single choice with labels */}
        {question.options && question.options.length > 0 && question.type !== "emotion" && (
          <div className="radio-options">
            {question.options.map((opt) => (
              <button
                key={opt.value || opt}
                className={`radio-option ${
                  answer === (opt.value || opt) ? "selected" : ""
                }`}
                onClick={() => onAnswer(question.id, opt.value || opt)}
              >
                <span className="radio-circle" />
                {opt.label || opt}
              </button>
            ))}
          </div>
        )}

        {/* Yes / Not really binary */}
        {!question.options?.length && question.type !== "emotion" && (
          <div className="binary-buttons">
            <button
              className={`btn-yes ${answer === "yes" ? "active" : ""}`}
              onClick={() => onAnswer(question.id, "yes")}
            >
              Yes
            </button>
            <button
              className={`btn-no ${answer === "no" ? "active" : ""}`}
              onClick={() => onAnswer(question.id, "no")}
            >
              Not really
            </button>
          </div>
        )}
      </div>
    </div>
  );
}