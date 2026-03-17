import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteAccount } from "../../features/setting/settingSlice";

const DeleteModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await dispatch(deleteAccount()).unwrap(); 
      toast.success("Your account has been deleted successfully. Contact support to reactivate."); 
      onClose();
      navigate("/login");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error(err?.message || "Failed to delete account"); 
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content delete-modal">
        <h3>Delete Account</h3>
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>

        <div className="modal-actions">
          <button className="btn cancel-btn" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="btn delete-btn" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;