import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { analyzeOnboarding } from "../../features/onboarding/onboardingSlice";

import logo from "../../assets/images/logo-dark.svg";
import meditationImg from "../../assets/images/meditation-two.png";
import thanksIcon from "../../assets/images/thnks-for-sharing-icon.svg";
import rightArrow from "../../assets/images/right-arrow-icon.png";

import icon1 from "../../assets/images/thnks-for-sharing-one.svg";
import icon2 from "../../assets/images/thnks-for-sharing-two.svg";
import icon3 from "../../assets/images/thnks-for-sharing-three.svg";
import { useTranslation } from "react-i18next";

const icons = [icon1, icon2, icon3];

const Step4ThanksForSharing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { analysisData, loading } = useSelector(
    (state) => state.onboarding || {},
  );

  const hasCalled = useRef(false);
  const issues = analysisData?.issues || [];
  console.log("analysisData:", analysisData);
  console.log("u", issues);

  useEffect(() => {
    if (!hasCalled.current && (!analysisData || analysisData.length === 0)) {
      dispatch(analyzeOnboarding());
      hasCalled.current = true;
    }
  }, [dispatch, analysisData]);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-lg-6">
          <div className="login-left">
            <div className="logo-container">
              <div className="logo-icon">
                <img src={logo} alt="Logo" />
              </div>
            </div>

            {/* <button
              className="back-btn"
              onClick={() => navigate(-1)}
              style={{ background: "none", border: "none" }}
            >
              ← Back
            </button> */}

            <div className="text-center">
              <div className="meditation-illustration">
                <img src={meditationImg} alt="meditation" />
              </div>

              <p className="copyright">{t("copyright")}</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <div className="login-right">
            <div className="w-100 fade-in" style={{ maxWidth: 350 }}>
              <p className="welcome-mini-sub-title">{t("understandingYou")}</p>

              <div className="text-center my-4">
                <img src={thanksIcon} alt="thanks" />
              </div>

              <h2 className="welcome-title">{t("thankYouForSharing")}</h2>

              <p className="welcome-description">{t("basedOnResponses")}</p>

              <label className="welcome-description text-start mb-2">
                {t("identifiedFocusAreas")}
              </label>

              {/* 🔄 LOADER */}

              {loading ? (
                <p
                  style={{
                    marginTop: "20px",
                    padding: "10px 16px",
                    background: "#fff3cd",
                    color: "#856404",
                    border: "1px solid #ffeeba",
                    borderRadius: "8px",
                    fontWeight: "500",
                    textAlign: "center",
                    width: "fit-content",
                    marginInline: "auto",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  {t("analyzingResponses")}
                </p>
              ) : issues.length > 0 ? (
                issues.map((item, index) => (
                  <div key={index} className="mb-3 p-3 border rounded-3">
                    <div className="row">
                      <div className="col-2">
                        <img src={icons[index % icons.length]} alt="icon" />
                      </div>

                      <div className="col-10">
                        <p className="welcome-mini-sub-title text-start">
                          {item.title}
                        </p>

                        <p className="welcome-description text-start">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>{t("noInsights")}</p>
              )}

              <p className="text-center mt-3 footer-text">
                {t("journeyStart")}
              </p>

              <button
                type="button"
                className="btn-primary-orange w-100"
                onClick={() => navigate("/home")}
              >
                {t("continueBtn")} &nbsp;
                <img src={rightArrow} alt="" />
              </button>
            </div>

            <p className="text-center english">{t("currentLanguageLabel")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4ThanksForSharing;
