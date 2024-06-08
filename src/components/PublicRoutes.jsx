import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const useAuth = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return true;
  } else {
    return false;
  }
};
const PublicRoutes = (props) => {
  const auth = useAuth();
  return auth ? <Navigate to="/admin" /> : <Outlet />;
};

export default PublicRoutes;
