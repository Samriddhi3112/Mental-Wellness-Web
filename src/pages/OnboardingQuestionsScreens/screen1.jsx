import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOnboardingQuestions,
  nextQuestion,
  resetQuestionIndex,
  prevQuestion,
  submitAnswers,
} from "../../features/onboardingQuestions/questionsSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "../../assets/images/logo.svg";
import playAgain from "../../assets/images/play-again-image.svg";
import phoneIcon from "../../assets/images/phone-icon.svg";
import rightArrow from "../../assets/images/right-arrow-icon.png";
import ImmediateSupportModal from "../../components/modals/ImmediateSupportModal";

const Screen1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetched, setFetched] = useState(false);
  const [responses, setResponses] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [voices, setVoices] = useState([]);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);

  useEffect(() => {
    const unlockAudio = () => {
      const synth = window.speechSynthesis;

      const utterance = new SpeechSynthesisUtterance(" ");
      synth.speak(utterance);

      setIsAudioUnlocked(true);

      window.removeEventListener("click", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
    };
  }, []);

  const languageMap = {
    english: "en-US",
    hindi: "hi-IN",
    bengali: "bn-IN",
    odiya: "or-IN",
    assamese: "as-IN",
    malayalam: "ml-IN",
    tamil: "ta-IN",
  };

  useEffect(() => {
    const synth = window.speechSynthesis;

    // preload voices
    synth.getVoices();

    synth.onvoiceschanged = () => {
      synth.getVoices();
    };
  }, []);

  // const {
  //   questions = [],
  //   currentQuestionIndex = 0,
  //   loading,
  // } = useSelector((state) => state.questions || {});

  const {
  data,
  currentQuestionIndex = 0,
  loading,
} = useSelector((state) => state.questions || {});

const questions = data?.questions || [];
const question = questions[currentQuestionIndex];

  // const question = questions?.[currentQuestionIndex];

  const [answer, setAnswer] = useState("");

  useEffect(() => {
    dispatch(resetQuestionIndex());

    dispatch(getOnboardingQuestions()).then(() => {
      setFetched(true);
    });
  }, [dispatch]);

  useEffect(() => {
    const enableSpeech = () => {
      const msg = new SpeechSynthesisUtterance(" ");
      window.speechSynthesis.speak(msg);
      window.removeEventListener("click", enableSpeech);
    };

    window.addEventListener("click", enableSpeech);
  }, []);

  const handleNext = async (e) => {
    e.preventDefault();

    // ✅ Answer mandatory
    if (!answer.trim()) {
      return toast.error("Please enter your answer before continuing");
    }

    if (!question?._id) return;

    const finalAnswer = answer.trim();

    // Update responses
    const updatedResponses = [...responses];
    const existingIndex = updatedResponses.findIndex(
      (r) => r.questionId === question._id,
    );

    if (existingIndex !== -1) {
      updatedResponses[existingIndex] = {
        questionId: question._id,
        answer: finalAnswer,
      };
    } else {
      updatedResponses.push({
        questionId: question._id,
        answer: finalAnswer,
      });
    }

    setResponses(updatedResponses);

    try {
      // ✅ LAST QUESTION
      if (currentQuestionIndex === questions.length - 1) {
        // ✅ Check all skipped
        const allSkipped = updatedResponses.every(
          (item) => !item.answer || item.answer.trim() === "",
        );

        if (allSkipped) {
          navigate("/home");
          return;
        }

        // ✅ API hit
        // const res = await dispatch(submitAnswers(updatedResponses)).unwrap();
        const filteredResponses = updatedResponses.filter(
          (item) => item.answer && item.answer.trim() !== "",
        );

        const res = await dispatch(submitAnswers(filteredResponses)).unwrap();

        if (res?.success) {
          localStorage.setItem("onboarding_last_shown", Date.now());

          toast.success(res?.message || "Answers submitted successfully");

          // ✅ IMPORTANT: immediateHelp handling
          if (res?.immediateHelp) {
            setShowModal(true); // 👈 modal open (state already bana lo)
          } else {
            navigate("/step-4");
          }
        }
      } else {
        // ✅ Next Question
        dispatch(nextQuestion());
        setAnswer("");
      }
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : error?.message || "Something went wrong";

      const errors = message.split(",").map((err) => {
        const parts = err.split(":");
        return parts[1]?.trim() || parts[0]?.trim();
      });

      errors.forEach((err) => toast.error(err));
    }
  };

  useEffect(() => {
    if (question?.questionText && isAudioUnlocked) {
      setTimeout(() => {
        speakQuestion(question.questionText, question.language);
      }, 700);
    }
  }, [question, isAudioUnlocked]);

  const speakQuestion = (text, langFromAPI) => {
    if (!text) return;

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const languageMap = {
      english: "en-US",
      hindi: "hi-IN",
      bengali: "bn-IN",
      odiya: "or-IN",
      assamese: "as-IN",
      malayalam: "ml-IN",
      tamil: "ta-IN",
    };

    const targetLang = languageMap[langFromAPI?.toLowerCase()] || "en-US";

    const voices = synth.getVoices();

    console.log("🎤 All voices:", voices);

    // ✅ STRICT MATCH
    let matchedVoice = voices.find(
      (v) => v.lang.toLowerCase() === targetLang.toLowerCase(),
    );

    // ✅ fallback
    if (!matchedVoice) {
      matchedVoice = voices.find((v) =>
        v.lang.toLowerCase().includes(targetLang.split("-")[0]),
      );
    }

    // ✅ final fallback
    if (!matchedVoice) {
      matchedVoice = voices[0];
    }

    console.log("✅ Using voice:", matchedVoice?.name, matchedVoice?.lang);

    utterance.voice = matchedVoice;
    utterance.lang = matchedVoice.lang;

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => console.log("🟢 Speaking started");
    utterance.onend = () => console.log("🔴 Speaking ended");
    utterance.onerror = (e) => console.log("❌ Speech error:", e);

    setTimeout(() => {
      synth.speak(utterance);
    }, 500);
  };

  const handleSkip = (e) => {
    e.preventDefault();

    if (!question?._id) return;

    const updatedResponses = [...responses];
    const existingIndex = updatedResponses.findIndex(
      (r) => r.questionId === question._id,
    );

    if (existingIndex !== -1) {
      updatedResponses[existingIndex] = {
        questionId: question._id,
        answer: "",
      };
    } else {
      updatedResponses.push({ questionId: question._id, answer: "" });
    }

    setResponses(updatedResponses);

    if (currentQuestionIndex === questions.length - 1) {
      localStorage.setItem("onboarding_last_shown", Date.now());

      navigate("/home");
      return;
    }

    dispatch(nextQuestion());
    setAnswer("");
  };

  // const handleNext = (e) => {
  //   e.preventDefault();

  //   if (!answer.trim()) {
  //   return toast.error("Please enter your answer before continuing");
  // }

  //   if (!question?._id) return;

  //   const newResponse = {
  //     questionId: question._id,
  //     answer: answer,
  //   };

  //   const updatedResponses = [...responses, newResponse];
  //   setResponses(updatedResponses);

  //   if (currentQuestionIndex === questions.length - 1) {
  //     dispatch(submitAnswers(updatedResponses)).then((res) => {
  //       if (res.payload?.success) {
  //         navigate("/home");
  //       }
  //     });
  //   } else {
  //     dispatch(nextQuestion());
  //     setAnswer("");
  //   }
  // };

  // const handleNext = (e) => {
  //   e.preventDefault();
  //   dispatch(nextQuestion());
  //   setAnswer("");
  // };

  // if (fetched && !loading && questions.length === 0) {
  //   return (
  //     <div className="container text-center mt-5">
  //       <h4>No questions found</h4>
  //       <p>Please try again later.</p>

  //       <button
  //         className="btn btn-primary mt-3"
  //         onClick={() => navigate("/home")}
  //       >
  //         Go to Home
  //       </button>
  //     </div>
  //   );
  // }

  useEffect(() => {
    if (fetched && !loading && questions.length === 0) {
      toast.info("No questions found");
    }
  }, [fetched, loading, questions]);

  const progressWidth =
    questions.length > 0
      ? ((currentQuestionIndex + 1) / questions.length) * 100
      : 0;

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    // const selectedLang = localStorage.getItem("lang") || "en";
    // recognition.lang = languageMap[selectedLang] || "en-US";
    const selectedLang = localStorage.getItem("lang") || "english";
    recognition.lang = languageMap[selectedLang] || "en-US";

    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswer((prev) => (prev ? prev + " " + transcript : transcript));
    };

    recognition.onend = () => setIsListening(false);

    recognition.onerror = (event) => {
      setIsListening(false);

      if (event.error === "no-speech") {
        // ❌ user ne kuch nahi bola → silent handle
        // toast.info("No speech detected. Please try again.");
        return;
      } else if (event.error === "not-allowed") {
        toast.error("Microphone permission denied");
      } else {
        toast.error(event.error || "Voice error");
      }
    };

    // recognition.onerror = (event) => {
    //   setIsListening(false);
    //   toast.error(event.error || "Voice error");
    // };
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      dispatch(prevQuestion());

      const prevResponse = responses[currentQuestionIndex - 1];
      setAnswer(prevResponse?.answer || "");
    }
  };

  //   recognition.onspeechend = () => {
  //   recognition.stop();
  // };

  // const handleSkip = (e) => {
  //   e.preventDefault();

  //   if (!question?._id) return;

  //   const newResponse = {
  //     questionId: question._id,
  //     answer: "",
  //   };

  //   const updatedResponses = [...responses, newResponse];
  //   setResponses(updatedResponses);

  //   if (currentQuestionIndex === questions.length - 1) {
  //     dispatch(submitAnswers(updatedResponses)).then((res) => {
  //       if (res.payload?.success) {
  //         navigate("/home");
  //       }
  //     });
  //   } else {
  //     dispatch(nextQuestion());
  //     setAnswer("");
  //   }
  // };

  const selectedLang = localStorage.getItem("lang") || "en";
  const speechLang = languageMap[selectedLang] || "en-US";
  // useEffect(() => {
  //   window.speechSynthesis.onvoiceschanged = () => {
  //     window.speechSynthesis.getVoices();
  //   };
  // }, []);

  //   recognition.onerror = (event) => {
  //   setIsListening(false);

  //   if (event.error === "no-speech") {
  //     // ❌ user ne kuch nahi bola → silent handle
  //     toast.info("No speech detected. Please try again.");
  //   } else if (event.error === "not-allowed") {
  //     toast.error("Microphone permission denied");
  //   } else {
  //     toast.error(event.error || "Voice error");
  //   }
  // };

  return (
    <div className="container onboarding-screen">
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      {fetched && !loading && questions.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No questions found</h4>
          <p>Please try again later.</p>

          <button
            className="btn btn mt-3 "
            style={{ backgroundColor: "#FF511A" }}
            onClick={() => navigate("/here-to-help")}
          >
            Go to Help
          </button>
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col-12 py-3">
              <img src={logo} alt="Logo" />
            </div>
          </div>

          <div className="row justify-content-center min-vh-80">
            <div className="col-12 col-lg-8 fade-in">
              <div className="text-center mb-4">
                <p className="mb-2 mini-title">A few questions</p>

                <div className="mb-3">
                  <p className="form-label">
                    Step {currentQuestionIndex + 1} of {questions.length}
                  </p>

                  <div
                    className="progress"
                    style={{ margin: "0 auto", height: "8px" }}
                  >
                    <div
                      className="progress-bar"
                      style={{ width: `${progressWidth}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <h2 className="mb-3 title">{question?.title || "N/A"}</h2>
              <p>{question?.questionText || "N/A"}</p>

              <form style={{ margin: "0 auto" }}>
                <div className="mb-4">
                  <textarea
                    className="form-control border rounded-3"
                    rows="4"
                    placeholder="Describe yourself"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  ></textarea>
                </div>

                <div className="text-center mb-4 pb-4">
                  <img
                    src={playAgain}
                    alt="play"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      speakQuestion(question.questionText, question.language)
                    }
                  />
                </div>

                <div className="d-flex justify-content-center gap-3 mb-3 mt-4">
                  <button
                    type="button"
                    onClick={handleVoiceInput}
                    className="btn border d-flex align-items-center gap-2 w-50 justify-content-center"
                  >
                    <img src={phoneIcon} alt="" />
                    <span className="talk-to-expert">
                      {isListening ? "Listening..." : "Speak Answer"}
                    </span>
                  </button>

                  <button
                    type="button"
                    className="btn border w-50"
                    onClick={handleBack}
                    disabled={currentQuestionIndex === 0}
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    className="btn-secondary skip-btn w-50"
                    onClick={handleSkip}
                  >
                    Skip for Now
                  </button>

                  <button
                    type="button"
                    className="btn-primary-orange next-btn w-50"
                    onClick={handleNext}
                    disabled={loading}
                  >
                    {loading ? (
                      "Submitting..."
                    ) : (
                      <>
                        Next &nbsp;
                        <img src={rightArrow} alt="" />
                      </>
                    )}
                    {/* <img src={rightArrow} alt="" /> */}
                  </button>
                </div>
              </form>
            </div>

            <div className="col-12 col-lg-8">
              <div className="row onboarding-footer">
                <div className="col-lg-8">
                  <p>© 2026 Serene Wellness App. All rights reserved.</p>
                </div>

                <div className="col-lg-4">
                  <p className="text-center">English (US)</p>
                </div>
              </div>
            </div>
          </div>

          <ImmediateSupportModal
            show={showModal}
            onClose={() => {
              setShowModal(false);
              navigate("/step-4");
            }}
          />
        </>
      )}
    </div>
  );
};

export default Screen1;
