import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LogoutModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirmLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      let userId = null;

      if (token) {
        const decoded = jwtDecode(token);
        userId = decoded.userId;
      }

      const res = await dispatch(
        logoutUser({ userId })
      ).unwrap();

      if (res?.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("isGuest");
        localStorage.removeItem("userData");

        navigate("/");
      }
    } catch (error) {
      console.log("Logout Error", error);
    }
  };

  if (!show) return null;

  return (
    <div className="logout-overlay">
      <div className="logout-modal">
        <h3 className="logout-title">Confirm Logout</h3>

        <p className="logout-text">
          Are you sure you want to logout from your account?
        </p>

        <div className="logout-actions">
          <button className="logout-cancel" onClick={onClose}>
            Cancel
          </button>

          <button className="logout-confirm" onClick={handleConfirmLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;