import { useContext, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import OrdersUser from "./OrdersUser/OrdersUser";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import { successToast } from "../../shared/notifications/notification";
import { useNavigate } from "react-router";
import { CartContext } from "../../../Services/Cart/CartContext";

const Profile = ({ show, onHide }) => {
  const { rol, user, onLogout } = useContext(AuthUserContext);
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [showOrders, setShowOrders] = useState(false);

  const handleBack = () => {
    setShowOrders(false);
  };

  const handleShowOrders = () => {
    setShowOrders(true);
  };

  const handleLogout = () => {
    onLogout();
    clearCart();
    successToast("Sesión cerrada con éxito.");
    onHide();
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{user}</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column w-100 justify-content-center text-center">
        {showOrders ? (
          <OrdersUser onBack={handleBack} />
        ) : (
          <>
            <div className="align-items-center mb-4">
              <h1>¡Bienvenido a Yummy Coffee!</h1>
            </div>

            <Button
              className="rounded-pill px-4 m-4 button-Profile"
              onClick={handleShowOrders}
            >
              Ver Mis Órdenes
            </Button>

            {(rol === "admin" || rol === "sysadmin") && (
              <Button
                onClick={() => navigate("/admin")}
                className="rounded-pill px-4 m-4 button-Profile"
              >
                Panel de administrador
              </Button>
            )}

            <Button
              className="rounded-pill px-4 m-4"
              variant="danger"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Profile;
