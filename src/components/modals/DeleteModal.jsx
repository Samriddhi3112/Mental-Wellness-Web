import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteAccount } from "../../features/setting/settingSlice";
import { clearProfile } from "../../features/setting/profileSlice";
import { useTranslation } from "react-i18next";

const DeleteModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await dispatch(deleteAccount()).unwrap();

      toast.success(t("deleteSuccess"));

      localStorage.clear();
      sessionStorage.clear();
      dispatch(clearProfile());
      onClose();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error(err?.message || t("deleteFailed"));
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-backdropD">
      <div className="modal-content delete-modal">
        <h3 style={{ color: "#fff" }}>{t("deleteAccountTitle")}</h3>
        <p style={{ color: "#fff" }}>{t("deleteAccountDesc")}</p>

        <div className="modal-actions">
          <button
            className="logout-cancel"
            onClick={onClose}
            disabled={loading}
          >
            {t("cancel")}
          </button>
          <button
            className="logout-confirm"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? t("deleting") : t("delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
