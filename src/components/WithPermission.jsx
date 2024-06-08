import React from "react";

// type Props = {
//   roleRequired: "ADMIN" | "USER",
//   message: string,
// children?:React.ReactNode
// };

const useRole = () => {
  let user;
  const _user = localStorage.getItem("user");
  if (_user) {
    user = JSON.parse(_user);
  }
  if (user) {
    return user.role;
  } else {
    return "USER";
  }
};
const WithPermission = (props) => {
  const { roleRequired, message } = props;
  const children = props.children;
  const role = useRole();
  return <>{roleRequired === role ? children : <h3>{message}</h3>}</>;
};

export default WithPermission;
