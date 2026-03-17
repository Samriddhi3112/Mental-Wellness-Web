// import { Outlet, Navigate } from "react-router-dom";

// const ProtectedRoutes = () => {
//   const token = localStorage.getItem("token");

//   return token ? <Outlet /> : <Navigate to="/" replace />;
// };

// export default ProtectedRoutes;

import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  const isGuest = localStorage.getItem("isGuest");

  const isAuthenticated = token || isGuest;

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;