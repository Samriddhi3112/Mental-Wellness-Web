import React, { useEffect } from "react";
import { getPrivacyPolicy } from "../../features/services/serviceSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../layout/Header";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { privacyPolicy, loading } = useSelector(
    (state) => state.services || {},
  );
  console.log(privacyPolicy);
  

  useEffect(() => {
    dispatch(getPrivacyPolicy());
  }, []);

  return (
    <div>
      <Header/>
      <div className="main-content">
        <div className="document-container">
          <div className="document-card">
            <div className="document-header">
              <div className="document-label">{t("agreement")}</div>
              <h1 className="document-title">
                {privacyPolicy?.data.title || t("privacyPolicy")}
              </h1>
              <div className="document-date">
               {t("lastUpdatedOn")}{" "}
                {privacyPolicy?.data.updatedAt
                  ? new Date(privacyPolicy.data.updatedAt).toLocaleDateString()
                  : "-"}
              </div>
            </div>
            <div className="document-section">
              <p className="section-content">{privacyPolicy?.data.content || t("notAvailable")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
