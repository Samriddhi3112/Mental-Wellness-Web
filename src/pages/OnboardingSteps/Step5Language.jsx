import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  analyzeOnboarding,
  updateUserProfile,
} from "../../features/onboarding/onboardingSlice";
import { toast } from "react-toastify";

import logo from "../../assets/images/logo1.png";
import meditationImg from "../../assets/images/meditation-two.png";
import thanksIcon from "../../assets/images/thnks-for-sharing-icon.svg";
import rightArrow from "../../assets/images/right-arrow-icon.png";

// flags
import flag1 from "../../assets/images/flag1.png";
import flag2 from "../../assets/images/flag2.png";
import flag3 from "../../assets/images/flag3.png";
import flag4 from "../../assets/images/flag4.png";
import flag5 from "../../assets/images/flag5.png";
import flag6 from "../../assets/images/flag6.png";
import flag7 from "../../assets/images/flag7.png";
import i18n from "../../i18n";

const Step5Language = () => {
  const dispatch = useDispatch();

  const [currentLang, setCurrentLang] = useState("english");
  const navigate = useNavigate();

  const { analysisData, loading } = useSelector(
    (state) => state.onboarding || {},
  );

  useEffect(() => {
  let savedLang = localStorage.getItem("lang");

  if (!savedLang) {
    savedLang = "english"; // ✅ default fix
    localStorage.setItem("lang", savedLang);
  }

  setCurrentLang(savedLang); // ✅ sync state

  const i18nLang = langMap[savedLang] || "en";
  i18n.changeLanguage(i18nLang);
}, []);

//   useEffect(() => {
//   const savedLang = localStorage.getItem("lang");

//   if (savedLang) {
//     const i18nLang = langMap[savedLang] || "en";
//     i18n.changeLanguage(i18nLang);
//   }
// }, []);

  const langMap = {
  english: "en",
  hindi: "hi",
  bengali: "bn",
  odiya: "or",
  assamese: "as",
  malayalam: "ml",
  tamil: "ta",
};
  const hasCalled = useRef(false);
  // const languages = [
  //   { name: "English", code: "enlish", flag: flag1 },
  //   { name: "Hindi", code: "hindi", flag: flag2 },
  //   { name: "Bengali", code: "bengali", flag: flag3 },
  //   { name: "Odiya", code: "or", flag: flag4 },
  //   { name: "Assamese", code: "as", flag: flag5 },
  //   { name: "Malayalam", code: "ml", flag: flag6 },
  //   { name: "Tamil", code: "ta", flag: flag7 },
  // ];
  const languages = [
    { name: "English", code: "english", flag: flag1 },
    { name: "Hindi", code: "hindi", flag: flag2 },
    { name: "Bengali", code: "bengali", flag: flag3 },
    { name: "Odiya", code: "odiya", flag: flag4 },
    { name: "Assamese", code: "assamese", flag: flag5 },
    { name: "Malayalam", code: "malayalam", flag: flag6 },
    { name: "Tamil", code: "tamil", flag: flag7 },
  ];

  // const [currentLang, setCurrentLang] = useState(
  //   localStorage.getItem("lang") || "english",
  // );
  // const [currentLang, setCurrentLang] = useState(
  //   localStorage.getItem("lang") || "english",
  // );

  // useEffect(() => {
  //   if (!hasCalled.current && (!analysisData || analysisData.length === 0)) {
  //     dispatch(analyzeOnboarding());
  //     hasCalled.current = true;
  //   }
  // }, [dispatch, analysisData]);

  // const handleLanguageChange = (langCode) => {
  //   setCurrentLang(langCode);
  //   localStorage.setItem("lang", langCode);
  //   i18n.changeLanguage(langCode);
  // };

  const handleLanguageChange = (langCode) => {
  setCurrentLang(langCode);
  localStorage.setItem("lang", langCode);

  const i18nLang = langMap[langCode] || "en";
  i18n.changeLanguage(i18nLang);
};

const handleSubmit = async () => {
  try {
    await dispatch(
      updateUserProfile({ language: currentLang }) // ✅ send "english"
    ).unwrap();

    toast.success("Profile updated successfully");
    navigate("/screen1");
  } catch (error) {
    const message = error?.message || "";
    const errors = message.split(",");
    errors.forEach((err) => toast.error(err.trim()));
  }
};

  // const handleSubmit = async () => {
  //   try {
  //     await dispatch(updateUserProfile({ language: currentLang })).unwrap();
  //     // await dispatch(updateUserProfile()).unwrap();

  //     toast.success("Profile updated successfully");
  //     navigate("/screen1");
  //   } catch (error) {
  //     const message = error?.message || "";
  //     const errors = message.split(",");

  //     errors.forEach((err) => {
  //       toast.error(err.trim());
  //     });
  //   }
  // };
  const selectedLang =
    languages.find((lang) => lang.code === currentLang) ||
    languages.find((lang) => lang.code === "english");

  return (
    <div className="container-fluid">
      <div className="row" style={{minHeight:"100vh"}}>
        {/* LEFT SIDE */}
        <div className="col-lg-6" style={{borderRight: "1px solid #fff"}}>
          <div className="login-left">
            <div className="logo-container">
              <div className="logo-icon">
                <img src={logo} alt="Logo" />
              </div>
            </div>

            <div className="text-center">
              <div className="meditation-illustration">
                <img src={meditationImg} alt="meditation" />
              </div>

              <p className="copyright">
                © 2026 Serene Wellness App. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center" style={{background: "#030f25"}}>
          <div className="login-right">
            <div className="w-100 fade-in" style={{ maxWidth: 380 }}>
              <p className="welcome-mini-sub-title text-center">
                Select Language
              </p>

              <div className="text-center my-3">
                <img src={thanksIcon} alt="thanks" />
              </div>

              <div className="language-container">
                {/* Current Language */}
                <div className="language-section mb-3">
                  <div className="section-header">Current Language</div>

                  <div className="language-item selected border-radius d-flex align-items-center justify-content-between p-2">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={selectedLang.flag}
                        alt={selectedLang.name}
                        width={24}
                      />
                      <span style={{ color: "#fff" }}>{selectedLang.name}</span>
                    </div>
                    <span>✓</span>
                  </div>
                </div>

                {/* Available Languages */}
                <div className="language-section">
                  <div className="section-header">Available Languages</div>

                  {languages
                    .filter((lang) => lang.code !== selectedLang.code)
                    .map((lang, idx, arr) => {
                      const classNames = [
                        "language-item",
                        "d-flex",
                        "align-items-center",
                        "justify-content-between",
                        "p-2",
                      ];

                      if (idx === 0) classNames.push("border-radius-top");
                      if (idx === arr.length - 1)
                        classNames.push("border-radius-bottom");

                      return (
                        <div
                          key={idx}
                          className={classNames.join(" ")}
                          onClick={() => handleLanguageChange(lang.code)}
                          style={{ cursor: "pointer", color: "#fff" }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <img src={lang.flag} alt={lang.name} width={24} />
                            <span>{lang.name}</span>
                          </div>
                          <span></span>
                        </div>
                      );
                    })}
                </div>
              </div>

              <button
                type="button"
                className="btn-primary-orange w-100 mt-4"
                onClick={handleSubmit} // ✅ FIXED
                disabled={loading}
              >
                {loading ? "Submitting..." : "Agree & Continue"} &nbsp;
                <img src={rightArrow} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5Language;
