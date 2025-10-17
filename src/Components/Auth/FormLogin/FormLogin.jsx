import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { initFormData, initErrores } from "./FomLogin.data";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import { jwtDecode } from "jwt-decode";
import "./FormLogin.css";
import {
  errorToast,
  successToast,
} from "../../shared/notifications/notification";
import useFetch from "../../../useFetch/useFetch";

const FormLogin = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(initErrores);

  const navigate = useNavigate();
  const { onLogin } = useContext(AuthUserContext);

  const { post, isLoading } = useFetch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setFormData(initFormData);
    setErrors(initErrores);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...initErrores };

    if (!formData.email) {
      newErrors.email = true;
      isValid = false;
    }

    if (!formData.contrasena) {
      newErrors.contrasena = true;
      isValid = false;
    }

    if (isRegisterMode) {
      if (!formData.nombre) {
        newErrors.nombre = true;
        isValid = false;
      }
      if (!formData.apellido) {
        newErrors.apellido = true;
        isValid = false;
      }
      if (!formData.telefono) {
        newErrors.telefono = true;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const endpoint = isRegisterMode ? "/user/signup" : "/user/login";

    post(
      endpoint,
      true,
      formData,
      (data) => {
        if (!isRegisterMode && data.token) {
          const decoded = jwtDecode(data.token);
          onLogin(data.token, data.user.nombre, decoded.rol, decoded.id);
          navigate("/");
          successToast(`${data.user.nombre} ha iniciado sesión con éxito.`);
        } else if (isRegisterMode) {
          successToast(`Usuario ${data.user.nombre} creado con éxito.`);
          toggleMode();
        }
      },
      (err) => {
        console.error("Error en la respuesta:", err);
        errorToast(err.message);
      }
    );
  };

  const handleGuestAccess = () => {
    const guestUser = {
      token: "guest-token",
      nombre: "Invitado",
      rol: "guest",
      id: null,
    };

    onLogin(guestUser.token, guestUser.nombre, guestUser.rol, guestUser.id);
    navigate("/");
    successToast("Accediste como invitado");
  };

  return (
    <Form className="w-25 w-md-100 " onSubmit={handleSubmit}>
      {/* Email */}
      <Form.Group className="mb-1">
        <Form.Label htmlFor="email">Correo electrónico</Form.Label>
        {errors.email && (
          <p className="text-danger m-0 small">El correo es requerido.</p>
        )}
        <Form.Control
          id="email"
          className="inputLogin fs-4"
          type="email"
          name="email"
          placeholder="ejemplo@correo.com"
          value={formData.email}
          onChange={handleInputChange}
          isInvalid={errors.email}
        />
      </Form.Group>

      {/* Contraseña */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="contrasena">Contraseña</Form.Label>
        {errors.contrasena && (
          <p className="text-danger m-0 small">La contraseña es requerida.</p>
        )}
        <Form.Control
          id="contrasena"
          className="inputLogin fs-4"
          type="password"
          name="contrasena"
          placeholder="••••••••"
          value={formData.contrasena}
          onChange={handleInputChange}
          isInvalid={errors.contrasena}
        />
      </Form.Group>

      {/* Campos adicionales si es registro */}
      {isRegisterMode && (
        <>
          {/* Nombre */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nombre">Nombre</Form.Label>
            {errors.nombre && (
              <p className="text-danger m-0 small">El nombre es requerido.</p>
            )}
            <Form.Control
              id="nombre"
              className="inputLogin fs-4"
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              isInvalid={errors.nombre}
            />
          </Form.Group>

          {/* Apellido */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="apellido">Apellido</Form.Label>
            {errors.apellido && (
              <p className="text-danger m-0 small">El apellido es requerido.</p>
            )}
            <Form.Control
              id="apellido"
              className="inputLogin fs-4"
              type="text"
              name="apellido"
              placeholder="Tu apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              isInvalid={errors.apellido}
            />
          </Form.Group>

          {/* Teléfono */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="telefono">Teléfono</Form.Label>
            {errors.telefono && (
              <p className="text-danger m-0 small">El teléfono es requerido.</p>
            )}
            <Form.Control
              id="telefono"
              className="inputLogin fs-4"
              type="tel"
              name="telefono"
              placeholder="Ej: 3415551234"
              value={formData.telefono}
              onChange={handleInputChange}
              isInvalid={errors.telefono}
            />
          </Form.Group>
        </>
      )}

      <div className="d-flex flex-column justify-content-center align-items-center">
        <Button
          className="btnSubmit mb-3 w-100"
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? "Cargando..."
            : isRegisterMode
            ? "Registrarse"
            : "Iniciar sesión"}
        </Button>

        {!isRegisterMode && (
          <Button
            className="btnSubmit bg-secondary w-100 mb-3"
            type="button"
            onClick={handleGuestAccess}
          >
            Seguir como invitado
          </Button>
        )}

        <p className="text-center">
          <span>
            {isRegisterMode
              ? "¿Ya tienes una cuenta?"
              : "¿Aún no tienes una cuenta?"}
          </span>
          <span
            className="text-warning login ms-1"
            onClick={toggleMode}
            style={{ cursor: "pointer" }}
          >
            {isRegisterMode ? "Iniciar sesión" : "Registrarse gratis"}
          </span>
        </p>
      </div>
    </Form>
  );
};

export default FormLogin;
