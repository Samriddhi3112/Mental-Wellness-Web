import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaqs } from "../../features/setting/faqSlice";
import { FaQuestionCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import arrowIcon from "../../assets/images/right-arrow-icon.svg";

const FaqPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { faqs, loading, error } = useSelector((state) => state.faq);

  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);

  return (
    <div className="main-content">
      <div className="settings-container">
        <div className="section-header">{t("faqs")}</div>

        {loading && <p>{t("loadingFaqs")}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="settings-section">
          {faqs &&
            Array.isArray(faqs) &&
            faqs.map((faq) => (
              <div className="setting-item" key={faq._id}>
                <div className="setting-item-left">
                  <div className="setting-icon icon-faq">
                    <FaQuestionCircle size={24} color="#FF511A" />
                  </div>
                  <div className="setting-info">
                    <h4>{faq.question || t("notAvailable")}</h4>
                    <p>{faq.answer || t("notAvailable")}</p>
                  </div>
                </div>

                {/* <span className="setting-arrow">
                <img src={arrowIcon} alt="" />
              </span> */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
