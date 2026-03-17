import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/back-icon.svg";
import meditation from "../../assets/images/meditation-two.png";
import rightarrowicon from "../../assets/images/right-arrow-icon.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveStep2 } from "../../features/onboarding/onboardingSlice";

const Step2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const step2Data = useSelector((state) => state.onboarding.step2);

  const [form, setForm] = useState({
    placeOfResidence: step2Data?.placeOfResidence || "",
    maritalStatus: step2Data?.maritalStatus || "",
    familyType: step2Data?.familyType || "",
    livingArrangement: step2Data?.livingArrangement || "",
    motherTongue: step2Data?.motherTongue || "",
    mainFocus: step2Data?.mainFocus || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleContinue = () => {
    const { placeOfResidence, maritalStatus, familyType, livingArrangement, motherTongue, mainFocus} = form;

  if (
    !placeOfResidence ||
    !maritalStatus ||
    !familyType ||
    !livingArrangement ||
    !motherTongue ||
    !mainFocus 
  ) {
    toast.error("All fields are required");
    return;
  }
    dispatch(saveStep2(form));
    navigate("/onboarding3");
  };

  const handleFocusSelect = (value) => {
  setForm((prev) => ({
    ...prev,
    mainFocus: value,
  }));
};

  return (
    <div className="container-fluid">
      <div className="row">
        {/* LEFT SECTION */}

        <div className="col-lg-6 b">
          <div className="login-left">
            <div className="logo-container">
              <div className="logo-icon">
                <img src={logo} alt="Logo" />
              </div>
            </div>

            <NavLink to="/onboarding1" className="back-btn">
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

        {/* RIGHT SECTION */}

        <div className="col-lg-6 d-flex align-items-center justify-content-center absolute">
          <div className="login-right">
            <div className="w-100 fade-in" style={{ maxWidth: 500 }}>
              <h2 className="welcome-title">A space just for you</h2>

              <p className="welcome-description">
                Let's personalize your experience. This will help us support you
                better.
              </p>

              <div className="mb-3">
                <label className="form-label">Step 2 of 2</label>

                <div className="progress">
                  <div className="progress-bar" style={{ width: "100%" }} />
                </div>
              </div>

              <form>
                {/* Residence + Marital */}

                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label">Place of Residence</label>

                    <input
                      type="text"
                      name="placeOfResidence"
                      value={form.placeOfResidence}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="E.g., Noida"
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label">Marital Status</label>
                    <div className="custom-select-wrapper">
                    <select
                      name="maritalStatus"
                      value={form.maritalStatus}
                      onChange={handleChange}
                      className="form-control custom-select"
                    >
                      <option value="">Select</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                      <option value="prefer_not_to_say">
                        Prefer Not To Say
                      </option>
                    </select>
                    </div>
                  </div>
                </div>

                {/* Family Type */}

                <div className="form-group">
                  <label className="form-label">Family Type</label>
                  <div className="custom-select-wrapper">
                  <select
                    name="familyType"
                    value={form.familyType}
                    onChange={handleChange}
                    className="form-control custom-select"
                  >
                    <option value="">Select</option>
                    <option value="nuclear">Nuclear</option>
                    <option value="joint">Joint</option>
                    <option value="extended">Extended</option>
                    <option value="other">Other</option>
                  </select>
                  </div>
                </div>

                {/* Living Arrangement */}

                <div className="form-group">
                  <label className="form-label">Living Arrangement</label>
                  <div className="custom-select-wrapper">
                  <select
                    name="livingArrangement"
                    value={form.livingArrangement}
                    onChange={handleChange}
                    className="form-control custom-select"
                  >
                    <option value="">Select</option>
                    <option value="with_family">With Family</option>
                    <option value="alone">Alone</option>
                    <option value="with_partner">With Partner</option>
                    <option value="with_roommates">With Roommates</option>
                    <option value="other">Other</option>
                  </select>
                  </div>
                </div>

                {/* Mother Tongue */}

                <div className="form-group">
                  <label className="form-label">
                    Language Spoken / Mother Tongue
                  </label>
                  <div className="custom-select-wrapper">
                  <select
                    name="motherTongue"
                    value={form.motherTongue}
                    onChange={handleChange}
                    className="form-control custom-select"
                  >
                    <option value="">Select</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="arabic">Arabic</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                  </select>
                  </div>
                </div>

                {/* Main Focus */}

                <div className="form-group">
                  <label className="form-label">What is your main focus?</label>

                  <div className="row">
                    <div className="col-6">
                      <div
                        className={`form-control ${form.mainFocus === "sleep" ? "active-focus" : ""}`}
                        onClick={() => handleFocusSelect("sleep")}
                      >
                        🌙 Sleep
                      </div>
                    </div>

                    <div className="col-6">
                      <div
                        className={`form-control ${form.mainFocus === "anxiety" ? "active-focus" : ""}`}
                        onClick={() => handleFocusSelect("anxiety")}
                      >
                        😰 Anxiety
                      </div>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-6">
                      <div
                        className={`form-control ${form.mainFocus === "stress" ? "active-focus" : ""}`}
                        onClick={() => handleFocusSelect("stress")}
                      >
                        ⚡ Stress
                      </div>
                    </div>

                    <div className="col-6">
                      <div
                        className={`form-control ${form.mainFocus === "not_sure" ? "active-focus" : ""}`}
                        onClick={() => handleFocusSelect("not_sure")}
                      >
                        🤔 Not Sure
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONTINUE BUTTON */}

                <button
                  type="button"
                  className="btn-primary-orange"
                  onClick={handleContinue}
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

export default Step2;
