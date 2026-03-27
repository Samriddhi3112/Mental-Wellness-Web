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

const Screen1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetched, setFetched] = useState(false);
  const [responses, setResponses] = useState([]);

  const {
    questions = [],
    currentQuestionIndex = 0,
    loading,
  } = useSelector((state) => state.questions || {});

  const question = questions?.[currentQuestionIndex];

  const [answer, setAnswer] = useState("");

  useEffect(() => {
    dispatch(resetQuestionIndex());

    dispatch(getOnboardingQuestions()).then(() => {
      setFetched(true);
    });
  }, [dispatch]);

  const handleNext = async (e) => {
    e.preventDefault();

    if (!answer.trim()) {
      toast.error("Please enter your answer before continuing");
      return;
    }

    if (!question?._id) return;

    // Update or add the response
    const updatedResponses = [...responses];
    const existingIndex = updatedResponses.findIndex(
      (r) => r.questionId === question._id,
    );

    if (existingIndex !== -1) {
      updatedResponses[existingIndex] = { questionId: question._id, answer };
    } else {
      updatedResponses.push({ questionId: question._id, answer });
    }

    setResponses(updatedResponses);

    try {
      if (currentQuestionIndex === questions.length - 1) {
        const res = await dispatch(submitAnswers(updatedResponses)).unwrap();

        if (res?.success) {
          localStorage.setItem("onboarding_last_shown", Date.now());
          toast.success(res?.message || "Answers submitted successfully");
          navigate("/home");
        }
      } else {
        dispatch(nextQuestion());
        setAnswer("");
      }
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : error?.message || "Something went wrong";

      // Split by comma and clean each error
      const errors = message.split(",").map((err) => {
        const parts = err.split(":");
        return parts[1]?.trim() || parts[0]?.trim();
      });

      errors.forEach((err) => toast.error(err));
    }
  };

  const handleSkip = (e) => {
    e.preventDefault();

    if (!question?._id) return;

    // Update or add skipped response
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
      dispatch(submitAnswers(updatedResponses)).then((res) => {
        if (res.payload?.success) {
          localStorage.setItem("onboarding_last_shown", Date.now());
          navigate("/home");
        }
      });
    } else {
      dispatch(nextQuestion());
      setAnswer("");
    }
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

  if (fetched && !loading && questions.length === 0) {
    return <Navigate to="/home" />;
  }

  const progressWidth =
    questions.length > 0
      ? ((currentQuestionIndex + 1) / questions.length) * 100
      : 0;

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      dispatch(prevQuestion());

      const prevResponse = responses[currentQuestionIndex - 1];
      setAnswer(prevResponse?.answer || "");
    }
  };

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

  return (
    <div className="container onboarding-screen">
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
              <img src={playAgain} alt="play" />
            </div>

            <div className="d-flex justify-content-center gap-3 mb-3 mt-4">
              <a
                href="#"
                className="btn border d-flex align-items-center gap-2 w-50 justify-content-center"
              >
                <img src={phoneIcon} alt="" />
                <span className="talk-to-expert">Talk to Expert</span>
              </a>
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
              >
                Next &nbsp;
                <img src={rightArrow} alt="" />
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
    </div>
  );
};

export default Screen1;
