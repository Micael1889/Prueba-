import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import error from "../../assets/Not Found/imagem-cafe2.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center min-vh-100 gap-4">
      <h1 className="fw-bold">¡Ups! Página no encontrada</h1>
      <img src={error} alt="Página no encontrada" className="w-50 mb-3" />

      <p className="fs-5 text-secondary">
        La página que estás buscando no existe.
      </p>

      <Button
        variant="secondary"
        className="rounded-5 p-3 m-2 fs-4 fw-bold"
        onClick={() => navigate("/")}
      >
        VOLVER
      </Button>
    </div>
  );
};

export default NotFound;
