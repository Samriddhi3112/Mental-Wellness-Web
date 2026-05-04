import React, { useEffect } from "react";
import { getTermsConditions } from "../../features/services/serviceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const TermsOfServices = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { termsConditions, loading } = useSelector(
    (state) => state.services || {},
  );
  console.log(termsConditions);

  useEffect(() => {
    dispatch(getTermsConditions());
  }, []);

  return (
    <div >
      <div className="main-content">
        <div className="document-container">
          <div className="document-card">
            <div className="document-header">
              <div className="document-label">{t("agreement")}</div>
              <h1 className="document-title">
                {termsConditions?.data.title || "Terms Of Service"}
              </h1>
              <div className="document-date">
                {t("lastUpdatedOn")}{" "}
                {termsConditions?.data.updatedAt
                  ? new Date(termsConditions.data.updatedAt).toLocaleDateString()
                  : "-"}
              </div>
            </div>
            <div className="document-section">
              <p className="section-content">{termsConditions?.data.content ||  t("notAvailable")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServices;
