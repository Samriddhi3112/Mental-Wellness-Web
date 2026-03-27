import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/back-icon.svg";
import meditation from "../../assets/images/meditation-two.png";
import rightarrowicon from "../../assets/images/right-arrow-icon.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveStep1 } from "../../features/onboarding/onboardingSlice";
import { toast } from "react-toastify";

const Step1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const step1Data = useSelector((state) => state.onboarding.step1);

  const [form, setForm] = useState({
    name: step1Data?.name || "",
    age: step1Data?.age || "",
    gender: step1Data?.gender || "",
    bodyWeight: step1Data?.bodyWeight || "",
    height: step1Data?.height || "",
    educationLevel: step1Data?.educationLevel || "",
    occupation: step1Data?.occupation || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value === "") {
      setForm({
        ...form,
        [name]: value,
      });
      return;
    }

    if (["age", "bodyWeight", "height"].includes(name)) {
      if (Number(value) < 0) return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  //   useEffect(() => {
  //   const handleBack = () => {
  //     window.location.replace("/"); // 👈 force redirect (no history)
  //   };

  //   window.addEventListener("popstate", handleBack);

  //   return () => {
  //     window.removeEventListener("popstate", handleBack);
  //   };
  // }, []);

  const handleContinue = () => {
    const {
      name,
      age,
      gender,
      bodyWeight,
      height,
      educationLevel,
      occupation,
    } = form;

    if (
      !name ||
      !age ||
      !gender ||
      !bodyWeight ||
      !height ||
      !educationLevel ||
      !occupation
    ) {
      toast.error("All fields are required");
      return;
    }
    const payload = {
      ...form,
      age: Number(form.age),
      bodyWeight: Number(form.bodyWeight),
      height: Number(form.height),
    };

    dispatch(saveStep1(payload));

    navigate("/onboarding2");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 b">
          <div className="login-left">
            <div className="logo-container">
              <div className="logo-icon">
                <img src={logo} alt="Logo" />
              </div>
            </div>

            <NavLink to="/" className="back-btn">
              <img src={backIcon} alt="back-icon" />
              Back
            </NavLink>

            <div className="text-center">
              <div className="meditation-illustration">
                <img src={meditation} alt="meditation" />
              </div>

              <p className="copyright">
                © 2026 Serene Wellness App. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6 d-flex align-items-center justify-content-center absolute">
          <div className="login-right">
            <div className="w-100 fade-in" style={{ maxWidth: 500 }}>
              <h2 className="welcome-title">A space just for you</h2>

              <p className="welcome-description">
                Let's personalize your experience. This will help us support you
                better.
              </p>

              <div className="mb-3">
                <label className="form-label">Step 1 of 2</label>

                <div className="progress">
                  <div className="progress-bar" style={{ width: "50%" }} />
                </div>
              </div>

              <form>
                {/* Name */}
                <div className="form-group">
                  <label className="form-label">Name or Nickname</label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your Name or Nickname"
                  />
                </div>

                {/* Age */}
                <div className="form-group">
                  <label className="form-label">Age</label>

                  <input
                    type="number"
                    name="age"
                    min="0"
                    value={form.age}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your age"
                  />
                </div>

                {/* Gender */}
                <div className="form-group">
                  <label className="form-label">Sex/Gender</label>
                  <div className="custom-select-wrapper">
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="form-control custom-select"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Weight + Height */}
                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label">Body Weight (kg)</label>

                    <input
                      type="number"
                      name="bodyWeight"
                      min="0"
                      value={form.bodyWeight}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="E.g., 72"
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label">Height (cm)</label>

                    <input
                      type="number"
                      name="height"
                      min="0"
                      value={form.height}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="E.g., 175"
                    />
                  </div>
                </div>

                {/* Education */}
                <div className="form-group">
                  <label className="form-label">Education Level</label>
                  <div className="custom-select-wrapper">
                    <select
                      name="educationLevel"
                      value={form.educationLevel}
                      onChange={handleChange}
                      className="form-control custom-select"
                    >
                      <option value="">Select</option>
                      <option value="high_school">High School</option>
                      <option value="diploma">Diploma</option>
                      <option value="bachelors">Bachelors</option>
                      <option value="masters">Masters</option>
                      <option value="phd">PhD</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Occupation */}
                <div className="form-group">
                  <label className="form-label">
                    Occupation / Employment Status
                  </label>

                  <input
                    type="text"
                    name="occupation"
                    value={form.occupation}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="E.g., Student"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleContinue}
                  className="btn-primary-orange"
                >
                  Continue
                  <img src={rightarrowicon} alt="" />
                </button>
              </form>
            </div>

            <p className="text-center english">English (US)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
