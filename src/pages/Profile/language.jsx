import React from "react";
import flag1 from "../../assets/images/flag1.png";
import flag2 from "../../assets/images/flag2.png";
import flag3 from "../../assets/images/flag3.png";
import flag4 from "../../assets/images/flag4.png";
import flag5 from "../../assets/images/flag5.png";
import flag6 from "../../assets/images/flag6.png";
import flag7 from "../../assets/images/flag7.png";
import flag8 from "../../assets/images/flag8.png";
import flag9 from "../../assets/images/flag9.png";
import flag10 from "../../assets/images/flag10.png";
import flag11 from "../../assets/images/flag11.png";

const Language = () => {
  const languages = [
    { name: "English", flag: flag1, selected: true },
    { name: "Spanish", flag: flag2 },
    { name: "French", flag: flag3 },
    { name: "German", flag: flag4 },
    { name: "Italian", flag: flag5 },
    { name: "Portuguese", flag: flag6 },
    { name: "Japanese", flag: flag7 },
    { name: "Korean", flag: flag8 },
    { name: "Chinese (Simplified)", flag: flag9 },
    { name: "Hindi", flag: flag10 },
    { name: "Arabic", flag: flag11 },
  ];

  return (
    <div className="main-content">
      <div className="language-container">
        {/* Current Language */}
        <div className="language-section">
          <div className="section-header">Current Language</div>
          {languages
            .filter((lang) => lang.selected)
            .map((lang, idx) => (
              <div
                key={idx}
                className="language-item selected border-radius"
              >
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
          <div className="section-header">Available Languages</div>
          {languages.map((lang, idx) => {
            if (lang.selected) return null; // Skip current language

            // Add border radius classes for first/last items
            const classNames = ["language-item"];
            if (idx === 1) classNames.push("border-radius-top"); // first available
            if (idx === languages.length - 1) classNames.push("border-radius-bottom");

            return (
              <div key={idx} className={classNames.join(" ")}>
                <div className="language-flag">
                  <img src={lang.flag} alt={lang.name} />
                </div>
                <div className="language-name">{lang.name}</div>
                <div className="check-icon">✓</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Language;