import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import { IsTokenValid } from "./Protected.helpers";

const Protected = ({ children, rol}) => {
  const { token } = useContext(AuthUserContext);
  /* const isLoggedIn = role === "admin" ? true : false; */ // Replace with your authentication logic
  if (!IsTokenValid(token)) {
    return <Navigate to="/Auth" replace />;
  }

  return children;
};

export default Protected;
