import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useFetch from "../../../../useFetch/useFetch";
import {
  EditToast,
  errorToast,
} from "../../../shared/notifications/notification";

const OrderButton = ({ order, refreshOrders }) => {
  const [show, setShow] = useState(false);
  const { put } = useFetch();

  const handleChangeState = async (order, newState) => {
    const dataOrder = { estado: newState };

    try {
      put(`/orders/${order.id}`, true, dataOrder);
      EditToast(
        `La orden #${order.id} se actualizó a "${
          newState ? "aceptado" : "cancelado"
        }"`
      );

      order.estado = newState ? "aceptado" : "cancelado";

      setShow(false);
    } catch (err) {
      console.error("Error al actualizar la orden:", err);
      errorToast(err.message);
    }
  };

  let variant = "outline-primary";
  if (order.estado === "pendiente") variant = "outline-warning";
  else if (order.estado === "cancelado") variant = "danger";
  else if (order.estado === "aceptado") variant = "success";

  const formatOrderDate = (dateString) => {
    if (!dateString) return "Fecha desconocida";
    try {
      const date = new Date(dateString);

      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "America/Argentina/Buenos_Aires",
      };

      return date.toLocaleString("es-ES", options);
    } catch (e) {
      console.error("Error al parsear la fecha:", e);
      return dateString;
    }
  };

  // Paso el dia
  const isOrderExpired = () => {
    const orderDate = new Date(order.fecha);
    const currentDate = new Date();
    const timeDifference = currentDate - orderDate;
    const oneDayInMs = 24 * 60 * 60 * 1000;

    return timeDifference > oneDayInMs;
  };

  const expired = isOrderExpired();

  return (
    <>
      <Button
        variant={variant}
        className="w-25 m-2 p-3 text-start"
        onClick={() => setShow(true)}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column">
            <h5 className="mb-0">Orden #{order.id}</h5>
            <h5 className="text-muted">{formatOrderDate(order.fecha)}</h5>
          </div>
          <div className="text-end">
            <div className="fw-bold">${order.total ?? order.price ?? 0}</div>
            <div className="fw-bold fs-5">{order.estado ?? "Pendiente"}</div>
          </div>
        </div>
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        size="lg"
        aria-labelledby="modal-orden-titulo"
      >
        <Modal.Header className="d-flex flex-column gap-2" closeButton>
          <Modal.Title id="modal-orden-titulo">Orden #{order.id}</Modal.Title>
          <h3>Pedido por : {order.usuario.nombre}</h3>
        </Modal.Header>
        <Modal.Body>
          {order.productos?.length ? (
            <ul className="list-unstyled">
              {order.productos.map((p, i) => (
                <li key={i} className="mb-2">
                  <div className="d-flex justify-content-between">
                    <span>
                      {p.nombre} × {p.cantidad}
                    </span>
                    <span>${p.precio * p.cantidad}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted">Sin productos.</div>
          )}

          <hr />

          {expired && (
            <div className="alert alert-warning mb-3" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Esta orden tiene más de 24 horas. No se puede modificar su estado.
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mt-2">
            <div>
              <Button
                variant="danger"
                className="me-2"
                onClick={() => handleChangeState(order, false)}
                disabled={order.estado === "cancelado" || expired}
              >
                Cancelado
              </Button>
              <Button
                variant="success"
                onClick={() => handleChangeState(order, true)}
                disabled={order.estado === "aceptado" || expired}
              >
                Aceptado
              </Button>
            </div>
            <div className="fw-bold">
              Total: ${order.total ?? order.price ?? 0}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OrderButton;
