import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import { IsTokenValid } from "./Protected.helpers";
import { errorToast } from "../../shared/notifications/notification";

const ProtectedDashboard = ({ children }) => {
  const { rol, token } = useContext(AuthUserContext);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const hasValidToken = IsTokenValid(token);
    const hasAccess = rol === "admin" || rol === "sysadmin";

    if (!hasValidToken) {
      errorToast("Acceso denegado: token inválido");
      setRedirectPath("/Auth");
    } else if (!hasAccess) {
      errorToast("Acceso denegado: credenciales insuficientes");
      setRedirectPath("/");
    }
  }, []);

  if (redirectPath) return <Navigate to={redirectPath} replace />;

  return children;
};

export default ProtectedDashboard;
