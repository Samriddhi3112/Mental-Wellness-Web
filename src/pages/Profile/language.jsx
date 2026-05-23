import React, { useEffect, useState } from "react";
import i18n from "i18next";

import flag1 from "../../assets/images/flag1.png"; // English
import flag2 from "../../assets/images/flag2.png"; // Hindi
import flag3 from "../../assets/images/flag3.png"; // Bengali
import flag4 from "../../assets/images/flag4.png"; // Odia
import flag5 from "../../assets/images/flag5.png"; // Assamese
import flag6 from "../../assets/images/flag6.png"; // Malayalam
import flag7 from "../../assets/images/flag7.png"; // Tamil
import { useTranslation } from "react-i18next";

const Language = () => {
  const { t } = useTranslation();
  const languageMap = {
    english: "english",
    hindi: "hi",
    bengali: "bn",
    odiya: "or",
    assamese: "as",
    malayalam: "ml",
    tamil: "ta",
  };
  const getLangKeyFromCode = (code) => {
    return (
      Object.keys(languageMap).find((key) => languageMap[key] === code) ||
      "english"
    );
  };

  const [currentLang, setCurrentLang] = useState(
    getLangKeyFromCode(i18n.language),
  );
  // const [currentLang, setCurrentLang] = useState(
  //   localStorage.getItem("lang") || "en"
  // );

  const languages = [
    { name: "English", code: "english", flag: flag1 },
    { name: "Hindi", code: "hindi", flag: flag2 },
    { name: "Bengali", code: "bengali", flag: flag3 },
    { name: "Odiya", code: "odiya", flag: flag4 },
    { name: "Assamese", code: "assamese", flag: flag5 },
    { name: "Malayalam", code: "malayalam", flag: flag6 },
    { name: "Tamil", code: "tamil", flag: flag7 },
  ];

  // const languages = [
  //   { name: "English", code: "en", flag: flag1 },
  //   { name: "Hindi", code: "hi", flag: flag2 },
  //   { name: "Bengali", code: "bn", flag: flag3 },
  //   { name: "Odia", code: "or", flag: flag4 },
  //   { name: "Assamese", code: "as", flag: flag5 },
  //   { name: "Malayalam", code: "ml", flag: flag6 },
  //   { name: "Tamil", code: "ta", flag: flag7 },
  // ];

  useEffect(() => {
    setCurrentLang(getLangKeyFromCode(i18n.language));
  }, []);

  const handleLanguageChange = (langKey) => {
    setCurrentLang(langKey);

    const langCode = languageMap[langKey]; // convert to en/hi
    i18n.changeLanguage(langCode);

    localStorage.setItem("lang", langKey);
  };

  return (
    <div className="main-content">
      <div className="language-container">
        {/* Current Language */}
        <div className="language-section">
          <div className="section-header">{t("currentLanguage")}</div>

          {languages
            .filter((lang) => lang.code === currentLang)
            .map((lang, idx) => (
              <div key={idx} className="language-item selected border-radius">
                <div className="language-flag">
                  <img src={lang.flag} alt={lang.name} />
                </div>
                <div className="language-name">{lang.name}</div>
                <div className="check-icon">✓</div>
              </div>
            ))}
        </div>

        {/* Available Languages */}
        <div className="language-section">
          <div className="section-header">{t("availableLanguages")}</div>
          {/* <div className="section-header">Available Languages</div> */}

          {languages
            .filter((lang) => lang.code !== currentLang)
            .map((lang, idx, arr) => {
              const classNames = ["language-item"];

              if (idx === 0) classNames.push("border-radius-top");
              if (idx === arr.length - 1)
                classNames.push("border-radius-bottom");

              return (
                <div
                  key={idx}
                  className={classNames.join(" ")}
                  onClick={() => handleLanguageChange(lang.code)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="language-flag">
                    <img src={lang.flag} alt={lang.name} />
                  </div>
                  <div className="language-name">{lang.name}</div>
                  <div className="check-icon"></div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Language;
