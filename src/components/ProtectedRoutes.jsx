import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  let user;
  const _user = localStorage.getItem("user");
  if (_user) {
    user = JSON.parse(_user);
    console.log("user", user);
  }
  if (user) {
    return {
      auth: true,
      role: user.role,
    };
  } else {
    return {
      auth: false,
      role: null,
    };
  }
};
// let permission = {
//   ADMIN: 3,
//   MEMBER: 2,
//   USER: 1,
// };

const ProtectedRoutes = (props) => {
  const { auth, role } = useAuth();
  if (props.roleRequired === "ADMIN" || props.roleRequired === "MEMBER") {
    return auth ? (
      props.roleRequired === role ? (
        <Outlet />
      ) : (
        <Navigate to="/denied" />
      )
    ) : (
      <Navigate to="/login" />
    );
  }
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
