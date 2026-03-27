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
    const userId = localStorage.getItem("userId");

    await dispatch(logoutUser(userId)).unwrap();

  } catch (error) {
    console.log("Logout Error", error);
  } finally {
    localStorage.clear();
    sessionStorage.clear();

    navigate("/", { replace: true });
  }
};

//   const handleConfirmLogout = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     let userId = null;

//     // ✅ Safe decode
//     if (token && token.split(".").length === 3) {
//       try {
//         // const decoded = jwtDecode(token);
//         userId = decoded?.userId;
//       } catch (err) {
//         console.warn("Token decode failed");
//       }
//     }

//     // 👉 API call only if userId mila
//     if (userId) {
//       await dispatch(logoutUser({ userId })).unwrap();
//     } else {
//       console.warn("UserId not found, skipping API call");
//     }

//   } catch (error) {
//     console.log("Logout Error", error);
//   } finally {
//     // 🔥 Always clear (important)
//     localStorage.clear();
//     sessionStorage.clear();

//     navigate("/", { replace: true });
//   }
// };

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