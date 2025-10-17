import { useContext, useState } from "react";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import "./NavBar.css";
import { Button } from "react-bootstrap";
import { successToast } from "../../shared/notifications/notification";
import { useNavigate } from "react-router";
import { CartContext } from "../../../Services/Cart/CartContext";

const NavBar = ({ handleViewOption }) => {
  const sections = [
    { name: "Inicio", icon: "bi-house-door" },
    { name: "Productos", icon: "bi-box-seam" },
    { name: "Ordenes", icon: "bi-receipt" },
    { name: "Usuarios", icon: "bi-people" },
    { name: "Avisos", icon: "bi bi-card-image" },
  ];

  const { user, onLogout } = useContext(AuthUserContext);
  const { clearCart } = useContext(CartContext);

  const [activeSection, setActiveSection] = useState("Inicio");
  const navigate = useNavigate();

  const handleClick = (sectionName) => {
    setActiveSection(sectionName);
    handleViewOption(sectionName);
  };

  const handleLogout = () => {
    onLogout();
    clearCart();
    successToast("Sesión cerrada con éxito");
    navigate("/auth");
  };

  return (
    <div className="navbar-container">
      {/* Header */}
      <div className="navbar-header">
        <h2 className="store-title">Tu Tienda</h2>
      </div>

      {/* Menu Items */}
      <nav className="navbar-menu">
        <ul className="list-unstyled">
          {sections.map((section, index) => (
            <li
              className={`nav-item ${
                activeSection === section.name ? "active" : ""
              }`}
              key={index}
              onClick={() => handleClick(section.name)}
            >
              <i className={`bi ${section.icon}`}></i>
              <span>{section.name}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Footer */}
      <div className="navbar-footer">
        <div className="user-info">
          <i className="bi bi-person-circle"></i>
          <span>{user}</span>
        </div>

        <Button
          className="w-100 mt-2"
          variant="danger"
          size="sm"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
