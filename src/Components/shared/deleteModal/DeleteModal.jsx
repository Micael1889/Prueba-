import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteModal = ({
  onDelete = () => {},
  item = {},
  buttonLabel = "Eliminar",
  elemento,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    onDelete();
    setShow(false);
  };

  // Detectar tipo de item
  const isAviso = Boolean(item?.imageUrl);
  const isProducto = Boolean(item?.nombre || item?.imagen);

  // Elegir qué mostrar
  const displayTitle = item?.nombre || "Elemento sin nombre";
  const displayImage = item?.imagen || item?.imageUrl || null;

  return (
    <>
      <Button variant="danger" className="mb-1" onClick={handleShow}>
        {buttonLabel}
      </Button>

      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center fs-5">
          {!isAviso && (
            <>
              <p>¿Está seguro de eliminar este {elemento}?</p>
              {isProducto && <p className="fs-3 fw-bold">{displayTitle}</p>}
            </>
          )}

          {/* Mostrar imagen si existe */}
          {displayImage && (
            <div className="text-center my-3">
              <p>¿Está seguro de eliminar este {elemento}?</p>
              <img
                src={displayImage}
                alt={displayTitle}
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                }}
                className="img-thumbnail"
              />
            </div>
          )}
        </Modal.Body>

        <Modal.Body className="fs-4 text-danger fw-bold text-center pt-0">
          ¡Esta acción no se puede deshacer!
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Volver
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
