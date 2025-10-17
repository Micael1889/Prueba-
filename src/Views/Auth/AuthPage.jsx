import FormLogin from "../../Components/Auth/FormLogin/FormLogin";
import { Image } from "react-bootstrap";
import logo from "../../assets/Yummy-Coffe-logo.png";
import "./AuthPage.css";

const AuthPage = () => {
  return (
    <div className="d-flex w-100 h-100 overflow-hidden">
      <div className="portada h-100 "></div>
      <div className="form h-100 d-flex flex-column justify-content-center text-center align-items-center">
        <Image className="w-25 border-0" src={logo} thumbnail />
        <p className="fs-3 m-0">Inicie sesion con su cuenta de Yummy</p>
        <FormLogin></FormLogin>
      </div>
    </div>
  );
};

export default AuthPage;
